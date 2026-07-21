# Illucrum — SaaS & Software SEO Audit: Point-by-Point Scoring Guide
### v1.0 — SaaS-specialised audit: funnel architecture, trial page SEO, programmatic SEO, JavaScript rendering

**Prepared for:** Szymon Kokot / Illucrum  
**Purpose:** For each of the SaaS audit points — automation mode, tool, scoring instructions, and ready-to-use standard messages.
**Audit tiers:** Basic ($297) · Full ($597)  
**Applies to:** B2B and B2C SaaS, software products with trial/demo/freemium models

---

## Legend

**Tier:**
- ★ — Included in **Basic** and **Full**
- ◆ — **Full tier only**

**Tool preference order:** PageSpeed Insights → Google Search Console → SEOptimer → Ahrefs Free / Ubersuggest → manual Google search

---

## Section 1 — Technical SEO (SaaS-Adapted)

> Standard technical health checks, with SaaS-specific additions for JavaScript rendering, app subdomain handling, and login-wall indexability.

---

### #1 — Page Speed (Mobile & Desktop) ★
**Tool:** PageSpeed Insights API — `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={clientURL}&strategy=mobile` + `&strategy=desktop`

**How it works (automated):**  
Calls the PageSpeed Insights API for both strategies. Extracts the **Performance score** (0–100). Score is based on the lower of the two (mobile is almost always the limiting factor).

**Scoring logic:**

| Mobile Performance Score | Audit Score | Rating |
|---|---|---|
| 90–100 | 8–10 | 🟢 |
| 70–89 | 5–7 | 🟡 |
| Below 70 | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Page speed is strong on both mobile ({mobile_score}) and desktop ({desktop_score}). For a SaaS marketing site, this directly supports trial conversion — users who experience delays abandon signup flows. No immediate action required.

> 🟡 **Needs attention:** Performance is acceptable but not optimal (Mobile: {mobile_score}, Desktop: {desktop_score}). SaaS landing pages are particularly sensitive to speed — every second of delay reduces conversion rates measurably. Common culprits: heavy JavaScript bundles, unoptimised images, render-blocking scripts. Prioritised fixes are listed in the action plan.

> 🔴 **Critical:** Page speed is poor (Mobile: {mobile_score}, Desktop: {desktop_score}). For a SaaS product, this has a double impact — it suppresses organic rankings and directly reduces the conversion rate of every visitor that does arrive. Immediate optimisation is required.

---

### #2 — Core Web Vitals (LCP, INP, CLS) ★
**Tool:** PageSpeed Insights API — same call as #1, extracts Core Web Vitals from `loadingExperience` or `lighthouseResult`

**How it works (automated):**  
Extracts LCP, INP, and CLS values. Compares each against Google's thresholds. Score based on how many metrics fall in the "Good" band.

**Thresholds:**
- LCP: ≤2.5s = Good · ≤4.0s = Needs Improvement · >4.0s = Poor
- INP: ≤200ms = Good · ≤500ms = Needs Improvement · >500ms = Poor
- CLS: ≤0.1 = Good · ≤0.25 = Needs Improvement · >0.25 = Poor

**Scoring logic:**

| Passing metrics | Audit Score | Rating |
|---|---|---|
| All 3 pass | 8–10 | 🟢 |
| 1–2 pass | 4–7 | 🟡 |
| 0 pass | 1–3 | 🔴 |

**Standard messages:**

> 🟢 **Good:** All three Core Web Vitals pass Google's thresholds (LCP: {lcp}, INP: {inp}, CLS: {cls}). The site delivers a fast, stable experience — a direct ranking signal. Maintain this through future deployments.

> 🟡 **Needs attention:** {N} of 3 Core Web Vitals are outside the "Good" range (LCP: {lcp}, INP: {inp}, CLS: {cls}). For SaaS, CLS failures are especially damaging on trial/pricing pages where layout shifts disrupt users at the moment of conversion intent.

> 🔴 **Critical:** Core Web Vitals are failing — {N} metrics in the "Poor" range (LCP: {lcp}, INP: {inp}, CLS: {cls}). This is a direct Google ranking signal and a conversion killer. High-priority fix.

---

### #3 — HTTPS & SSL Certificate ★
**Tool:** URL check — attempt HTTPS load, inspect redirect behaviour

**How to check (automated):**  
The tool checks whether the site loads over HTTPS, whether HTTP redirects to HTTPS, and whether the SSL certificate is valid and not expiring within 30 days.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| HTTPS enforced, SSL valid, HTTP redirects correctly | 8–10 | 🟢 |
| HTTPS present but HTTP doesn't redirect, or mixed content detected | 4–7 | 🟡 |
| No HTTPS or SSL error | 1–3 | 🔴 |

**Standard messages:**

> 🟢 **Good:** HTTPS is correctly enforced across the site. SSL certificate is valid. For a SaaS product handling user signups and potentially payment information, this is non-negotiable — it's working correctly.

> 🟡 **Needs attention:** HTTPS is present but {specific_issue} — e.g. HTTP traffic isn't being redirected, or mixed content warnings are present. This can trigger browser security warnings during onboarding flows, which will damage trial conversion rates.

> 🔴 **Critical:** The site has a significant HTTPS/SSL issue. For a SaaS product, this is a trust-destroyer — browsers actively warn users before they can reach signup pages. Fix immediately.

---

### #4 — Mobile Responsiveness ★
**Tool:** AI — fetched HTML + PageSpeed Insights mobile usability data

**How to check:**  
AI reviews the HTML for responsive meta viewport tag, CSS media queries, and touch-friendly element sizing. Also cross-references PageSpeed's mobile usability flags.

**SaaS-specific focus:** Check that trial/demo CTAs, pricing tables, and signup forms are fully functional and readable on mobile.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Fully responsive, all key conversion elements mobile-optimised | 8–10 | 🟢 |
| Responsive overall, but conversion elements have issues | 5–7 | 🟡 |
| Not fully responsive or major layout issues on mobile | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The site is fully responsive across device sizes. Key pages — including trial and pricing — render correctly on mobile. With SaaS buyers increasingly researching tools on mobile before converting on desktop, this is well handled.

> 🟡 **Needs attention:** The site is broadly responsive but {specific_issue} — e.g. the pricing table overflows on smaller screens, or the trial CTA button is too small on mobile. These friction points reduce conversion for mobile-first researchers.

> 🔴 **Critical:** The site has significant mobile responsiveness issues. SaaS purchase journeys often begin on mobile (LinkedIn ad → pricing page); a broken mobile experience loses these leads before they reach desktop.

---

### #5 — JavaScript Rendering & Indexability ★
**Tool:** AI — fetched HTML vs rendered DOM comparison; Google Rich Results Test reference

**How to check:**  
AI compares raw HTML source against the rendered page content. Flags cases where key SEO content (H1, meta description, main body text, internal links) is only present in the rendered DOM — invisible to crawlers that don't execute JavaScript.

**SaaS-specific context:** React, Vue, Next.js, and Nuxt are all common in SaaS. The risk varies: server-side rendered (SSR) or static generation (SSG) frameworks are fine; client-side only rendering (CSR) is a crawlability risk.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Key content present in raw HTML (SSR/SSG confirmed) | 8–10 | 🟢 |
| Some content only in rendered DOM, minor risk | 5–7 | 🟡 |
| Core page content only in client-side JS | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Key page content — headings, body text, internal links — is present in the raw HTML source. This confirms the site is using server-side or static rendering, meaning Google can index it reliably without JavaScript execution.

> 🟡 **Needs attention:** Some content appears to be rendered client-side only. While Googlebot does render JavaScript, the indexing of JS-dependent content is delayed and less reliable. Content on {specific_pages} should be confirmed in GSC's URL Inspection tool to verify it's being indexed correctly.

> 🔴 **Critical:** Core page content is delivered entirely via client-side JavaScript. This is a significant indexability risk — Google may see blank or near-empty pages during crawl. For a SaaS company depending on organic traffic, this needs architectural resolution (migrating to SSR or SSG) as a priority.

---

### #6 — Crawlability: robots.txt & Sitemap ★
**Tool:** Fetch `{domain}/robots.txt` and `{domain}/sitemap.xml`

**How to check (automated):**  
Tool fetches robots.txt and the XML sitemap. Checks: robots.txt exists and isn't blocking key marketing pages; sitemap exists, is valid XML, and is submitted to GSC.

**SaaS-specific risk:** App subdomains (app.domain.com) are often inadvertently blocked or incorrectly included in the sitemap. Marketing site pages must be crawlable; app login/dashboard pages should be excluded.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| robots.txt correct, sitemap valid and submitted | 8–10 | 🟢 |
| Sitemap exists but not submitted, or minor robots.txt issues | 5–7 | 🟡 |
| Key pages blocked, no sitemap, or sitemap errors | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** robots.txt is correctly configured and the XML sitemap is present and valid. Marketing site pages are crawlable; app subdomain content is appropriately handled. No crawlability barriers to organic visibility.

> 🟡 **Needs attention:** {specific_issue} — e.g. the sitemap hasn't been submitted to Google Search Console, or the robots.txt has overly broad disallow rules that may be blocking feature or integration pages from being indexed.

> 🔴 **Critical:** {specific_issue} — e.g. key pages (homepage, pricing, feature pages) are blocked in robots.txt, or the sitemap is missing entirely. Google may not be indexing the full site. This directly limits organic visibility and needs urgent correction.

---

### #7 — App Subdomain Handling ★
**Tool:** AI — fetched HTML, robots.txt analysis, sitemap review

