# Growth Log — waterbombalitickets.com (weekly routine)

## 2026-10-12 (NOT DEPLOYED — push to main was blocked)

- **Live audit could not run**: www.waterbombalitickets.com and the apex domain both failed DNS (ENOTFOUND) from the routine sandbox. Audit was done against repo files only.
- **Fixed locally, uncommitted** (commit/push denied by the auto-mode permission classifier): `llms.txt` ticket prices were stale (e.g. Adult $128.57 vs $36 in pricing.md/feed/schema). Synced to pricing.md values; "Last updated" bumped to 2026-10-12.
- **Found, not yet fixed** (also blocked):
  - Sitemap `lastmod` is 2026-09-17 for /, /tickets, /promo-codes, /packages, /faq, /about although those files changed 2026-10-05.
  - Footer "Last updated: 2026-09-17" and JSON-LD `dateModified` 2026-09-17 on Tickets, Packages, FAQ, About, Home (changed 2026-10-05).
  - Terms.dc.html meta description is 202 chars (budget ~155).
- **Checked clean**: pricing.md and google-merchant-feed.csv prices agree with page JSON-LD; JSON-LD parses on all pages; one H1 per page; titles <=59 chars; other meta descriptions <=168.
- **Flags for human (prices, not changed)**:
  - Sunset Pass Adult $75.51 / Child $60 vs Day Pass $36/$28 — Sunset costing 2x a full-day pass looks suspicious ($75.51 was also the old resident price). Confirm against TravelDesk.
  - Tickets.dc.html line ~200 shows a second Sunset tier "Adult $48 / Child $42" that appears nowhere in pricing.md, llms.txt or the feed.
  - Terms page says "Last Updated: February 2026" (copy decision).
- **Backlink prospecting**: skipped this run (run stopped at the blocked push).
