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

## 2026-10-26
**Checked:** live fetch again NOT possible (www.waterbombalitickets.com -> ENOTFOUND from the routine's egress). Repo unchanged since the 10-19 audit (only the log commit), so repo-based findings from 10-19 still stand. Live 404s/external links still unverified — allow the host in the environment network policy to enable live checks.

**Fixed/deployed:** nothing (no new clear bugs).

**Still-open flags from 10-19 (not repeated as new):** sitemap/llms.txt/pricing.md lastmod 2026-10-16 vs. later footer-disclaimer and TravelDesk changes; Sunset Pass $75.51/$60 under review; zero-price cabana/group feed rows.
- New observation: third-party listings show slide counts varying (15–28) across sources; llms.txt says "22+ named slides" — confirm against the park's current official count (copy rec, not changed).

**Backlink / outreach drafts (not sent):**
1. Hotels.com Bali waterparks guide — https://www.hotels.com/go/indonesia/best-bali-waterparks — high-visibility roundup. Draft: "Hi, your Bali waterparks guide is helpful. We maintain a current Waterbom ticket price and promo comparison at waterbombalitickets.com/tickets; happy to be a reference if you update the Waterbom section." (Low odds; large publisher.)
2. Finns Beach Club "Best Water Parks Bali" — https://finnsbeachclub.com/guides/best-water-parks-bali/ — Draft: "Hi, we liked your Bali water parks guide. Our independent reseller site has an up-to-date Waterbom price table and visit-planning page (waterbombalitickets.com/plan-your-visit) that could be a useful link for readers booking ahead."
3. Pick Your Trail — https://pickyourtrail.com/best-water-parks-in-bali — Draft: "Hi, your best water parks in Bali post ranks well for Waterbom. If helpful, our ticket and packages page (waterbombalitickets.com/packages) lists current options and could complement it."
(Previously logged targets 10-19: Play and Go, Little Steps Asia, Thrifty Family Travels — still open.)

## 2026-11-02
**Checked:** live fetch again NOT possible (curl to www.waterbombalitickets.com returns no connection from the routine's egress; root, /robots.txt, /llms.txt all failed). Repo is unchanged since the 10-26 audit (only log commits since 10-18), so the repo-based results from 10-19 still stand. Live 404s/external links remain unverified.

**Fixed/deployed:** nothing (no new clear bugs).

**Still-open flags (not repeated as new):** sitemap/llms.txt/pricing.md say 2026-10-16 (footer disclaimer + TravelDesk changes landed 10-18, still unreflected; ~2 weeks stale now); Sunset Pass $75.51/$60 under review; zero-price cabana/group feed rows; Reviews meta description short (98 chars); slide-count "22+" unverified.

**Backlink / outreach drafts (not sent):**
1. Klook family Bali blog — https://www.klook.com/blog/family-friendly-bali-activities/ — high-traffic roundup that features Waterbom. Draft: "Hi, your family-friendly Bali guide is a helpful read. We run waterbombalitickets.com, an independent Waterbom ticket reseller with a plain price table and promo comparison. If readers want to compare entry options, you're welcome to reference it." (Low odds: Klook sells tickets itself.)
2. Tripcanvas Waterbom page — https://indonesia.tripcanvas.co/bali/waterbom-bali/ — dedicated Waterbom guide. Draft: "Hi, we liked your Waterbom guide. Our site (waterbombalitickets.com/plan-your-visit) has a visit-planning page and current ticket breakdown that could complement it for readers; happy to flag any outdated details too."
3. Villanovo Bali with kids guide — https://www.villanovo.com/guides/indonesia/bali/activities-with-children — villa-rental activity guide. Draft: "Hi, your Bali activities-with-children guide is great for families. If you'd like a Waterbom ticket reference for guests, waterbombalitickets.com/tickets keeps current prices and packages."
(Earlier targets from 10-19 and 10-26 remain open.)