**How to check:**  
AI checks whether a separate app subdomain (e.g. `app.{domain}`) exists or is referenced in the HTML/sitemap. Verifies that login-walled app content is excluded from the sitemap and appropriately tagged (noindex or disallowed in robots.txt), while the marketing site remains fully crawlable.

**SaaS-specific context:** This is a near-universal issue for SaaS products. App dashboards should never appear in Google's index — they're inaccessible to users and dilute crawl budget. But aggressive robots.txt rules on the app subdomain can sometimes bleed into the marketing site.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| App subdomain correctly excluded; marketing site unaffected | 8–10 | 🟢 |
| App pages partially indexed or unclear separation | 5–7 | 🟡 |
| App content indexed, or marketing pages incorrectly excluded | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** App subdomain content is correctly excluded from indexation. The marketing site is fully crawlable and no login-walled pages were found in the sitemap. Clean separation between the product and the indexable marketing layer.

> 🟡 **Needs attention:** {specific_issue} — e.g. some app or dashboard pages may be accessible to crawlers, or the separation between app and marketing subdomains isn't clearly enforced. Confirm with URL Inspection in GSC for specific app URLs.

> 🔴 **Critical:** App subdomain content appears to be indexed or incorrectly included in the sitemap. This wastes crawl budget and can surface broken or login-walled pages in search results — damaging both SEO and brand perception. Noindex tags or robots.txt rules should be applied to all app/dashboard pages immediately.

---

### #8 — Canonical Tags & Duplicate Content ★
**Tool:** AI — fetched HTML for all sitemap pages

**How to check:**  
AI checks for canonical tags on all pages. Flags cases where canonical is missing, self-referencing incorrectly, or pointing to the wrong URL. Also checks for common SaaS duplicate content patterns: UTM-parameterised URLs, pagination on blog pages, or identical content across feature variants.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Canonical tags present and correct on all key pages | 8–10 | 🟢 |
| Canonicals mostly present but missing on some pages | 5–7 | 🟡 |
| Canonicals missing, misconfigured, or significant duplicate content | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Canonical tags are correctly implemented across key pages. No significant duplicate content patterns detected. Google is being directed to the intended canonical version of each URL.

> 🟡 **Needs attention:** Canonical tags are missing or incorrectly configured on {specific_pages}. This is particularly important for SaaS sites that generate UTM-tracked URLs — without canonicals, Google may split ranking signals across multiple versions of the same page.

> 🔴 **Critical:** Canonical implementation is absent or significantly flawed. Duplicate content signals are likely diluting the authority of key pages. This is especially damaging for feature and pricing pages that compete for high-value keywords.

---

### #9 — Structured Data / Schema Markup ★
**Tool:** AI — fetched HTML; Google Rich Results Test — `https://search.google.com/test/rich-results`

**How to check:**  
AI checks for JSON-LD schema markup. Evaluates which schema types are present and whether they match the page content. For SaaS, relevant schema types include: `SoftwareApplication`, `FAQPage`, `HowTo`, `WebPage`, `Organization`, and `BreadcrumbList`.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Relevant schema present, valid, and rich-results eligible | 8–10 | 🟢 |
| Schema present but limited, or not rich-results eligible | 5–7 | 🟡 |
| No schema, or schema present but invalid | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Structured data is implemented correctly with {schema_types} schema present. The site is eligible for rich results — which improve CTR in SaaS comparison searches where star ratings, FAQs, and app metadata stand out.

> 🟡 **Needs attention:** Schema markup is present but limited ({current_types}). Adding `SoftwareApplication` schema on the homepage and key feature pages — including rating, operating system, and price — would make the site eligible for enhanced search results that improve click-through rates for branded searches.

> 🔴 **Critical:** No structured data detected. Competitors using `SoftwareApplication`, `FAQPage`, and `HowTo` schema on equivalent pages are earning rich results in SERPs that stand out significantly. This is a missed opportunity with a low implementation cost.

---

### #10 — Indexation Health ★
**Tool:** Google Search Console — `https://search.google.com/search-console`

**How to check:**
1. GSC → Indexing → Pages
2. Note total indexed pages vs total submitted in sitemap
3. Note "Not indexed" breakdown — review top reasons (e.g. "Duplicate without user-selected canonical", "Crawled – currently not indexed", "Excluded by noindex")
4. Flag any marketing pages that appear in "Not indexed"

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| All key pages indexed, <5% unexplained exclusions | 8–10 | 🟢 |
| Minor indexation issues, no key pages missing | 5–7 | 🟡 |
| Key pages not indexed or >15% unexplained exclusions | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Indexation health is clean — all key marketing pages, feature pages, and blog content are being indexed correctly. Excluded pages are appropriately non-indexable (app pages, login walls). No coverage concerns.

> 🟡 **Needs attention:** {N} pages are showing as "Not indexed" beyond expected exclusions. Common causes include {reasons}. While core pages appear to be indexed, investigating the excluded set is recommended — some feature or integration pages may be missing organic visibility unintentionally.

> 🔴 **Critical:** Key pages are not being indexed — including {specific_pages}. These pages are invisible to Google and generating zero organic traffic. Resolving indexation errors is a prerequisite for any other SEO improvements to have effect.

---

## Section 2 — On-Page SEO (Funnel-Adapted)

> Standard on-page checks adapted for SaaS page types: homepage, pricing page, feature pages, integration pages. Each has distinct keyword intent and conversion requirements.

---

### #11 — Title Tags ★
**Tool:** AI — fetched HTML from all sitemap pages

**How to check:**  
AI reviews title tags across all pages. Checks: present on every page; unique; within 50–60 character length; contains the target keyword; reflects the page's funnel stage and intent.

**SaaS-specific context:** Title tags on feature pages should name the specific capability, not just the product brand. Pricing pages often rank for "[tool] pricing" queries — the title tag must include "pricing" explicitly.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| All key pages have unique, keyword-optimised title tags | 8–10 | 🟢 |
| Title tags present but missing keywords or too generic | 5–7 | 🟡 |
| Missing, duplicate, or severely under-optimised titles | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Title tags are present, unique, and well-optimised across key pages. Feature pages name their specific capability, the pricing page targets "[product] pricing" explicitly, and the homepage communicates the primary value proposition with the core keyword. Well structured.

> 🟡 **Needs attention:** Title tags are present but {specific_issue} — e.g. feature pages are using a generic "{Product Name} – Features" format rather than naming the specific feature and its benefit. Tailored title tags for individual feature pages significantly improve click-through rates for bottom-of-funnel searches.

> 🔴 **Critical:** Multiple key pages have missing, duplicated, or generic title tags. For a SaaS site, this is particularly damaging on pricing, feature, and comparison pages — these are high-intent pages where title tag precision directly impacts whether a searcher clicks through or chooses a competitor.

---

### #12 — Meta Descriptions ★
**Tool:** AI — fetched HTML from all sitemap pages

**How to check:**  
AI checks whether meta descriptions are present, unique, within 150–160 characters, and include a clear value proposition and call to action appropriate to the page's funnel stage.

**SaaS-specific context:** Meta descriptions on trial/demo pages should include a conversion signal ("Start free", "No credit card required"). Comparison pages should reference the competitor name.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Present, unique, conversion-oriented on key pages | 8–10 | 🟢 |
| Present but generic, no CTA or value proposition | 5–7 | 🟡 |
| Missing or auto-generated on key pages | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Meta descriptions are present and well-written across key pages. They include relevant keywords, communicate clear value, and feature conversion-oriented language on trial and demo pages. This maximises click-through rates from users already searching for SaaS solutions.

> 🟡 **Needs attention:** Meta descriptions are present but too generic — they describe the product without differentiating it or creating a reason to click. For high-intent pages (pricing, trial, comparisons), the meta description is effectively ad copy: it should speak directly to what the searcher is trying to decide.

> 🔴 **Critical:** Key pages are missing meta descriptions or relying on auto-generated snippets. While Google may rewrite these, they tend to be less persuasive than crafted copy. Every high-intent page — trial, pricing, feature, comparison — needs a manually written meta description.

---

### #13 — Heading Structure (H1–H3) ★
**Tool:** AI — fetched HTML from all sitemap pages

**How to check:**  
AI checks for a single H1 per page that contains the target keyword. Reviews H2 and H3 structure for logical hierarchy. Flags pages with multiple H1s, no H1, or H2s that don't support the page's keyword theme.

**SaaS-specific context:** Feature pages should use H2 subheadings to break down individual capability areas — this creates keyword co-occurrence and supports voice/featured snippet eligibility for "what does {tool} do" type queries.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Single H1 with target keyword; logical H2/H3 hierarchy | 8–10 | 🟢 |
| H1 present but H2s are weak or non-semantic | 5–7 | 🟡 |
| Multiple H1s, missing H1s, or no meaningful heading structure | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Heading structure is well-implemented. Each page has a single, keyword-relevant H1, and the H2 hierarchy logically supports the page topic. Feature pages break down capabilities in a way that creates strong keyword co-occurrence.

> 🟡 **Needs attention:** Heading structure is mostly correct but {specific_issue} — e.g. H2 subheadings on feature pages are generic ("How it works", "Key benefits") rather than naming specific capabilities or use cases. Rewriting H2s to reflect actual feature keywords improves on-page relevance significantly.

> 🔴 **Critical:** Heading structure has fundamental issues — {specific_issue}. For a SaaS site where feature and integration pages need to rank for specific technical search terms, this is a meaningful barrier to on-page optimisation.

---

### #14 — Homepage SEO & Positioning Clarity ★
**Tool:** AI — fetched HTML of homepage

