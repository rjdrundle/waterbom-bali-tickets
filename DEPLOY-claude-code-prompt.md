# Claude Code prompt — deploy Waterbom 2.0 to Vercel with Resend contact form

Copy everything in the block below into Claude Code (run it from the project root that contains the `.dc.html` files).

### Files in this export
- Pages (self-contained HTML): `Waterbom 2.0.dc.html` (home), `Tickets.dc.html`, `Rides.dc.html`, `Gallery.dc.html`, `Promo Codes.dc.html`, `Packages.dc.html`, `Plan Your Visit.dc.html`, `About Waterbom Bali.dc.html`, `Reviews.dc.html`, `FAQ.dc.html`, `Guides.dc.html`, `Contact.dc.html`, `Terms.dc.html`
- Runtime + assets: `support.js` (the component runtime every page loads via `./support.js` — MUST ship), `image-slot.js`, `.image-slots.state.json`, `uploads/` (park photos `.webp` + hero `.mp4`)
- SEO/AI files: `robots.txt`, `sitemap.xml`, `llms.txt`

Every `.dc.html` page loads `./support.js` and (some) `./image-slot.js` by relative path, and references images under `uploads/…`. Serve the whole folder statically at the same relative paths — do not rename or move `support.js`, `image-slot.js`, or `uploads/`.

---

You are setting up hosting and a working contact form for a static marketing site (the "Waterbom Bali Tickets" site built by Brands Select for DubaiTicketDeals.com). The site is a set of self-contained `.dc.html` design-component pages plus assets (`image-slot.js`, an `uploads/` folder of real park photos as `.webp` + a hero `.mp4`, `robots.txt`, `sitemap.xml`, `llms.txt`). The pages reference these images by relative path (e.g. `uploads/waterbom-constrictor.webp`), so the entire `uploads/` folder MUST ship and be served at the same relative path. Do the following:

## 1. Project + hosting (Vercel)
- Initialise a git repo if one does not exist and create a `package.json`.
- The pages are static HTML — serve them as-is. Add a `vercel.json` that:
  - Serves the `.dc.html` files as static assets.
  - Adds clean routes so each page has a pretty URL, e.g. `/` → `Waterbom 2.0.dc.html`, `/tickets` → `Tickets.dc.html`, `/rides` → `Rides.dc.html`, `/gallery` → `Gallery.dc.html`, `/promo-codes` → `Promo Codes.dc.html`, `/packages` → `Packages.dc.html`, `/plan-your-visit` → `Plan Your Visit.dc.html`, `/about` → `About Waterbom Bali.dc.html`, `/reviews` → `Reviews.dc.html`, `/faq` → `FAQ.dc.html`, `/guides` → `Guides.dc.html`, `/contact` → `Contact.dc.html`, `/terms` → `Terms.dc.html`.
  - Keeps `robots.txt`, `sitemap.xml`, `llms.txt` served at the domain root with correct content types.
- IMPORTANT: the in-page links currently point to the literal `*.dc.html` filenames (with spaces). Either (a) keep those working by leaving the files at their names AND add the pretty routes as aliases, or (b) do a one-pass find-and-replace across all `.dc.html` files to switch internal `href`s to the clean routes. Pick (a) first (less risk); only do (b) if we later want clean URLs everywhere. Do not break any existing link.

## 2. Contact form API (Resend)
The Contact page (`Contact.dc.html`) POSTs JSON `{ name, email, subject, message }` to `/api/contact`. Build that endpoint as a Vercel Serverless Function using Resend:
- Add `resend` as a dependency.
- Create `api/contact.js` (Node serverless function) that:
  - Accepts POST only; validates `name`, `email`, `message` are present; basic email sanity check; reject empty/oversized bodies.
  - Sends the message via Resend to the DubaiTicketDeals inbox. Use env vars: `RESEND_API_KEY`, `CONTACT_TO` (destination inbox, e.g. bookings@dubaiticketdeals.com), `CONTACT_FROM` (a verified Resend sender, e.g. website@dubaiticketdeals.com).
  - Sets `reply-to` to the visitor's email so replies go straight back to them.
  - Returns `{ ok: true }` on success and a proper 4xx/5xx with `{ ok: false, error }` otherwise.
  - Add a minimal honeypot / rate-limit guard against spam (e.g. reject if an optional hidden field is filled, and a simple per-IP throttle).
- Do NOT hardcode the API key. Read it from `process.env.RESEND_API_KEY`.

## 3. Env + docs
- Create `.env.example` listing `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
- Add a short `README.md`: how to `vercel dev` locally, how to set the three env vars in the Vercel dashboard (Project → Settings → Environment Variables), and the note that the Resend sending domain must be verified in Resend before the form will deliver.
- Update `robots.txt`, `sitemap.xml`, and `llms.txt` to use the real production domain once known (leave a clear TODO where the domain goes).

## 4. Verify
- Run a local build / `vercel dev`, load `/` and `/contact`, submit the form against a test Resend key, and confirm an email is delivered and the success state shows.
- Confirm the TravelDesk booking widget on `/tickets` loads on the deployed domain (it is a third-party embed: `traveldesk-widget.js`, key `c0d7479b-4467-4027-960e-6be70cd54fa2`, tour id `499`). If a Content-Security-Policy is added, allow that script origin.

Deliver: a deployable repo, `vercel.json`, `api/contact.js`, `.env.example`, and `README.md`. Do not commit any real API keys.

---

### Notes for the human
- Get a Resend API key at resend.com, verify your sending domain (dubaiticketdeals.com), then add `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` in Vercel.
- Promo codes (`SPLASH20`, `NOCAP15`, `FIRSTDIP`) and AED prices are currently placeholders/marketing — confirm the real values before launch.
- The ticket checkout itself is handled entirely by the embedded TravelDesk widget, so no payment code is needed on our side; payments and e-vouchers run through that provider.
