import { Resend } from 'resend';

const MAX_BODY_BYTES = 50 * 1024; // 50 KB
const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX = 5;

// Simple in-memory throttle (resets on cold-start, which is acceptable for basic spam guard).
const attempts = new Map();

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const list = attempts.get(ip) || [];
  const recent = list.filter(t => now - t < RATE_WINDOW_MS);
  attempts.set(ip, recent);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  return false;
}

function looksLikeEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 256;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, error: 'Request body too large' });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many attempts. Please wait a minute.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
  }

  // Honeypot: bots often fill hidden fields. Reject if any are present.
  if (body.website || body.url || body.company || body.address || body.phone) {
    return res.status(400).json({ ok: false, error: 'Spam detected' });
  }

  const { name, email, subject, message } = body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required' });
  }

  if (!looksLikeEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address' });
  }

  if (name.length > 100 || message.length > 5000 || (subject && subject.length > 200)) {
    return res.status(400).json({ ok: false, error: 'One or more fields are too long' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error('Missing contact form environment variables');
    return res.status(500).json({ ok: false, error: 'Server configuration error' });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      replyTo: email,
      subject: `[Waterbom Bali Tickets] ${subject || 'New enquiry'} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Subject:</strong> ${escapeHtml(subject || 'N/A')}</p>
<hr>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    });

    if (error) throw error;

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Resend send error:', err);
    return res.status(502).json({ ok: false, error: 'Could not send message right now. Please try again later.' });
  }
}