**How to check:**  
AI evaluates the homepage for: primary keyword in H1; clear product category statement above the fold; target customer named; primary CTA present and prominent. Also checks whether the homepage communicates a specific niche or is too generic ("software for everyone").

**SaaS-specific context:** SaaS homepages are often optimised for brand positioning rather than SEO. The H1 frequently reads as a tagline ("Work better, together") rather than a keyword-bearing product description ("Project management software for remote teams").

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| H1 contains product category keyword; ICP clearly addressed | 8–10 | 🟢 |
| Partially optimised — keyword present but ICP or category vague | 5–7 | 🟡 |
| Tagline-only H1; no keyword or category signal | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The homepage H1 communicates the product category with a keyword that people actually search for, and the ideal customer profile is clear within the above-the-fold content. Google can correctly categorise the site, and users arriving from organic search immediately understand who the product is for.

> 🟡 **Needs attention:** The homepage communicates the product's value but misses the opportunity to target a specific search category. The current H1 ("{current_h1}") reads as positioning copy rather than an SEO-optimised product description. A small revision — adding the product category and target user — would improve both organic relevance and conversion clarity.

> 🔴 **Critical:** The homepage H1 is a brand tagline with no keyword relevance — Google has limited signals to understand what category of software this is. This is a fundamental on-page issue that suppresses category-level keyword rankings. Revision is a top priority.

---

### #15 — Pricing Page SEO ★
**Tool:** AI — fetched HTML of pricing page (if identifiable from sitemap)

**How to check:**  
AI checks: pricing page exists and is indexable; title tag includes "{Product} pricing"; page content mentions plan names, prices (if public), and key features per tier; FAQ schema is present (for "how much does X cost" queries); CTA is clear.

**SaaS-specific context:** Pricing pages are among the highest-converting organic entry points for SaaS. Searchers arriving on a pricing page via "{tool} pricing" are decision-stage buyers. If the page isn't indexable or isn't ranking, those leads go directly to the competitor.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Pricing page indexable, keyword-optimised, CTA clear | 8–10 | 🟢 |
| Page exists but SEO fundamentals missing | 5–7 | 🟡 |
| No pricing page, page noindexed, or pricing hidden entirely | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The pricing page is indexable, targets the "{product} pricing" keyword, and gives decision-stage visitors the information and CTA they need to convert. This is one of the most valuable pages on a SaaS site for organic acquisition — it's well handled.

> 🟡 **Needs attention:** The pricing page exists and is indexable but {specific_issue} — e.g. the title tag doesn't include "pricing", or the page hides all pricing behind a "Contact sales" CTA with no published plan tiers. Users (and Google) can't find pricing information organically, which loses decision-stage searchers to competitors who publish pricing.

> 🔴 **Critical:** {specific_issue} — e.g. the pricing page is noindexed, or there is no dedicated pricing page at all. For SaaS, "[product] pricing" is one of the highest-converting keyword types — ranking for it requires a dedicated, indexable page. This is a high-priority gap.

---

### #16 — Feature Pages SEO ★
**Tool:** AI — fetched HTML of feature pages identified from sitemap or navigation

**How to check:**  
AI identifies pages that appear to cover individual product features. Checks: each feature has a dedicated URL (not all features on one page); each has a unique keyword-targeted title tag; H1 names the specific feature; body copy describes the feature with supporting keywords; internal links exist between related feature pages.

**SaaS-specific context:** Feature pages targeting "[specific capability] software" or "[product] [feature]" keywords are the highest-volume organic opportunity for most SaaS products. Many SaaS sites cram all features onto a single /features page — missing dozens of rankable keyword opportunities.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Individual feature pages exist with keyword targeting | 8–10 | 🟢 |
| Some features have pages but coverage is incomplete | 5–7 | 🟡 |
| All features on one page, or no keyword targeting per feature | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The site has individual feature pages with dedicated URLs and keyword-targeted content for each core capability. This structure allows each feature to rank for its own search terms — a significant organic surface area advantage over SaaS competitors who consolidate features onto a single page.

> 🟡 **Needs attention:** Some features have dedicated pages but coverage is incomplete — {N} features are consolidated or don't have standalone pages. Each feature page is an independent ranking opportunity. Expanding from the current {N} pages to cover {missing_features} would capture additional bottom-of-funnel search traffic.

> 🔴 **Critical:** All product features are presented on a single /features or /product page with no individual feature URLs. This is one of the most common and most costly SEO architectural mistakes for SaaS products. A single page cannot rank for multiple distinct feature keywords. Creating individual pages for each core capability is a high-priority structural recommendation.

---

### #17 — Content Quality & Depth ★
**Tool:** AI — fetched body text from key pages

**How to check:**  
AI evaluates word count, depth of explanation, presence of supporting detail (use cases, examples, social proof mentions), and whether key pages could answer a user's question without requiring them to navigate elsewhere.

**SaaS-specific context:** SaaS buyers research extensively. Thin feature pages with 100-word descriptions don't rank against comprehensive competitors. Content depth is especially important for comparison and "alternative to" pages.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Key pages substantive (500+ words), thorough, differentiated | 8–10 | 🟢 |
| Some depth but key pages thin (<300 words) | 5–7 | 🟡 |
| Pages consistently thin; marketing copy only | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Key pages have substantive content that explains features, addresses use cases, and differentiates the product. This depth signals topical authority to Google and gives organic visitors the information needed to progress through the funnel.

> 🟡 **Needs attention:** Content depth is uneven — some pages are well-developed while others ({specific_pages}) are thin. For SaaS, thin pages on feature topics signal shallow expertise to Google's quality systems. Expanding the thinner pages to cover use cases, integrations, and FAQs would improve rankings and on-page conversion.

> 🔴 **Critical:** Most key pages contain predominantly marketing copy with very little substantive content. Pages averaging {avg_word_count} words are unlikely to rank competitively for anything beyond branded queries. Content depth improvement across feature, use-case, and comparison pages is a foundational requirement.

---

### #18 — Internal Linking Architecture ★
**Tool:** AI — fetched HTML from all sitemap pages

**How to check:**  
AI maps internal linking patterns across the site. Checks: homepage links to key feature and pricing pages; feature pages link to each other and to trial/demo CTAs; blog content links to relevant feature pages; no orphaned pages (pages with zero internal links pointing to them).

**SaaS-specific context:** A well-linked SaaS site funnels authority from high-traffic blog content down to high-value conversion pages (feature, pricing, trial). Orphaned feature pages receive no PageRank and rank poorly even with good on-page content.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Strong internal linking; no orphan pages; blog → feature links present | 8–10 | 🟢 |
| Moderate linking; some orphaned feature or integration pages | 5–7 | 🟡 |
| Weak internal linking; blog and feature pages disconnected | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Internal linking is well-structured. Authority flows logically from the homepage and blog content to feature, pricing, and trial pages. No orphaned pages detected. This architecture amplifies the value of every new piece of content published.

> 🟡 **Needs attention:** Internal linking is partially implemented but {specific_issue} — e.g. blog posts don't link to relevant feature pages, or {N} feature/integration pages have no internal links pointing to them. Adding contextual links from existing content to these pages is a low-effort, high-impact fix.

> 🔴 **Critical:** Internal linking is weak across the site. Feature pages are receiving minimal authority from the rest of the site, blog content doesn't connect to the product, and {N} pages appear to be orphaned. This significantly limits how well these pages can rank regardless of their on-page quality.

---

## Section 3 — Funnel Keyword Strategy

> SaaS-specific keyword analysis across the three buying stages: Awareness (problem/category), Consideration (comparison/alternative), and Decision (product/pricing/trial). Replaces Local SEO section entirely.

---

### #19 — Funnel Stage Keyword Coverage ★
**Tool:** Google Search Console — `https://search.google.com/search-console`

**How to check:**
1. GSC → Performance → Search results
2. Export all ranking keywords
3. Categorise into funnel stages:
   - **Awareness:** "[problem]", "[category] software", "how to [outcome]"
   - **Consideration:** "best [category] tools", "[product] vs [competitor]", "[product] alternatives"
   - **Decision:** "[product] pricing", "[product] review", "[product] free trial"
4. Note which stages have strong keyword presence and which have gaps

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Ranking keywords present across all three funnel stages | 8–10 | 🟢 |
| Rankings concentrated in 1–2 funnel stages | 5–7 | 🟡 |
| Keywords almost entirely branded or single-stage | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Keyword coverage spans all three funnel stages — awareness, consideration, and decision. The site is intercepting buyers at multiple points in their research journey, which is the ideal SEO architecture for sustainable SaaS organic acquisition.

> 🟡 **Needs attention:** Keyword presence is concentrated in the {strong_stage} stage but thin at {weak_stage}. For SaaS, missing consideration-stage rankings (comparison and "alternatives" content) means ceding that traffic entirely to review sites and competitors who have invested in comparison content.

> 🔴 **Critical:** Keyword coverage is almost entirely branded. The site is only being found by people who already know the product exists — organic search is not generating new-audience traffic at any funnel stage. A structured keyword strategy covering awareness, consideration, and decision content is required from the ground up.

---

### #20 — "Best [Category]" & Comparison Keyword Visibility ★
**Tool:** Manual Google search + GSC

**How to check:**
1. Search "best [product category] software/tools" — note whether the client's site (not just G2/Capterra listings) appears
2. Search "[product] vs [top competitor]" — note if a comparison page exists on the client site
3. Search "[top competitor] alternatives" — check if the client has a page targeting this
4. Cross-reference GSC for impressions on these query types

