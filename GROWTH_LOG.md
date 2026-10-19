# GROWTH_LOG — weekly technical SEO/AEO audit notes for waterbombalitickets.com

## 2026-10-19
**Checked (repo-based only):** live fetch was NOT possible — the routine's egress proxy rejects www.waterbombalitickets.com (connect_rejected / ENOTFOUND). Audited the repo files instead: all 13 `*.dc.html` pages, vercel.json rewrites, sitemap.xml, robots.txt, llms.txt, pricing.md, google-merchant-feed.csv. Live 404s/external links were not verified. If live checks are wanted, allow that host in the environment network policy.

**Findings / fixes:** none auto-fixed (nothing clearly broken).
- Titles 41–57 chars, descriptions 98–153 chars (all within ~60/155). Exactly one H1 per page. All JSON-LD blocks parse as valid JSON.
- Internal hrefs all point to rewrite routes in vercel.json.
- Prices consistent across pricing.md, llms.txt, merchant feed and Tickets page (Adult $36/Child $28, Resident $21/$18, Family $124/$74, Combo $55/$40/$26, Sunset $75.51/$60).

**Flags for human (not changed):**
- sitemap.xml/llms.txt/pricing.md all say 2026-10-16; since then, footer reseller disclaimer (all pages, 10-18) and TravelDesk widget changes (Tickets, Home) landed. Probably fine, but bump lastmod if you consider those meaningful.
- Sunset Pass: Adult $75.51 vs Child $60.00 — odd figure, and pricing.md already says it's "under internal review". Confirm correct price.
- Merchant feed: `wb-cabana-2026` and `wb-group-2026` have price 0.00 USD — Merchant Center may disapprove zero-price items; consider removing them from the feed or setting a real price.
- Reviews page meta description is only 98 chars (room to use ~155 for CTR) — copy recommendation.

**Backlink / outreach drafts (not sent):**
1. Play and Go (Australian family travel) — https://playandgo.com.au/waterbom-park-best-water-park-asia-bali-guide-families/ — ranks for Waterbom family guides. Draft: "Hi, loved your Waterbom family guide. We run waterbombalitickets.com, an independent reseller with a plain-English price table and promo-code comparison. If useful for readers checking current ticket prices, you're welcome to link to it. Happy to flag any outdated details in your guide too."
2. Little Steps Asia — https://littlestepsasia.com/bali/play/top-things-to-do-with-kids/best-waterparks — "Best Waterparks" roundup. Draft: "Hi team, your Bali waterparks list is a great resource. We maintain an up-to-date Waterbom ticket price and package breakdown (waterbombalitickets.com/tickets) that might be a handy reference for parents comparing options. Would you consider adding it?"
3. Thrifty Family Travels — https://thriftyfamilytravels.com/best-things-to-do-in-bali-with-kids/ — budget-minded Bali-with-kids list. Draft: "Hi, your Bali-with-kids list is useful for budget planning. Our promo code and ticket comparison page (waterbombalitickets.com/promo-codes) may help readers save on Waterbom entry — happy to share if you'd like to reference it."
