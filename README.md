# Waterbom Bali Tickets

Official Waterbom Bali ticket reseller marketing site, served as static HTML and hosted on Vercel. Built by Brands Select for DubaiTicketDeals.com.

## Project structure

- `*.dc.html` — self-contained marketing pages (home, tickets, rides, gallery, promo codes, packages, plan your visit, about, reviews, FAQ, guides, contact, terms).
- `support.js` / `image-slot.js` — runtime required by the `.dc.html` pages. Must be served at the same relative path.
- `uploads/` — park photos (`.webp`) and hero video (`.mp4`). Must be served at `/uploads/...`.
- `api/contact.js` — Vercel Serverless Function that sends the Contact page form via Resend.
- `vercel.json` — clean URL rewrites (e.g. `/tickets` → `Tickets.dc.html`) and content-type headers for `robots.txt`, `sitemap.xml`, `llms.txt`, `favicon.svg`, `pricing.md`.
- `favicon.svg` — site favicon.
- `pricing.md` — machine-readable pricing file for AI agents.

## Local development

```bash
npm install
vercel dev
```

This starts a local server with both the static pages and the `/api/contact` endpoint.

## Environment variables

Create a `.env` file from `.env.example` and set the three variables:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO=bookings@dubaiticketdeals.com
CONTACT_FROM=website@dubaiticketdeals.com
```

For production, add them in the Vercel dashboard:

1. Go to your project on [vercel.com](https://vercel.com).
2. Click **Settings → Environment Variables**.
3. Add `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM`.
4. Redeploy if they were added after the last deploy.

> **Important:** the sending domain used in `CONTACT_FROM` must be verified in Resend before the contact form will deliver. Verify the domain at [resend.com/domains](https://resend.com/domains).

## Deployment

```bash
vercel --prod
```

## Notes

- Internal page links use clean routes (`/tickets`, `/contact`, etc.).
- The ticket checkout is handled entirely by the embedded TravelDesk widget (`https://embedded-widget.azurewebsites.net/traveldesk-widget.js`, key `c0d7479b-4467-4027-960e-6be70cd54fa2`, tour id `499`). No payment code lives in this repo.
- Promo code `SPLASH5` gives 5% off. All prices shown are in USD and should be confirmed before launch.
- If you add a `Content-Security-Policy`, allow the TravelDesk script origin `https://embedded-widget.azurewebsites.net` and any frame/connect origins the widget requires.