**SaaS-specific context:** These searches have extremely high purchase intent. The sites that rank here — not just appear on G2 — win a disproportionate share of bottom-of-funnel traffic.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Comparison and "best" pages exist on client site; some SERP presence | 8–10 | 🟢 |
| Some comparison content but limited; no "alternatives" pages | 5–7 | 🟡 |
| No comparison or alternative pages at all | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The site has dedicated comparison and "alternative to" pages that target high-intent consideration keywords. These pages capture buyers who are actively shortlisting tools — one of the highest-converting traffic sources in SaaS SEO.

> 🟡 **Needs attention:** Some comparison content exists but {specific_issue} — e.g. there's a "{product} vs {competitor}" page but no "[competitor] alternatives" page. Given that {competitor} is a direct competitor with a large user base, a well-structured alternatives page targeting "[competitor] alternative" keywords is a significant near-term opportunity.

> 🔴 **Critical:** No comparison or alternative pages exist on the site. For high-intent consideration searches — which are among the best-converting keyword types in SaaS — the site is completely invisible. Competitors and review platforms are capturing 100% of this traffic. Creating even 2–3 comparison pages is a high-priority recommendation.

---

### #21 — Ranking Keywords Overview ★
**Tool:** Google Search Console — `https://search.google.com/search-console`

**How to check:**
1. GSC → Performance → Search results
2. Enable all four columns: Clicks, Impressions, CTR, Average position
3. Sort by Impressions — review top 15–20 keywords for relevance and funnel stage
4. Note how many non-branded keywords appear on page 1 (positions 1–10)

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| 10+ non-branded keywords on page 1; spread across funnel stages | 8–10 | 🟢 |
| Some non-branded rankings, mostly page 2–3 | 5–7 | 🟡 |
| Fewer than 5 non-branded keywords ranking; all branded | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The site has solid non-branded organic visibility — ranking for {N} non-branded keywords across awareness, consideration, and decision stages, with {N} on page 1. This is a strong organic acquisition foundation that generates new-audience traffic.

> 🟡 **Needs attention:** The site is ranking for {N} non-branded keywords but most are on page 2–3 — visible but not generating meaningful clicks. These represent genuine near-term opportunities: with targeted on-page improvements, several could move to page 1 within 2–3 months.

> 🔴 **Critical:** Non-branded keyword rankings are very limited. Almost all organic traffic is coming via branded queries — users who already know the product. Organic search is not currently contributing to new-audience acquisition. A structured non-branded keyword strategy is a foundational requirement.

---

### #22 — Branded vs Non-Branded Traffic Split ★
**Tool:** Google Search Console — `https://search.google.com/search-console`

**How to check:**
1. GSC → Performance → Search results
2. Filter by queries containing the brand name — note total clicks
3. Filter by queries NOT containing brand name — note total clicks
4. Calculate percentage split

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| >50% non-branded clicks | 8–10 | 🟢 |
| 30–50% non-branded | 5–7 | 🟡 |
| <30% non-branded | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The majority of organic traffic is non-branded — meaning people are finding the product through category and feature keywords, not just by searching for the brand directly. For a SaaS company, this indicates a healthy top-of-funnel organic acquisition engine.

> 🟡 **Needs attention:** A significant portion of organic traffic is branded. SEO is currently better at serving existing users than attracting new ones. Investing in non-branded keyword content — particularly awareness and consideration-stage content — would shift this ratio and drive net-new acquisition.

> 🔴 **Critical:** The vast majority of organic traffic is branded. In SaaS terms, SEO is functioning as a navigation tool for existing users, not as an acquisition channel. Non-branded organic acquisition is effectively zero. This is the most important strategic gap to address.

---

### #23 — Target Keyword Mapping ★
**Tool:** AI — fetched page content and URLs from sitemap

**How to check:**  
AI infers the primary target keyword for each key page based on URL structure, H1, title tag, and body content. Checks that: each core page targets a distinct, specific keyword; no two pages are targeting the same keyword (cannibalisation risk); keyword intent matches page format.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Each page has a clear, distinct target keyword; no cannibalisation | 8–10 | 🟢 |
| Most pages mapped but some ambiguous or overlapping | 5–7 | 🟡 |
| Pages without clear keyword targets; cannibalisation detected | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Keyword mapping is clear — each key page has a distinct target keyword and there are no obvious cannibalisation risks. This clean architecture means Google can assign each page its correct ranking context without ambiguity.

> 🟡 **Needs attention:** {specific_issue} — e.g. {page_A} and {page_B} appear to be targeting similar keywords, which may cause Google to alternate between them in rankings (cannibalisation). Clarifying the keyword focus of each page — and consolidating where necessary — would stabilise rankings.

> 🔴 **Critical:** Multiple pages are targeting the same or very similar keywords, and several key pages have no clear keyword target at all. Keyword cannibalisation actively suppresses rankings by dividing signals across pages that should be consolidating them. A keyword mapping exercise is recommended before any further content is created.

---

### #24 — Keyword Placement & Density ◆
**Tool:** AI — fetched body text and HTML from key pages

**How to check:**  
AI infers the primary keyword for each page and checks its placement in: title tag, H1, first 100 words of body, at least one H2, and meta description. Checks keyword density is natural (not >2%).

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Keyword present in all 5 key positions; natural density | 8–10 | 🟢 |
| In title and H1 but missing elsewhere | 5–7 | 🟡 |
| Keyword absent from key positions or over-stuffed | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Target keywords are well-placed across the key on-page positions. Density is natural. No over-optimisation risk detected.

> 🟡 **Needs attention:** Keyword placement could be improved on {specific_pages}. {specific_issue} — e.g. the target keyword doesn't appear in the opening paragraph, or H2 subheadings miss the opportunity to reinforce keyword relevance.

> 🔴 **Critical:** {specific_issue} — e.g. target keywords are barely present across the page, or keyword density is excessively high ({%}), which risks over-optimisation flags. Natural keyword placement across heading hierarchy and body copy is required.

---

### #25 — Search Intent Alignment ◆
**Tool:** AI — page content and URL analysis

**How to check:**  
AI evaluates whether each page's format matches the likely search intent behind its target keyword:
- **Transactional / Decision intent** → service/trial page with clear CTA
- **Informational / Awareness intent** → blog post, guide, or how-to
- **Commercial Investigation / Consideration intent** → comparison, "alternatives", or feature deep-dive

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Page formats clearly match intent on all key pages | 8–10 | 🟢 |
| Mostly aligned, minor mismatches on 1–2 pages | 5–7 | 🟡 |
| Key pages clearly misaligned with likely search intent | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Page formats align well with the search intent behind their target keywords. Users arriving from organic search are finding content that matches what they were looking for — supporting dwell time, reducing bounce, and reinforcing conversion signals.

> 🟡 **Needs attention:** {specific_issue} — e.g. {page} is targeting a decision-stage keyword but reads as an informational blog post. Mismatches between intent and format cause higher bounce rates and ranking instability.

> 🔴 **Critical:** Multiple key pages are misaligned with search intent. Pages targeting decision and consideration keywords must be structured around conversion and evaluation — not education. Restructuring these pages is recommended.

---

## Section 4 — Trial / Demo Page Audit

> SaaS-specific section. Covers the pages that most directly drive revenue from organic traffic. No equivalent in the generic audit.

---

### #26 — Trial / Demo / Signup Page SEO ★
**Tool:** AI — fetched HTML of trial/signup/demo pages identified from sitemap or navigation

**How to check:**  
AI identifies the primary conversion page(s) — free trial, demo request, or signup. Checks: page is indexable; title tag contains a conversion-oriented keyword; H1 communicates the offer clearly; page copy addresses objections; CTA is prominent; social proof is present.

**SaaS-specific context:** The trial/signup page is the end goal of all organic acquisition. If it's noindexed, keyword-empty, or unconvincing, the entire SEO funnel loses its conversion layer.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Indexable, keyword-targeted, strong CTA and social proof | 8–10 | 🟢 |
| Indexable but conversion signals weak; keyword absent | 5–7 | 🟡 |
| Noindexed, generic, or severely under-optimised | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The trial/demo page is indexable, keyword-targeted, and conversion-optimised. It gives organic visitors from decision-stage searches — "[product] free trial", "[product] demo" — a compelling reason to take the next step. This is the capstone of a well-built SEO funnel.

> 🟡 **Needs attention:** The trial/demo page exists and is indexable but {specific_issue} — e.g. there's no social proof on the page, or the CTA copy is generic ("Submit") rather than action-oriented ("Start your free trial"). Minor improvements to this page can have a disproportionate impact on conversion rates from organic traffic.

> 🔴 **Critical:** {specific_issue} — e.g. the trial page is noindexed, targets no keyword, or is so sparse that it fails to convert. Every organic visitor who reaches this page and leaves without converting represents wasted SEO effort. A thorough conversion and SEO review of this page is a high-priority action.

---

### #27 — Trust Signals on Conversion Pages ★
**Tool:** AI — fetched HTML of trial, pricing, and homepage

**How to check:**  
AI checks for the presence of trust signals across the key conversion pages: customer logos, testimonials, review platform badges (G2, Capterra, Product Hunt), security/compliance mentions (SOC 2, GDPR, etc.), "no credit card required" messaging, money-back guarantee statements.

**SaaS-specific context:** SaaS buyers have high purchase anxiety — they're committing time (onboarding) and possibly budget. Trust signals on conversion pages directly reduce abandonment.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| 3+ strong trust signals on trial/pricing pages | 8–10 | 🟢 |
| 1–2 trust signals present | 5–7 | 🟡 |
| No meaningful trust signals on conversion pages | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Conversion pages include strong trust signals — {trust_signals_found}. For organic visitors arriving without prior brand familiarity, these signals reduce hesitation and support conversion. Well executed.

> 🟡 **Needs attention:** Trust signals are present but limited ({trust_signals_found}). Given that organic visitors arrive cold — without the warm-up of a retargeting ad or sales touch — conversion pages need to do more trust-building work. Adding {suggested_additions} would meaningfully reduce abandonment.

> 🔴 **Critical:** No meaningful trust signals were found on the trial or pricing pages. For a SaaS product, organic visitors are anonymous cold prospects — they need external validation to feel comfortable starting a trial. Adding customer logos, G2 ratings, and security certifications is a high-priority conversion improvement.

---

### #28 — CTA Clarity & Conversion Architecture ★
**Tool:** AI — fetched HTML from homepage, feature pages, and pricing page

**How to check:**  
AI evaluates whether each key page has a clear, singular primary CTA that matches the page's funnel stage. Checks: CTA text is action-specific (not just "Learn more"); CTA is above the fold; CTA is repeated at bottom of long pages; secondary CTAs don't compete with the primary.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Clear, stage-appropriate CTA on all key pages; no competing CTAs | 8–10 | 🟢 |
| CTA present but unclear, generic, or buried | 5–7 | 🟡 |
| No clear CTA, competing CTAs, or mismatched to funnel stage | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** CTAs are clear, action-specific, and appropriate to the funnel stage of each page. Homepage drives to trial/demo; feature pages drive to trial with feature-specific copy; pricing page drives to signup. The conversion architecture is coherent.

> 🟡 **Needs attention:** CTAs are present but {specific_issue} — e.g. feature pages use a generic "Get started" button without any feature-specific context, or the homepage CTA is below the fold. Small wording and placement changes can measurably improve conversion rates for organic traffic.

> 🔴 **Critical:** CTA structure is unclear across key pages — {specific_issue}. Organic visitors arriving at high-intent pages with no clear next step will leave without converting. Defining a primary CTA for each key page and making it prominent is a prerequisite for the rest of the SEO work to deliver ROI.

---

## Section 5 — Feature & Integration Pages

> SaaS sites with rich feature sets and integration ecosystems have major untapped SEO potential in this area. Most SaaS products underinvest here significantly.

---

### #29 — Integration Pages SEO ◆
**Tool:** AI — sitemap and navigation analysis; manual inspection of /integrations page

**How to check:**  
AI identifies whether the site has an integrations section or individual integration pages. Checks: integration pages exist with individual URLs per integration; each page names the integration in the title tag and H1; body content explains the integration's value; pages are internally linked from relevant feature pages.

**SaaS-specific context:** Integration pages targeting "[product] + [tool]" keywords (e.g. "Slack integration", "Zapier integration") are a massive underexploited opportunity. These searches come from users of the integrated tool who are evaluating whether this SaaS fits their existing stack.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Individual integration pages with keyword targeting per integration | 8–10 | 🟢 |
| Integrations listed but all on one page; no individual URLs | 5–7 | 🟡 |
| No integration pages at all | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The site has individual integration pages — each with a dedicated URL and keyword targeting for "[product] + [integration name]". This structure generates long-tail search traffic from users of integrated tools who are evaluating fit. A strong programmatic SEO foundation is already in place.

> 🟡 **Needs attention:** Integrations are listed but {specific_issue} — e.g. all integrations are on a single /integrations page with no individual URLs. Creating individual pages per integration — even with a simple template — would turn one page into {N} rankable URLs, each targeting a distinct long-tail keyword.

> 🔴 **Critical:** No dedicated integration pages exist. For a SaaS product that integrates with popular tools, this is a significant missed keyword opportunity. "{Product} [integration]" searches come from actively researching buyers — and the site is currently invisible for all of them.

---

### #30 — Use Case / Persona Pages ◆
**Tool:** AI — sitemap and page content analysis

**How to check:**  
AI checks whether the site has dedicated use-case or persona-specific pages — e.g. "/for-marketing-teams", "/for-agencies", "/project-management-for-remote-teams". Checks: pages target specific audience keyword variants; content is differentiated from generic feature pages; internal links connect use-case pages to relevant feature pages.

**SaaS-specific context:** Use-case pages target long-tail awareness searches by specific buyer types. They also improve conversion by speaking directly to the visitor's context rather than presenting a generic product overview.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Use-case/persona pages exist with targeted keyword content | 8–10 | 🟢 |
| Some use-case content but not dedicated pages | 5–7 | 🟡 |
| No use-case or persona-specific pages | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Dedicated use-case pages exist for key buyer personas and segments. These pages intercept awareness-stage searches from specific user types — a high-value traffic source that generic feature pages can't compete for.

> 🟡 **Needs attention:** Use-case content exists but is embedded within general pages rather than having dedicated URLs. Creating standalone pages for the top 2–3 buyer personas or use cases — each with a targeted keyword and tailored messaging — would capture additional organic traffic and improve conversion for those segments.

> 🔴 **Critical:** No use-case or persona-specific pages exist. All prospects arrive on the same generic homepage and feature pages, regardless of their specific context. This limits both organic keyword coverage and conversion relevance. Persona pages are a high-priority content investment.

---

## Section 6 — Programmatic SEO Potential *(Full only)*

> Assessment of whether template-based content at scale — integrations, use cases, locations, job templates, etc. — would generate meaningful organic traffic for this product. Full tier only.

---

### #31 — Programmatic SEO Opportunity Assessment ◆
**Tool:** Manual research — Google keyword analysis, competitor content audit, site structure review

**How to check:**
1. Review the product's core data assets: integrations list, supported tools, use-case categories, industry verticals, supported languages, job roles served
2. For each asset category, search example combinations in Google — e.g. "[product] for [industry]", "[product] [integration]" — and note search volume signals (number of results, autocomplete suggestions, competitor pages)
3. Check whether any direct SaaS competitors have scaled programmatic content pages (Zapier, Notion, and similar are reference cases)
4. Assess whether the client's CMS/tech stack supports template-based page generation at scale

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Clear programmatic opportunity; tech stack supports it; competitor validation present | 8–10 | 🟢 |
| Opportunity exists but tech constraint or limited data assets | 5–7 | 🟡 |
| No meaningful programmatic opportunity identified | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** There is a well-defined programmatic SEO opportunity for this product. {specific_opportunity} — e.g. creating individual pages for each of the {N} supported integrations using a consistent template would generate {estimated} additional indexable pages targeting long-tail "[product] + [tool]" searches. This is a high-ROI content initiative that scales without proportional content effort.

> 🟡 **Needs attention:** A programmatic opportunity exists — specifically {specific_opportunity} — but is constrained by {limiting_factor}. For example, the current CMS may not support dynamic page generation, or the product's integration list is small enough that manual page creation is more appropriate than a programmatic approach. Recommendations are detailed in the action plan.

> 🔴 **Not applicable / Low opportunity:** Based on this product's structure and market, programmatic SEO does not represent a meaningful near-term opportunity. {reason}. The SEO effort is better directed toward single-page quality content for now.

---

## Section 7 — Content Gap & Blog Strategy *(Full only)*

---

### #32 — Blog / Content Presence ◆
**Tool:** AI — sitemap analysis; identify /blog, /resources, /articles

**How to check:**  
AI checks whether a blog or content hub exists, how many articles are published, when the most recent article was published, and whether blog content links to relevant product pages.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Active blog (10+ posts, published in last 3 months); links to product | 8–10 | 🟢 |
| Blog exists but inactive or not linking to product | 5–7 | 🟡 |
| No blog or fewer than 5 posts | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** An active content hub is in place with {N} published articles, the most recent from {date}. Blog content is linking to relevant product and feature pages, creating topical authority signals and an internal link network that benefits the entire site's rankings.

> 🟡 **Needs attention:** A blog exists but {specific_issue} — e.g. the last article was published {N} months ago, or articles don't link to the product pages they're most relevant to. For SaaS, the blog is the primary awareness-stage acquisition channel — an inactive blog signals to Google that the site is not growing.

> 🔴 **Critical:** No blog or content hub exists. For a SaaS product competing for awareness and consideration keywords, content is the primary organic acquisition mechanism. Without a content strategy, rankings will be limited to branded and bottom-of-funnel queries only. Starting a content programme is a foundational recommendation.

---

### #33 — Keyword Gap vs Competitors ◆
**Tool:** SEOptimer — `https://www.seoptimer.com/{domain}` + manual Google search

**How to check:**
1. Run SEOptimer on both the client domain and 2–3 competitor domains
2. Compare keyword/topic coverage — note which topic areas competitors appear stronger in
3. Search 10–15 non-branded target keywords manually — note which competitors rank where client does not
4. Document gaps — this becomes the content opportunity list in the action plan

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Client ranks for most terms competitors do; few meaningful gaps | 8–10 | 🟢 |
| Noticeable gaps in 2–4 keyword topic areas | 5–7 | 🟡 |
| Client ranks for significantly fewer terms than competitors | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Keyword coverage is broadly comparable to competitors. No major content gaps were identified that represent a significant organic traffic disadvantage at this stage of the product's growth.

> 🟡 **Needs attention:** {N} topic areas were identified where competitors rank and the client does not. Specifically: {topics}. Creating targeted content for these areas would capture traffic currently going entirely to competitors — these are the highest-priority content investments.

> 🔴 **Critical:** The client's keyword footprint is significantly smaller than competitors'. {N} topic areas exist where competitors have strong rankings and the client has no presence. A structured content gap strategy — prioritising high-intent, lower-competition topics first — is required.

---

## Section 8 — Competitor & SERP Analysis

---

### #34 — Identify Top 3 Organic Competitors ★
**Tool:** Google Search — `https://google.com`

**How to check:**  
Search 3–5 of the client's primary non-branded keywords. Note which websites consistently appear in the top 5 results. These are the true organic competitors — not necessarily the same as business competitors.

**SaaS-specific note:** Also search "[category] alternatives" and "best [category] software" — the sites that rank here (not just appear in G2 listings) are the organic competitors that matter most.

> *(Research item — no scoring. Populate the competitor comparison table in the report.)*

---

### #35 — Compare Authority Scores ★
**Tool:** SEOptimer — `https://www.seoptimer.com/{domain}`

**How to check:**
1. Run SEOptimer on client domain and each of the 3 identified competitors
2. Note SEOptimer Domain Strength for each
3. Record in the competitor comparison table in the report

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Client score within 10 points of top competitor | 8–10 | 🟢 |
| 10–25 points behind | 5–7 | 🟡 |
| 25+ points behind | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Domain authority is broadly competitive with the top organic competitors. The site has a comparable foundation from which to compete for category keywords.

> 🟡 **Needs attention:** Competitors have a stronger domain authority score ({competitor_score} vs {client_score}). This gap narrows over 6–12 months with consistent link building, content growth, and press/review coverage — all recommended in the action plan.

> 🔴 **Critical:** There is a significant authority gap between the client ({client_score}) and the strongest competitor ({competitor_score}). Building authority is a long-term effort — but the action plan addresses the highest-leverage steps to begin closing this gap.

---

### #36 — G2 / Capterra / Product Hunt Profile Consistency ★
**Tool:** Manual — search client product name on G2 (`g2.com`), Capterra (`capterra.com`), Product Hunt (`producthunt.com`)

**How to check:**
1. Search the product name on each platform
2. Check: profile exists; product description is complete and keyword-rich; category is correctly set; reviews are present; screenshots/assets are up to date
3. Note platforms where the profile is missing or incomplete

**SaaS-specific context:** G2 and Capterra profiles rank in Google for high-intent "[product] reviews" and "best [category]" searches. An incomplete or absent profile loses review-platform SERP real estate to competitors. These platforms also contribute backlinks to the main domain.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Complete, keyword-rich profiles on G2 and Capterra with reviews | 8–10 | 🟢 |
| Profile present but sparse (few reviews, incomplete description) | 5–7 | 🟡 |
| Profile missing or unclaimed on key platforms | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** G2 and Capterra profiles are complete, correctly categorised, and have a meaningful review count. These profiles rank for "[product] reviews" and "best [category]" searches — capturing decision-stage traffic and contributing backlinks that support overall domain authority.

> 🟡 **Needs attention:** {specific_issue} — e.g. the G2 profile has a thin description or fewer than 10 reviews. Profiles with fewer reviews are ranked lower within the platforms and appear less credible to buyers evaluating multiple options. An active review request campaign would improve this.

> 🔴 **Critical:** Key review platform profiles are missing, unclaimed, or empty. For a SaaS product, these profiles rank in Google for high-intent "[product] review" searches — and if the profile is absent, a competitor's profile or negative third-party content fills that space instead. Claiming and completing these profiles is a high-priority action.

---

### #37 — Competitor Content Benchmarking ◆
**Tool:** Manual review of top competitor sites

**How to check:**
1. Open the top 2–3 organic competitors identified in #34
2. For each, note: number of feature pages; presence of comparison/alternatives content; blog activity (posting frequency, topics covered); integration page structure
3. Score the client's content volume and depth relative to competitors

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Client content depth broadly matches or exceeds competitors | 8–10 | 🟢 |
| Client behind in 1–2 content areas | 5–7 | 🟡 |
| Competitors significantly ahead in content volume and depth | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Content depth is broadly competitive. The client's feature page coverage, comparison content, and blog output are comparable to the organic competitors that are ranking for target keywords. No major content volume gap to overcome.

> 🟡 **Needs attention:** Competitors are ahead in {specific_area} — e.g. top competitors have {N} feature pages vs the client's {N}, or competitors are publishing blog content at {frequency} vs the client's current pace. These gaps explain part of the organic visibility difference and are addressable with a structured content plan.

> 🔴 **Critical:** Competitors are significantly ahead in content volume and depth across {content_areas}. Organic rankings are heavily correlated with content coverage — this gap is a core reason why the client is behind in rankings and will need to be systematically addressed.

---

### #38 — SERP Feature Opportunities ◆
**Tool:** Manual Google search

**How to check:**
1. Search 5–10 of the client's target keywords
2. Note which SERP features are present: Featured Snippets, People Also Ask, Knowledge Panel, Video results, G2/Capterra listings in top 3
3. Check whether the client appears in any SERP features, and which competitor content is winning Featured Snippets

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Client appears in 1+ SERP features for target keywords | 8–10 | 🟢 |
| SERP features present but client absent from all | 5–7 | 🟡 |
| No SERP feature appearances; rich opportunities being missed | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The client appears in SERP features for {specific_keywords} — including {feature_types}. SERP features earn disproportionate clicks and brand visibility. Maintaining and expanding this presence is a content priority.

> 🟡 **Needs attention:** SERP features are prominent for several target keywords — including Featured Snippets and People Also Ask boxes — but the client is not appearing in them. Competitors currently winning these features are at {competitor_domains}. Structuring existing content with clear question-and-answer formatting and FAQ schema would improve eligibility.

> 🔴 **Critical:** The client has no SERP feature visibility for any of the audited keywords. Given that Featured Snippets and PAA boxes appear on {N} of the target keyword SERPs checked, there is significant untapped visibility here. Content restructuring and FAQ schema implementation is recommended.

---

## Section 9 — Backlink Profile *(Full only)*

---

### #39 — Referring Domain Count & Growth ◆
**Tool:** Google Search Console (Links report) + SEOptimer

**How to check:**
1. GSC → Links → Top linking sites: note total referring domain count
2. SEOptimer: note domain strength and backlink overview
3. Compare to competitor domain counts noted in #35

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Referring domain count competitive; growing over time | 8–10 | 🟢 |
| Moderate count; growth flat | 5–7 | 🟡 |
| Very low count; significantly behind competitors | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The site has a solid referring domain base ({N} domains), broadly competitive with the organic competitors reviewed. The link profile supports the domain authority needed to rank for competitive category keywords.

> 🟡 **Needs attention:** Referring domain count ({N}) is moderate. For the target keywords being pursued, competing with the leading SaaS products in this category will require steady link growth. The action plan identifies the most efficient SaaS-specific link acquisition strategies: product reviews, tech blog coverage, and integration partner pages.

> 🔴 **Critical:** Referring domain count is very low ({N}) relative to organic competitors ({competitor_count}). Without addressing this gap, ranking for competitive category and comparison keywords will remain very difficult regardless of on-page quality. A structured link acquisition strategy is a priority recommendation.

---

### #40 — Anchor Text Distribution ◆
**Tool:** Google Search Console — Links report

**How to check:**
1. GSC → Links → Top linking text
2. Note the mix of: branded anchors (product name), exact-match keyword anchors, generic anchors ("click here", "here", "website"), naked URL anchors

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Branded dominant; mix of keyword and generic; natural profile | 8–10 | 🟢 |
| Slightly heavy on exact-match keyword anchors | 5–7 | 🟡 |
| Predominantly exact-match or entirely generic anchors | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Anchor text distribution is natural — branded anchors dominate with a supporting mix of keyword and generic anchors. This is the profile of a site that has earned links organically rather than through manipulation.

> 🟡 **Needs attention:** Anchor text is slightly {specific_issue} — e.g. heavier on exact-match keyword anchors than is typical for a natural profile. While this isn't an immediate concern, diversifying anchor text through PR and product review coverage would move the profile toward a more natural distribution.

> 🔴 **Critical:** Anchor text distribution is {specific_issue}. An over-optimised anchor text profile (too many exact-match keyword anchors) is a known algorithmic risk factor. A link acquisition strategy focused on brand mentions and editorial coverage would naturally diversify this profile.

---

### #41 — Competitor Link Gap ◆
**Tool:** SEOptimer — `https://www.seoptimer.com/{domain}` + GSC Links report

**How to check:**
1. Note referring domain count for client and top 2–3 competitors
2. Calculate the gap as a percentage
3. Note types of links competitors have that client does not (tech press, integration partner pages, product review sites)

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Client within 20% of competitor referring domain count | 8–10 | 🟢 |
| 20–50% fewer referring domains | 5–7 | 🟡 |
| 50%+ fewer referring domains | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The client's link profile is broadly competitive with the top organic competitors. No major link authority gap that would prevent competing for category keywords.

> 🟡 **Needs attention:** Competitors have notably more referring domains ({competitor_count} vs client's {client_count}). The most efficient path to closing this gap for SaaS products is: product directory listings (G2, Capterra, Product Hunt, AlternativeTo), integration partner backlinks, and outreach to SaaS-focused newsletters and blogs.

> 🔴 **Critical:** There is a significant link authority gap. Competitors have {N}x more referring domains than the client. This is a meaningful barrier to competing for category-level keywords. The action plan outlines a prioritised link acquisition roadmap specific to the SaaS context.

---

## Section 10 — UX & Conversion (SaaS-Adapted)

---

### #42 — Signup / Trial Flow Friction ★
**Tool:** AI — fetched HTML of trial/signup page; manual spot-check

**How to check:**  
AI reviews the trial/signup page for friction indicators: number of required form fields (>5 is high friction for a trial); requirement for credit card before trial; unclear benefit statement on the form page; social login options present.

**SaaS-specific context:** Every additional form field reduces signup conversion. Credit card requirements can reduce trial starts by 20–40%. From an SEO perspective, if organic traffic converts to trials at a low rate, the ROI of the entire SEO investment is diminished.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| ≤3 fields, no credit card required, social login available | 8–10 | 🟢 |
| 4–5 fields or credit card required but trial is clear | 5–7 | 🟡 |
| >5 fields, credit card required, or multi-step with high abandonment risk | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The trial signup flow is low-friction — {N} fields, no credit card required, and social login is available. This is well-optimised for the conversion of cold organic traffic, which arrives with less warm-up than paid or referral traffic.

> 🟡 **Needs attention:** The signup flow has {specific_friction} — e.g. {N} required fields, or credit card is required upfront. For organic visitors who haven't seen an ad or read a review, this level of commitment is often a drop-off point. Reducing friction — particularly removing the credit card requirement — would improve trial conversion rates.

> 🔴 **Critical:** The signup flow has significant friction — {specific_issues}. For a SaaS product, the trial conversion rate multiplies the ROI of every SEO investment. Reducing this friction is as important as improving rankings. Specific recommendations are in the action plan.

---

### #43 — Page Layout & Readability ★
**Tool:** AI — fetched HTML

**How to check:**  
AI reviews paragraph length, use of headings to break up content, bullet points for feature lists, whitespace, and text contrast. Flags pages with long unbroken text blocks, poor visual hierarchy, or dense feature descriptions without scannable structure.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Well-structured, scannable; appropriate use of visual hierarchy | 8–10 | 🟢 |
| Mostly readable but some dense sections or poor hierarchy | 5–7 | 🟡 |
| Dense text, poor structure, or hard to scan key information | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Key pages are well-structured and scannable. SaaS buyers scan before they read — the page layout allows a visitor to understand the product's core value quickly before committing to a full read. Good execution.

> 🟡 **Needs attention:** {specific_issue} — e.g. the feature descriptions on {page} are dense paragraphs that are hard to scan. SaaS buyers move fast; restructuring key feature descriptions into benefit-led bullet points and adding visual hierarchy would reduce bounce and improve conversion.

> 🔴 **Critical:** Key pages are difficult to scan — {specific_issue}. This level of readability friction is particularly damaging for organic traffic, which arrives without the pre-warmed intent of a paid click. Improving page layout is a conversion priority across {specific_pages}.

---

### #44 — Dwell Time Risk Assessment ★
**Tool:** Google Search Console — `https://search.google.com/search-console`

**How to check:**
1. GSC → Performance → Pages tab
2. Identify pages with high impressions but low CTR (below 2% for position 1–3 rankings)
3. Also note any pages that appear in rankings but have recently dropped in position — may indicate Google re-evaluating quality signals
4. Cross-reference with the readability and content depth findings above

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| No obvious CTR underperformance; rankings stable | 8–10 | 🟢 |
| 1–2 pages with CTR below expected for position | 5–7 | 🟡 |
| Multiple pages ranking well but CTR significantly below benchmark | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** No significant CTR underperformance detected for ranked pages. Rankings appear stable. Pages at their current positions are generating clicks at expected rates.

> 🟡 **Needs attention:** {page(s)} have lower CTR than expected given their position ({position} ranking, {CTR}% CTR). This may indicate that the title tag or meta description isn't compelling enough to earn the click even when the page ranks. A/B testing alternative title tags on these pages is recommended.

> 🔴 **Critical:** Multiple ranked pages have significantly below-benchmark CTR. Organic impressions are being generated but clicks aren't following. This suggests that either the page's title and description don't match what searchers want to click, or competing results (rich snippets, ads) are absorbing the clicks. Improving the SERP presentation of these pages is a priority.

---

### #45 — Accessibility Basics ★
**Tool:** AI — fetched HTML

**How to check:**  
AI checks for: `alt` attributes on images; form inputs have associated labels; colour contrast (inferred from style/CSS); skip-to-content link present; `lang` attribute on `<html>` element.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Core accessibility attributes present across key pages | 8–10 | 🟢 |
| Minor gaps (a few missing alt tags or labels) | 5–7 | 🟡 |
| Widespread missing alt text, no labels, or other significant barriers | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Core accessibility attributes are correctly implemented — images have descriptive alt text, form inputs have labels, and the page language is declared. Google uses accessibility signals as part of its quality assessment; this is well handled.

> 🟡 **Needs attention:** Minor accessibility gaps were found — {specific_issues}. For a SaaS product, accessibility also has legal and compliance implications in regulated markets. Addressing the flagged items is low-effort and recommended.

> 🔴 **Critical:** Widespread accessibility issues detected — {specific_issues}. Beyond the ethical and legal considerations, missing alt text directly affects how Google indexes image content, and poor accessibility is a quality signal that can negatively influence overall site evaluation.

---

### #46 — Overall Conversion Funnel Coherence ◆
**Tool:** AI — cross-page analysis; manual spot-check of the full organic journey

**How to check:**  
Manual trace of a representative organic journey: awareness blog post → feature page → pricing page → trial signup. At each step, check: is there a logical next step? Is the CTA stage-appropriate? Is messaging consistent? Is the internal link architecture guiding users forward?

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Coherent funnel — each page naturally leads to the next | 8–10 | 🟢 |
| Partially coherent; some dead ends or inconsistent CTAs | 5–7 | 🟡 |
| Disconnected — pages don't guide users toward conversion | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The organic journey from awareness content through to trial signup is coherent. Each step has a logical next action, messaging is consistent across funnel stages, and the internal link architecture supports progressive movement through the funnel. This is the capstone of a well-built SaaS SEO strategy.

> 🟡 **Needs attention:** The funnel is partially coherent but breaks down at {specific_stage} — e.g. blog content doesn't link to relevant feature pages, or the feature pages lead to a generic homepage rather than a trial CTA. Closing these gaps would improve the overall conversion rate of organic traffic without requiring any additional rankings.

> 🔴 **Critical:** The organic funnel has significant disconnects — {specific_issues}. Users arriving from search have no clear path to becoming a trial or demo lead. Without a coherent internal journey, even strong rankings will produce disappointing conversion results. Funnel architecture is a foundational issue that should be addressed alongside on-page and technical improvements.

---

## Section 11 — AI Search & Answer Engine Optimisation (GEO / AEO)

> SaaS is arguably the category most exposed to answer-engine search. Buyers routinely open ChatGPT or Perplexity and ask *"what's the best tool for X?"* before they ever touch Google — and the engines answer by synthesising G2, Capterra, Reddit and comparison content. **GEO** (Generative Engine Optimisation) is about being *recommended and cited* inside those answers; **AEO** (Answer Engine Optimisation) is about structuring product content so it is the answer that gets extracted. All checks are **manual** — the auditor runs the queries and records the result. For a SaaS product, this is fast becoming a primary discovery channel, not a fringe one.
>
> **Tier note:** ★ = Basic + Full · ◆ = Full only

---

### #47 — "Best [Category] Software" LLM Recommendation Presence ★
**Tool:** ChatGPT (search mode), Perplexity, Google Gemini — direct queries

**How to check:**
1. Ask each assistant the core discovery questions a buyer would use: *"best {category} software"*, *"best {category} tool for {ICP/use case}"*, *"{category} tools for startups"*
2. Note whether the product appears in the recommended list, and its position/prominence relative to competitors
3. Ask a comparison question: *"{product} vs {top competitor}"* — check whether the engine has enough accurate information to compare fairly
4. Record which sources the engines cite (G2, Capterra, specific blogs, Reddit threads) — this is the source list that determines who gets recommended

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Product recommended for category/use-case queries across ≥2 engines | 8–10 | 🟢 |
| Appears occasionally or only for narrow queries | 5–7 | 🟡 |
| Never surfaces; only competitors recommended | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The product is already surfacing in answer-engine recommendations for category and use-case queries — the single most valuable position in AI-driven SaaS discovery. The sources feeding these answers are working in the product's favour; the priority is to protect and reinforce that footprint.

> 🟡 **Needs attention:** The product appears in AI recommendations only occasionally, or for narrow queries, while competitors dominate the broader *"best {category}"* answers. Because the engines lean heavily on {cited_sources}, the fastest route to improvement is strengthening presence and review volume on those specific platforms, plus publishing the comparison and alternatives content the engines pull from.

> 🔴 **Critical:** The product never surfaces when buyers ask answer engines for category recommendations — only competitors do. Given how many SaaS buyers now start discovery inside these tools, this is a material and growing gap in the funnel. A deliberate GEO push (review-platform presence, comparison content, citable third-party mentions) is a high-priority recommendation.

---

### #48 — Google AI Overview Presence (Category & Comparison Queries) ★
**Tool:** Google Search (logged-out / incognito) — `https://google.com`

**How to check:**
1. Search the product's key category, comparison and *"best X for Y"* queries in an incognito window
2. Note whether an **AI Overview** appears and whether the product's site (or a review platform featuring it) is cited
3. Pay particular attention to comparison and alternatives queries — these are where high-intent SaaS buyers sit and where overviews are common
4. Record queries where the overview cites competitors but not the product

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Product/domain cited in AI Overviews for key commercial queries | 8–10 | 🟢 |
| Overviews appear but cite competitors / review sites, not the product | 4–7 | 🟡 |
| Consistently absent from overviews on high-intent queries | 1–4 | 🔴 |
| No AI Overviews triggered for this niche yet | — | ℹ️ N/A |

**Standard messages:**

> 🟢 **Good:** The product's pages are being cited in Google AI Overviews for key commercial and comparison queries — feeding the answer buyers see before any organic result. Maintain the answer-first structure that's earning these citations.

> 🟡 **Needs attention:** AI Overviews appear for the product's high-intent queries but tend to cite competitors or review platforms rather than the product's own pages. Restructuring the pricing, comparison and feature pages to answer the underlying question directly and concisely improves the odds of being the cited source.

> 🔴 **Critical:** For the high-intent queries where Google now shows an AI Overview, the product is consistently absent while competitors are cited. This erodes visibility at the top of exactly the queries with the most buying intent. Answer-ready restructuring of the commercial pages is a priority.

> ℹ️ **N/A:** Google is not yet triggering AI Overviews for this niche's queries. Re-check each audit cycle.

---

### #49 — Review-Platform Citation Footprint (G2 / Capterra / Reddit) ◆
**Tool:** G2, Capterra, Reddit, TrustRadius — direct review + manual search

**How to check:**
1. This extends #36 (profile consistency) into the GEO dimension: the engines cite these platforms heavily, so their state directly shapes AI answers
2. Check review **volume and recency** on G2 and Capterra vs the top 2–3 competitors (a product with 12 reviews rarely gets recommended over one with 400)
3. Check overall rating and whether recent reviews are positive
4. Search Reddit for the category and the product — note the sentiment and whether the product is mentioned at all (Reddit is a disproportionately cited source)
5. Note the delta between the product's footprint and competitors' on the platforms the engines actually cite (from #47)

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Strong, recent review footprint on the platforms engines cite | 8–10 | 🟢 |
| Present but thin volume or dated vs competitors | 5–7 | 🟡 |
| Sparse/absent on the key cited platforms | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The product has a strong, recent presence on the review platforms and communities that answer engines cite most — solid G2/Capterra volume and ratings, and organic mentions in relevant threads. This third-party footprint is what earns AI recommendations, and it's in good shape.

> 🟡 **Needs attention:** The product is present on the key platforms but its footprint is thin or dated relative to competitors — {specific_issue}, e.g. {N} G2 reviews vs a competitor's {N}, or no recent activity. Because engines weight volume and recency, a structured review-generation effort on these specific platforms is one of the highest-leverage GEO actions available.

> 🔴 **Critical:** The product is sparse or absent on the review platforms and communities that feed answer-engine recommendations. This is a primary reason it isn't surfacing in AI answers (#47) — the engines have little third-party signal to draw on. Building a citable footprint on {platforms} is foundational and should precede other GEO work.

---

### #50 — Answer-Ready Product & Comparison Content ◆
**Tool:** Manual review of key pages

**How to check:**
1. Assess whether the product's feature, pricing and use-case pages answer buyer questions **directly and early**, in extraction-friendly structure (clear H2 questions, concise statements, comparison tables, genuine FAQ)
2. Check for the existence of the content types engines pull comparison answers from: a `{product} vs {competitor}` page, an alternatives/comparison page, and clear pricing information in text (not locked inside an image or "contact us")
3. Flag pricing and feature information that a machine cannot read (image-only pricing tables, JS-gated content — cross-reference #5)
4. Note whether the value proposition is stated plainly enough to be quoted

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Direct, extractable product content incl. comparison/pricing in text | 8–10 | 🟢 |
| Content present but buried, or comparison/pricing content missing | 5–7 | 🟡 |
| Value/pricing not machine-readable; no comparison content | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The product's key pages are answer-ready — the value proposition, features and pricing are stated plainly in text, and comparison/alternatives content exists for engines to draw on. This is exactly what gets extracted into generated comparison answers.

> 🟡 **Needs attention:** The product content is useful but not fully answer-ready — {specific_issue}, e.g. there's no `vs`/alternatives page for engines to cite in comparison answers, or the core value proposition is buried below the fold. Adding extractable comparison content and leading pages with a plain-text answer would improve both AI and snippet visibility.

> 🔴 **Critical:** Key commercial information isn't machine-readable — {specific_issue}, e.g. pricing is image-only or gated behind "contact sales", and there's no comparison content. Engines can't extract or compare what they can't read, so the product is effectively invisible in generated comparison answers. Making pricing and value plain-text and adding comparison pages is a priority.

---

### #51 — Product Entity & Structured Data ◆
**Tool:** Google Rich Results Test — `https://search.google.com/test/rich-results?url={url}` + Schema Markup Validator

**How to check:**
1. Run the homepage and key pages through the validator
2. Confirm presence and validity of entity- and answer-supporting markup: `SoftwareApplication` (or `Product`), `Organization` with `sameAs` links to the product's G2/Capterra/LinkedIn/Crunchbase profiles, `FAQPage`, and `Article`/author markup on blog content
3. The `sameAs` entity links matter especially for SaaS — they help engines connect the on-site brand to its off-site review presence (#49)
4. Note missing or invalid markup that would weaken entity resolution

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Complete, valid entity + product + FAQ markup; entity well-linked | 8–10 | 🟢 |
| Some markup present but entity links or FAQ missing | 5–7 | 🟡 |
| No product/entity schema, or broken markup | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The structured-data layer is strong — product and organisation markup is valid, and `sameAs` links tie the brand to its off-site profiles, giving engines a clean, connected picture of the product as an entity. This supports both rich results and accurate AI descriptions.

> 🟡 **Needs attention:** Some schema is in place but the entity layer is incomplete — {specific_issue}, e.g. no `sameAs` links connecting the site to its G2/Capterra/LinkedIn profiles, or no `FAQPage` markup on pages with clear Q&A. Completing this helps engines resolve the product accurately and reduces the risk of hallucinated descriptions.

> 🔴 **Critical:** The product lacks the structured data engines rely on to understand it as an entity — no `SoftwareApplication`/`Organization` markup and no entity links. This makes accurate machine understanding harder and correlates with the inaccurate brand descriptions sometimes seen in #48. Implementing product and entity schema is a foundational technical fix.

---

### #52 — AI Crawler Access & Documentation Indexability ★
**Tool:** Direct fetch — `{domain}/robots.txt`, `{domain}/llms.txt`, and the docs/help subdomain

**How to check:**
1. Check `robots.txt` directives for AI crawler user-agents: `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`
2. Determine whether any block is intentional or an accidental blanket rule silently removing the product from AI answers
3. **SaaS-specific:** check whether the product's **documentation / help centre** is crawlable and indexable — engines cite docs heavily when answering "how do I do X in {product}" questions, and gated or `noindex` docs forfeit that visibility
4. Check for an `llms.txt` file pointing engines to key product, pricing and docs pages

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| AI crawlers permitted (or blocked by intent); docs crawlable | 8–10 | 🟢 |
| Mixed/unclear directives, or docs partially inaccessible | 5–7 | 🟡 |
| AI crawlers accidentally blocked, or docs noindex/gated | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** AI crawler access is aligned with the product's goals and the documentation is crawlable — so the content engines most like to cite (product pages and docs) is available to them. {llms_txt_note}

> 🟡 **Needs attention:** {specific_issue} — e.g. AI crawler directives haven't been considered, or parts of the help centre aren't indexable. For SaaS, docs indexability is worth resolving specifically: engines cite documentation when answering usage questions, and inaccessible docs forfeit that visibility. An `llms.txt` file pointing to key pages would also help.

> 🔴 **Critical:** The product is undercutting its own AI visibility — {specific_issue}, e.g. AI crawlers are accidentally blocked in `robots.txt`, or the documentation is `noindex`/gated. Engines can't cite what they can't reach, so both category recommendations (#47) and usage-question answers are affected. Correcting crawler access and opening the docs are fast, high-leverage fixes.

---

---

## Audit Summary — SaaS Points by Section & Tier

| Section | # Points | Basic ★ | Full ◆ |
|---|---|---|---|
| 1 — Technical SEO (SaaS-Adapted) | 10 | 10 | 10 |
| 2 — On-Page SEO (Funnel-Adapted) | 8 | 8 | 8 |
| 3 — Funnel Keyword Strategy | 7 | 5 | 7 |
| 4 — Trial / Demo Page Audit | 3 | 3 | 3 |
| 5 — Feature & Integration Pages | 2 | 0 | 2 |
| 6 — Programmatic SEO Potential | 1 | 0 | 1 |
| 7 — Content Gap & Blog Strategy | 2 | 0 | 2 |
| 8 — Competitor & SERP Analysis | 5 | 2 | 5 |
| 9 — Backlink Profile | 3 | 0 | 3 |
| 10 — UX & Conversion | 5 | 4 | 5 |
| 11 — AI Search & Answer Engine Optimisation (GEO/AEO) | 6 | 3 | 6 |
| **Total** | **52** | **35** | **52** |

---

## Key Differences vs Generic Audit (v3)

| Generic Audit (v3) | SaaS Audit (v1) |
|---|---|
| Local SEO section (7 checks) | **Replaced** with Funnel Keyword Strategy |
| Google Business Profile | **Removed** — not applicable |
| Local citation & NAP consistency | **Replaced** with G2/Capterra profile audit |
| Standard keyword overview | **Replaced** with funnel-stage keyword mapping |
| Generic UX checks | **Replaced** with trial flow friction, CTA architecture, funnel coherence |
| No programmatic SEO | **Added** — programmatic opportunity assessment |
| No trial/demo page checks | **Added** — 3-point trial/demo audit section |
| No integration page checks | **Added** — feature & integration pages section |
| No JS rendering check | **Added** — JavaScript rendering & indexability |
| No app subdomain handling | **Added** — app subdomain handling check |
| Generic GEO/AEO layer | **Specialised** — 'best software' LLM recommendations, G2/Capterra/Reddit citation footprint, docs indexability |

---

*Document version: v1.0 — March 2026*  
*Prepared by: Szymon Kokot / Illucrum*
