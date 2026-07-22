# Illucrum — E-Commerce SEO Audit: Point-by-Point Scoring Guide
### v1.0 — Platform-Aware E-Commerce Edition (Shopify, WooCommerce, Magento, BigCommerce)

**Prepared for:** Szymon Kokot / Illucrum  
**Purpose:** For each of the 46 e-commerce audit points; automation mode, tool, scoring instructions, and ready-to-use standard messages.  
**Audit tiers:** Basic ($297) · Full ($597)  
**Applies to:** Online stores on any platform; Shopify, WooCommerce, Magento, BigCommerce, Squarespace Commerce, custom-built and others

---

## What Makes This Audit Different

E-commerce sites face structural SEO challenges that generic audits miss entirely. Product pages generate duplicate content across collections. Category hierarchies create crawl traps through faceted navigation and tag pages. Platform-specific limitations (Shopify's rigid URL structure, WooCommerce's plugin bloat, Magento's indexation complexity) require checks that a standard 46-point audit cannot provide.

This audit treats the product catalogue as the primary SEO asset. Every section is adapted to evaluate how well the store's architecture, content, and technical setup convert organic search traffic into product discovery and purchase. The backlink and local SEO sections from the generic audit are replaced with Product & Catalogue SEO and E-Commerce Keyword Strategy sections.

**Removed vs Generic:**
- Local SEO section (7 checks) replaced by **Product & Catalogue SEO** (8 checks)
- Generic keyword section replaced by **E-Commerce Keyword Strategy** (6 checks)
- Competitor analysis adapted for e-commerce SERP features (Shopping carousel, Product Knowledge Panels)
- UX section adapted for cart, checkout, and trust signal evaluation

---

## Legend

**Tier availability:**
- ★ = included in both **Basic** and **Full**
- ◆ = **Full only**

**Tool preference order:** PageSpeed Insights → Google tools (GSC, Rich Results Test, Merchant Center) → SEOptimer → other free tools

---

## Audit Section Map

| # | Check | Tier | Section |
|---|---|---|---|
| 1 | Page Speed (Mobile & Desktop) | ★ | Technical SEO |
| 2 | Core Web Vitals (LCP, INP, CLS) | ★ | Technical SEO |
| 3 | HTTPS & SSL Certificate | ★ | Technical SEO |
| 4 | Mobile Responsiveness | ★ | Technical SEO |
| 5 | XML Sitemap & Robots.txt | ★ | Technical SEO |
| 6 | Canonical Tags & Duplicate URLs | ★ | Technical SEO |
| 7 | URL Structure & Hierarchy | ★ | Technical SEO |
| 8 | Structured Data / Product Schema | ★ | Technical SEO |
| 9 | Pagination & Infinite Scroll | ★ | Technical SEO |
| 10 | Tag & Filter Page Management | ★ | Technical SEO |
| 11 | Redirect Chains & Broken Links | ◆ | Technical SEO |
| 12 | Crawl Budget & Index Bloat | ◆ | Technical SEO |
| 13 | Title Tags | ★ | On-Page SEO |
| 14 | Meta Descriptions | ★ | On-Page SEO |
| 15 | Heading Structure (H1-H3) | ★ | On-Page SEO |
| 16 | Image Optimisation & Alt Text | ★ | On-Page SEO |
| 17 | Internal Linking Architecture | ★ | On-Page SEO |
| 18 | Category Page Content Quality | ★ | On-Page SEO |
| 19 | Content Depth vs Competitors | ◆ | On-Page SEO |
| 20 | Open Graph / Social Meta Tags | ◆ | On-Page SEO |
| 21 | Product Page SEO Quality | ★ | Product & Catalogue SEO |
| 22 | Product Description Depth | ★ | Product & Catalogue SEO |
| 23 | Collection / Category Architecture | ★ | Product & Catalogue SEO |
| 24 | Product Variant & Option Handling | ★ | Product & Catalogue SEO |
| 25 | Out-of-Stock & Discontinued Product Strategy | ★ | Product & Catalogue SEO |
| 26 | Faceted Navigation SEO | ◆ | Product & Catalogue SEO |
| 27 | Product Image SEO | ◆ | Product & Catalogue SEO |
| 28 | User-Generated Content (Reviews on Pages) | ◆ | Product & Catalogue SEO |
| 29 | Current Ranking Keywords (Top 20) | ★ | E-Commerce Keyword Strategy |
| 30 | Product & Category Keyword Coverage | ★ | E-Commerce Keyword Strategy |
| 31 | Long-Tail & Modifier Keyword Opportunities | ★ | E-Commerce Keyword Strategy |
| 32 | Quick-Win Keywords (pos. 4-20) | ★ | E-Commerce Keyword Strategy |
| 33 | Keyword Gap vs Competitors | ◆ | E-Commerce Keyword Strategy |
| 34 | Branded vs Non-Branded Traffic Split | ◆ | E-Commerce Keyword Strategy |
| 35 | Identify Top 3 Organic Competitors | ★ | Competitor & SERP Analysis |
| 36 | Compare Domain Authority | ★ | Competitor & SERP Analysis |
| 37 | SERP Feature & Shopping Carousel Presence | ◆ | Competitor & SERP Analysis |
| 38 | Content Gap Analysis | ◆ | Competitor & SERP Analysis |
| 39 | Total Backlinks & Referring Domains | ◆ | Backlink Profile |
| 40 | Toxic / Spammy Backlinks | ◆ | Backlink Profile |
| 41 | Competitor Link Gap | ◆ | Backlink Profile |
| 42 | Navigation & Site Architecture | ★ | UX & Conversion |
| 43 | Cart & Checkout SEO Impact | ★ | UX & Conversion |
| 44 | Trust Signals & Social Proof | ★ | UX & Conversion |
| 45 | Page Layout & Readability | ★ | UX & Conversion |
| 46 | Overall E-Commerce Conversion Funnel | ◆ | UX & Conversion |
| 47 | Google AI Overview & Shopping AI Presence | ★ | AI Search (GEO/AEO) |
| 48 | Answer Engine Product Recommendation Presence | ★ | AI Search (GEO/AEO) |
| 49 | Product Structured Data for AI | ◆ | AI Search (GEO/AEO) |
| 50 | Review & Rating Signal Strength for AI | ◆ | AI Search (GEO/AEO) |
| 51 | Buying-Guide & Comparison Content | ◆ | AI Search (GEO/AEO) |
| 52 | AI Crawler Access & Feed Health | ★ | AI Search (GEO/AEO) |

---

## Section 1 — Technical SEO (E-Commerce Adapted)

> Core technical health checks with e-commerce-specific additions for duplicate product URLs, pagination handling, tag page bloat, and platform-level crawl budget issues.

---

### #1 — Page Speed (Mobile & Desktop) ★
**Tool:** PageSpeed Insights API — `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={clientURL}&strategy=mobile` + `&strategy=desktop`

**How it works (automated):**  
Calls the PageSpeed Insights API for both strategies. Extracts the **Performance score** (0-100). Score is based on the lower of the two (mobile is almost always the limiting factor).

**E-commerce context:** Speed is doubly critical for online stores. Every 100ms of additional load time reduces conversion rates by approximately 1%. Product pages with high-resolution images, review widgets, and recommendation carousels are especially vulnerable.

**Scoring logic:**

| Mobile Performance Score | Audit Score | Rating |
|---|---|---|
| 90-100 | 8-10 | 🟢 |
| 70-89 | 5-7 | 🟡 |
| Below 70 | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Page speed is strong on both mobile ({mobile_score}) and desktop ({desktop_score}). For an online store where conversion rate is directly tied to load time, this is a competitive advantage. No immediate action required.

> 🟡 **Needs attention:** Performance is acceptable but not optimal (Mobile: {mobile_score}, Desktop: {desktop_score}). E-commerce sites are particularly speed-sensitive; product images, review widgets, and third-party scripts (chat, analytics, retargeting) are common culprits. Prioritised fixes are listed in the action plan.

> 🔴 **Critical:** Page speed is poor (Mobile: {mobile_score}, Desktop: {desktop_score}). For an online store, slow load times directly reduce revenue. Research consistently shows that each additional second of load time costs measurable conversion rate points. Immediate optimisation is required.

---

### #2 — Core Web Vitals (LCP, INP, CLS) ★
**Tool:** PageSpeed Insights API — same call as #1, extracts Core Web Vitals from `loadingExperience` or `lighthouseResult`

**How it works (automated):**  
Extracts LCP, INP, and CLS values. Compares each against Google's thresholds. Score based on how many metrics fall in the "Good" band.

**E-commerce context:** CLS failures are especially damaging on product pages where images load late and push "Add to Cart" buttons. LCP issues commonly stem from hero product images not optimised with `loading="eager"` or proper sizing.

**Thresholds:**
- LCP: ≤2.5s = Good · ≤4.0s = Needs Improvement · >4.0s = Poor
- INP: ≤200ms = Good · ≤500ms = Needs Improvement · >500ms = Poor
- CLS: ≤0.1 = Good · ≤0.25 = Needs Improvement · >0.25 = Poor

**Scoring logic:**

| Passing metrics | Audit Score | Rating |
|---|---|---|
| All 3 pass | 8-10 | 🟢 |
| 1-2 pass | 4-7 | 🟡 |
| 0 pass | 1-3 | 🔴 |

**Standard messages:**

> 🟢 **Good:** All three Core Web Vitals pass Google's thresholds (LCP: {lcp}, INP: {inp}, CLS: {cls}). The site delivers a fast, stable shopping experience. This is a direct ranking signal; maintain it through future theme and plugin updates.

> 🟡 **Needs attention:** {N} of 3 Core Web Vitals are outside the "Good" range (LCP: {lcp}, INP: {inp}, CLS: {cls}). For e-commerce, CLS failures on product pages are particularly damaging; layout shifts that move the "Add to Cart" button frustrate shoppers and directly reduce conversions.

> 🔴 **Critical:** Core Web Vitals are failing; {N} metrics in the "Poor" range (LCP: {lcp}, INP: {inp}, CLS: {cls}). This is both a Google ranking signal and a conversion killer. For a store relying on organic traffic, this compounds losses at both the visibility and conversion stages.

---

### #3 — HTTPS & SSL Certificate ★
**Tool:** URL check — attempt HTTPS load, inspect redirect behaviour

**How to check (automated):**  
The tool checks whether the site loads over HTTPS, whether HTTP redirects to HTTPS, and whether the SSL certificate is valid and not expiring within 30 days.

**E-commerce context:** For any site handling payment information, HTTPS is not just an SEO signal; it is a legal and trust requirement. Browser security warnings on checkout pages will kill conversions instantly.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| HTTPS enforced, SSL valid, HTTP redirects correctly | 8-10 | 🟢 |
| HTTPS present but HTTP doesn't redirect, or mixed content | 4-7 | 🟡 |
| No HTTPS or SSL error | 1-3 | 🔴 |

**Standard messages:**

> 🟢 **Good:** HTTPS is correctly enforced across the site. SSL certificate is valid. For an online store processing customer payment and personal data, this is non-negotiable; it is working correctly.

> 🟡 **Needs attention:** HTTPS is present but {specific_issue}. Mixed content warnings or incomplete redirects on product or checkout pages erode buyer trust and can trigger browser security warnings during purchase.

> 🔴 **Critical:** The site has a significant HTTPS/SSL issue. For an online store, this is catastrophic; browsers actively warn users, payment processors may reject transactions, and Google treats HTTPS as a ranking signal. Fix immediately.

---

### #4 — Mobile Responsiveness ★
**Tool:** AI — fetched HTML + PageSpeed Insights mobile usability data

**How to check:**  
AI reviews the HTML for responsive meta viewport tag, CSS media queries, and touch-friendly element sizing. Cross-references PageSpeed's mobile usability flags.

**E-commerce focus:** Check that product image galleries, size/colour selectors, "Add to Cart" buttons, and checkout flows are fully functional on mobile. Product filtering and sorting must work on touch screens.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Fully responsive, product interactions work on mobile | 8-10 | 🟢 |
| Responsive overall, but product elements have issues | 5-7 | 🟡 |
| Not fully responsive or major layout issues on mobile | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The site is fully responsive across device sizes. Product pages, filtering, and checkout work correctly on mobile. With over 70% of e-commerce browsing happening on mobile, this is well handled.

> 🟡 **Needs attention:** The site is broadly responsive but {specific_issue}; e.g. the product image gallery is hard to navigate on smaller screens, or size selectors are too small for touch input. Mobile is where most product discovery happens, even if desktop converts higher.

> 🔴 **Critical:** The site has significant mobile responsiveness issues. For an online store, this means losing the majority of potential customers at the discovery stage. Mobile commerce accounts for over 60% of all e-commerce traffic.

---

### #5 — XML Sitemap & Robots.txt ★
**Tool:** Auto — fetches `{domain}/sitemap.xml` and `{domain}/robots.txt`

**How it works (automated):**
1. Fetches `{domain}/sitemap.xml` (and checks robots.txt for alternate location)
2. Validates well-formed XML
3. Counts URLs and checks for product, category, and blog URLs
4. Fetches a sample of listed URLs and checks HTTP status codes
5. Checks robots.txt for accidental blocking of important paths

**E-commerce context:** Large product catalogues need well-structured sitemaps, ideally split by type (products, categories, blog). Robots.txt on platforms like Shopify is partially locked; check for accidental blocking of collection or product paths.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Found, valid, covers products + categories, no blocked paths | 8-10 | 🟢 |
| Found but missing product types or has stale URLs | 4-7 | 🟡 |
| Not found, malformed, or blocks important paths | 1-3 | 🔴 |

**Standard messages:**

> 🟢 **Good:** XML sitemap found and valid. Contains product, category, and content URLs. Robots.txt is correctly configured. Search engines can fully discover and crawl the store's catalogue.

> 🟡 **Needs attention:** Sitemap is present but {specific_issue}; e.g. out-of-stock products still listed, category pages missing, or sitemap not split by content type. For stores with 100+ products, a well-structured sitemap is essential for efficient crawling.

> 🔴 **Critical:** {specific_issue}; e.g. sitemap is missing, robots.txt blocks product pages, or the sitemap contains mostly error URLs. Search engines cannot efficiently discover the product catalogue. This directly limits how many products appear in search results.

---

### #6 — Canonical Tags & Duplicate URLs ★
**Tool:** AI — HTML analysis of product and category pages

**How to check:**  
AI examines `<link rel="canonical">` tags across product pages, collection pages, and any pages accessible via multiple URL paths. Specifically checks for the e-commerce duplicate content problem: products accessible via `/products/item-name` AND `/collections/collection-name/products/item-name`.

**E-commerce context:** This is the single most common SEO issue on e-commerce platforms. Shopify generates duplicate URLs for every product assigned to multiple collections via the `| within: collection` Liquid filter. WooCommerce creates duplicates through product attribute URLs. Magento's layered navigation generates parameter-based duplicates.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Canonical tags present, self-referencing, consistent across URL variants | 8-10 | 🟢 |
| Canonical tags present but inconsistent or missing on some pages | 5-7 | 🟡 |
| No canonical tags, or canonicals pointing to wrong URLs | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Canonical tags are correctly implemented across product and category pages. Duplicate URL paths resolve to the correct canonical version. Ranking signals are consolidated properly.

> 🟡 **Needs attention:** Canonical tags are present but {specific_issue}; e.g. collection-path product URLs have inconsistent canonicals, or some category pages lack self-referencing canonicals. This splits ranking power across duplicate URLs and confuses Google about which version to index.

> 🔴 **Critical:** Canonical tag implementation has significant issues. {specific_issue}. For an e-commerce site with products in multiple categories, this means Google is indexing duplicate versions of product pages, diluting ranking authority across potentially hundreds of URLs. This is a foundational fix.

---

### #7 — URL Structure & Hierarchy ★
**Tool:** AI — analysis of URL patterns across product, category, and content pages

**How to check:**  
AI analyses URL patterns for consistency, keyword inclusion, and logical hierarchy. Flags platform-forced patterns (Shopify's `/collections/` and `/products/` prefixes, WooCommerce's `/product-category/` paths), unnecessary depth, and parameter-heavy URLs.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Clean, consistent URLs with keyword inclusion; logical hierarchy | 8-10 | 🟢 |
| Mostly clean but some inconsistencies or platform-forced patterns | 5-7 | 🟡 |
| Messy URLs, deep nesting, or parameter-heavy product pages | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** URL structure is clean, consistent, and includes relevant keywords. Category and product URLs follow a logical hierarchy that both search engines and users can understand.

> 🟡 **Needs attention:** URL structure is functional but {specific_issue}; e.g. product URLs are excessively long, collection URLs use numeric IDs instead of keywords, or the platform forces unnecessary path segments. Clean URLs improve both click-through rates from search results and crawl efficiency.

> 🔴 **Critical:** URL structure has significant problems; {specific_issue}. Messy, parameter-heavy, or deeply nested URLs reduce click-through rates from search, waste crawl budget, and make the site harder for Google to understand topically.

---

### #8 — Structured Data / Product Schema ★
**Tool:** AI — HTML analysis + Google Rich Results Test reference

**How to check:**  
AI scans page source for JSON-LD structured data. For product pages, validates `Product` schema including: `name`, `image`, `description`, `sku`, `brand`, `offers` (with `price`, `priceCurrency`, `availability`), and `aggregateRating` (if reviews exist). For category pages, checks for `CollectionPage` or `ItemList` schema. Also checks for `BreadcrumbList` schema site-wide.

**E-commerce context:** Product schema is what enables rich results in Google Search: price, availability ("In Stock"), star ratings, and review counts displayed directly in search results. Stores without this schema miss out on significantly higher click-through rates.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Product schema complete with price, availability, ratings; breadcrumbs present | 8-10 | 🟢 |
| Product schema present but missing key fields (price, availability, or ratings) | 5-7 | 🟡 |
| No Product schema, or schema present but broken / incomplete | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product schema is correctly implemented with all key fields (name, price, availability, ratings). Breadcrumb schema is present. This enables rich results in Google Search showing price, stock status, and star ratings directly in listings, measurably increasing click-through rates.

> 🟡 **Needs attention:** Product schema is present but {specific_issue}; e.g. missing `aggregateRating` (no star ratings in search results), missing `availability` (no stock status shown), or `offers` data is incomplete. Each missing field is a lost opportunity for richer, more clickable search listings.

> 🔴 **Critical:** No Product schema found on product pages. This means the store is invisible to Google Shopping's organic listings and misses all rich result enhancements (price, stock, stars) that competitors are likely displaying. Implementing Product schema is one of the highest-ROI SEO fixes for any online store.

---

### #9 — Pagination & Infinite Scroll ★
**Tool:** AI — HTML analysis of category/collection pages

**How to check:**  
AI examines category and collection pages for pagination implementation. Checks for: numbered pagination links, `rel="next"` / `rel="prev"` link elements (deprecated but still useful), `<a>` tags to subsequent pages (critical for crawlability), and detection of infinite scroll or "Load More" patterns that hide products from crawlers.

**E-commerce context:** Many e-commerce themes use infinite scroll or AJAX-based "Load More" buttons. While these feel modern, they prevent search engines from crawling and indexing products beyond the first page load. This is one of the most common reasons products "disappear" from search results.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Proper pagination with crawlable links to all pages | 8-10 | 🟢 |
| Pagination present but incomplete, or "Load More" with fallback links | 5-7 | 🟡 |
| Infinite scroll with no fallback pagination; products hidden from crawlers | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Category pages use proper pagination with crawlable links. All products are reachable by search engine crawlers through standard HTML links. No products are hidden behind JavaScript-only loading.

> 🟡 **Needs attention:** {specific_issue}; e.g. "Load More" button is used but fallback pagination links exist for crawlers, or pagination is present but `rel="next/prev"` is missing. The priority is ensuring every product page is reachable via a static HTML link path.

> 🔴 **Critical:** Category pages use infinite scroll or JavaScript-only "Load More" with no crawlable pagination fallback. This means search engines can only see products on the first page load. Products beyond the initial view are effectively invisible to Google. This is a high-priority fix.

---

### #10 — Tag & Filter Page Management ★
**Tool:** AI — HTML analysis of tag pages, filter parameters, and robots/meta directives

**How to check:**  
AI examines how the store handles tag-generated and filter-generated URLs. On Shopify, every tag within a collection creates a new indexable URL (e.g. `/collections/shoes/red`). On WooCommerce, product attribute filters generate parameter URLs. Checks for: `noindex` directives on thin tag pages, canonical tags pointing to parent category, and whether important filtered views have unique content or are thin duplicates.

**E-commerce context:** Tag and filter pages are one of the biggest sources of index bloat on e-commerce sites. A store with 20 collections and 15 tags per collection generates 300+ additional indexable URLs, most with duplicate or near-duplicate content. These waste crawl budget and dilute ranking authority.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Tag/filter pages properly managed with noindex or canonical to parent | 8-10 | 🟢 |
| Some management in place but inconsistent or incomplete | 5-7 | 🟡 |
| Tag/filter pages indexed without unique content; significant bloat risk | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Tag and filter pages are properly managed. Thin or duplicate filtered views are either noindexed or canonicalised to the parent category. Crawl budget is preserved for the pages that matter.

> 🟡 **Needs attention:** Tag/filter page management is partially in place but {specific_issue}; e.g. some tag pages are indexed without unique content, or filter parameters create crawlable URLs without `noindex` directives. Each unmanaged tag page is a thin content signal that can dilute the entire site's quality perception.

> 🔴 **Critical:** Tag and filter pages are generating large numbers of indexed, thin-content URLs. {specific_issue}. This is a significant source of crawl budget waste and index bloat. Google's crawlers are spending time on hundreds of low-value pages instead of your actual products and categories.

---

### #11 — Redirect Chains & Broken Links ◆
**Tool:** SEOptimer or Screaming Frog — crawl the site and check redirect paths and 4xx responses

**How to check:**
1. Run a site crawl using SEOptimer or a crawl tool
2. Identify redirect chains (more than 1 hop), redirect loops, and 4xx/5xx error pages
3. Note broken internal links, particularly on category and product pages

**E-commerce context:** Product catalogue changes (discontinued items, seasonal collections, rebranding) create redirect debt over time. A store with years of product turnover may have dozens of redirect chains slowing down the site and diluting link equity.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| No redirect chains; fewer than 5 broken internal links | 8-10 | 🟢 |
| Some redirect chains (2-3 hops) or 5-15 broken links | 5-7 | 🟡 |
| Multiple redirect chains (4+ hops), loops, or 15+ broken links | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** No significant redirect chains or broken links found. Internal link architecture is clean. Link equity flows efficiently to product and category pages.

> 🟡 **Needs attention:** {count} redirect chains and/or {count} broken internal links found. Common in stores with regular product turnover. Each redirect chain adds latency and loses a small percentage of link equity. Broken links on category pages waste crawl budget and damage user experience.

> 🔴 **Critical:** Significant redirect and broken link issues detected. {specific_issues}. For an e-commerce site with potentially thousands of internal links between products and categories, accumulated redirect debt has a measurable impact on both page speed and ranking authority distribution.

---

### #12 — Crawl Budget & Index Bloat ◆
**Tool:** Google Search Console — Pages report + crawl stats

**How to check:**
1. GSC → Indexing → Pages: note total indexed pages vs total submitted
2. Look for a large gap between indexed and valid pages (index bloat indicator)
3. Check for "Discovered - currently not indexed" and "Crawled - currently not indexed" signals
4. Cross-reference with the tag/filter page findings from #10

**E-commerce context:** Stores with thousands of products, tags, filters, and variants can generate tens of thousands of indexable URLs. If Google is spending crawl budget on thin tag pages, out-of-stock product variants, and internal search result pages instead of actual product pages, organic visibility suffers.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Indexed pages align with actual useful content; no significant bloat | 8-10 | 🟢 |
| Some bloat (indexed count 2-3x useful pages); minor "not indexed" issues | 5-7 | 🟡 |
| Major bloat (indexed count 5x+ useful pages); many important pages not indexed | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Index coverage is healthy. The number of indexed pages aligns with the store's actual product and content count. Google is spending crawl budget efficiently on pages that matter.

> 🟡 **Needs attention:** There is a gap between indexed pages and useful content. {specific_issue}; e.g. {N} pages are indexed that appear to be thin tag or filter pages, or {N} important product pages show "Discovered - currently not indexed." Cleaning up index bloat helps Google find and rank the pages that generate revenue.

> 🔴 **Critical:** Significant index bloat detected. Google has indexed {indexed_count} pages but the store has approximately {useful_count} products and categories. The excess consists of {specific_sources}. This wastes crawl budget and sends negative quality signals. A comprehensive crawl budget optimisation is required.

---

## Section 2 — On-Page SEO (Product & Category Adapted)

> Page-level SEO signals adapted for product pages, category pages, and e-commerce content. Every check considers how the page serves both search engines and shoppers.

---

### #13 — Title Tags ★
**Tool:** AI — fetched HTML of homepage, key category pages, and sample product pages

**How to check:**  
AI extracts `<title>` tags from multiple page types. Evaluates: uniqueness across pages, length (50-60 characters), primary keyword inclusion, and whether product titles include key buying modifiers (brand, size, colour, material). Flags template-generated titles that repeat the same format without variation.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Unique, keyword-rich titles on all page types; proper length | 8-10 | 🟢 |
| Titles present but templated or missing keywords on some pages | 5-7 | 🟡 |
| Duplicate, missing, or truncated titles across multiple pages | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Title tags are unique, keyword-rich, and within optimal length across product, category, and content pages. Product titles include relevant buying modifiers. Well executed.

> 🟡 **Needs attention:** Title tags are present but {specific_issue}; e.g. product titles follow a repetitive template ("{Product Name} | {Store Name}" without category or modifier keywords), or category titles don't include the primary search term shoppers use. Unique, descriptive titles measurably improve click-through rates from search results.

> 🔴 **Critical:** Title tag implementation has significant issues. {specific_issue}. For an e-commerce site, title tags are the primary driver of click-through rate from search results. Every product and category page needs a unique, keyword-optimised title.

---

### #14 — Meta Descriptions ★
**Tool:** AI — fetched HTML

**How to check:**  
AI extracts meta descriptions from homepage, category pages, and sample product pages. Evaluates: presence, uniqueness, length (120-160 characters), inclusion of a value proposition or call-to-action, and whether they contain product-specific information (price range, free shipping, key features).

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Unique, compelling descriptions on all page types | 8-10 | 🟢 |
| Descriptions present but generic or auto-generated on some pages | 5-7 | 🟡 |
| Missing, duplicate, or truncated across multiple pages | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Meta descriptions are unique, compelling, and include relevant product or category information. They serve as effective ad copy in search results, encouraging clicks.

> 🟡 **Needs attention:** Meta descriptions are present but {specific_issue}; e.g. product descriptions are auto-generated from the first line of product copy (often truncated mid-sentence), or category descriptions are identical templates. Custom meta descriptions that mention key selling points (free shipping, price range, unique features) improve CTR.

> 🔴 **Critical:** Meta descriptions are missing or duplicated across {N} pages. Google will auto-generate snippets from page content, which often results in truncated product specs or irrelevant text. For a store competing for clicks in search results, this is a lost opportunity on every listing.

---

### #15 — Heading Structure (H1-H3) ★
**Tool:** AI — fetched HTML

**How to check:**  
AI analyses heading hierarchy across product pages, category pages, and the homepage. Checks: exactly one H1 per page, H1 contains primary keyword, logical H2/H3 nesting, and whether product pages use headings to structure descriptions (features, specifications, reviews sections).

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Single H1 with keyword on all pages; logical hierarchy | 8-10 | 🟢 |
| Minor issues (missing H1 on some pages, or H2s used before H1) | 5-7 | 🟡 |
| Multiple H1s, missing H1s, or no heading structure on key pages | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Heading structure is correct across all page types. Each page has a single H1 containing the primary keyword, with logical H2/H3 nesting for content sections. This helps Google understand page topics and improves content scannability.

> 🟡 **Needs attention:** Heading structure has minor issues. {specific_issue}; e.g. product pages use the product name as H1 without the category keyword, or category pages are missing H1s (common with theme-generated pages that use visual banners instead of semantic headings).

> 🔴 **Critical:** Heading structure has significant issues across {N} pages. {specific_issue}. For e-commerce, headings serve double duty: they signal topic relevance to Google and help shoppers scan product information quickly. Fixing heading hierarchy is a foundational on-page improvement.

---

### #16 — Image Optimisation & Alt Text ★
**Tool:** AI — fetched HTML + PageSpeed image audit data

**How to check:**  
AI checks product and category pages for: `alt` attributes on all images (especially product photos), descriptive alt text (not just filenames like "IMG_3421.jpg"), next-gen image formats (WebP, AVIF), proper sizing (not serving 4000px images in 400px containers), and lazy loading implementation on below-fold images.

**E-commerce context:** Product images are the primary content on e-commerce pages. Well-optimised product images with descriptive alt text drive traffic from Google Image Search, which is a significant discovery channel for visual products (fashion, home decor, accessories).

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| All product images have descriptive alt text; images optimised | 8-10 | 🟢 |
| Most images have alt text but some generic or missing; partial optimisation | 5-7 | 🟡 |
| Widespread missing alt text; unoptimised images slowing pages | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product images have descriptive alt text, are properly sized, and use modern formats. Image optimisation supports both accessibility and Google Image Search visibility, which is an important product discovery channel.

> 🟡 **Needs attention:** Image optimisation has gaps. {specific_issue}; e.g. {N} product images have generic alt text ("product image" or the filename), images are not served in WebP format, or large images are not lazy-loaded. Each improvement increases both page speed and image search visibility.

> 🔴 **Critical:** Significant image optimisation issues. {specific_issue}. For a product-heavy store, unoptimised images are likely the biggest contributor to slow page speed, and missing alt text means the entire product catalogue is invisible to Google Image Search.

---

### #17 — Internal Linking Architecture ★
**Tool:** AI — HTML link analysis across multiple pages

**How to check:**  
AI maps internal links from the homepage, category pages, and product pages. Evaluates: whether the homepage links to main categories, whether category pages link to subcategories and products, whether product pages cross-link to related products, and whether blog/content pages link to relevant product or category pages.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Clear hierarchy; categories linked from homepage; products cross-linked | 8-10 | 🟢 |
| Basic linking in place but missing cross-links or orphaned pages | 5-7 | 🟡 |
| Flat or broken link architecture; important pages orphaned | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Internal linking architecture is well-structured. The homepage links to main categories, category pages link to products, and product pages include related product links. Link equity flows efficiently through the catalogue hierarchy.

> 🟡 **Needs attention:** Internal linking is functional but {specific_issue}; e.g. product pages don't cross-link to related items, blog content doesn't link back to relevant categories, or some product pages are only reachable through search/filter (orphaned from the main navigation path).

> 🔴 **Critical:** Internal linking architecture has significant gaps. {specific_issue}. For an e-commerce site, internal links are how Google discovers products and how link authority distributes through the catalogue. Poor internal linking means even well-optimised product pages may never rank.

---

### #18 — Category Page Content Quality ★
**Tool:** AI — fetched HTML of category/collection pages

**How to check:**  
AI evaluates category page content beyond just the product grid. Checks for: introductory text above or below the product grid (minimum 100-200 words), keyword-rich category descriptions, buying guides or FAQ sections on category pages, and whether the page provides context that helps both shoppers and search engines understand the category.

**E-commerce context:** Category pages are the primary ranking targets for commercial keywords ("[product type]", "buy [product type] online"). Many stores have category pages with nothing but a product grid, making them thin content in Google's evaluation.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Category pages have unique descriptive content + product grid | 8-10 | 🟢 |
| Some categories have content but others are grid-only | 5-7 | 🟡 |
| All category pages are product grids with no descriptive content | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Category pages include unique descriptive content alongside product listings. This gives Google the topical context needed to rank these pages for commercial keywords while helping shoppers understand the category offering.

> 🟡 **Needs attention:** Some category pages have descriptive content but {specific_issue}; e.g. {N} categories are grid-only with no introductory text. Category pages are the primary targets for "[product type]" commercial keywords; without supporting content, they are at a disadvantage against competitors who provide it.

> 🔴 **Critical:** Category pages consist entirely of product grids with no descriptive content. These pages are effectively thin content in Google's evaluation. Adding 150-250 words of unique, keyword-rich category descriptions is one of the highest-impact on-page improvements for any e-commerce site.

---

### #19 — Content Depth vs Competitors ◆
**Tool:** Google Search — compare top-ranking pages for target keywords

**How to check:**
1. Search for the store's top 3-5 target category keywords
2. Compare the client's category pages against the top 3 ranking pages
3. Note word count, content types (guides, FAQs, comparison tables), and supporting media
4. Evaluate whether the client's pages provide sufficient depth to compete

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Content depth matches or exceeds top-ranking competitors | 8-10 | 🟢 |
| Content exists but is noticeably thinner than competitors | 5-7 | 🟡 |
| Content is absent or drastically thinner than competitors | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Content depth on key category and product pages matches or exceeds what top-ranking competitors provide. The store is competitive in terms of information quality.

> 🟡 **Needs attention:** Content on key pages is noticeably thinner than top-ranking competitors. {specific_issue}; e.g. competitors include buying guides, comparison tables, or FAQ sections that the client's pages lack. Adding this content would improve ranking competitiveness for the target keywords.

> 🔴 **Critical:** Key pages have significantly less content than competing pages ranking in the top 3. Google consistently favours comprehensive content for commercial queries. The content gap is a primary reason these pages are not ranking higher.

---

### #20 — Open Graph / Social Meta Tags ◆
**Tool:** AI — fetched HTML

**How to check:**  
AI scans for Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`) and Twitter Card meta tags. For product pages, checks whether `og:image` points to the primary product image and `og:type` is set to `product`.

**E-commerce context:** When products are shared on social media, Pinterest, or messaging apps, OG tags determine how the link preview appears. A product shared without a proper OG image shows a generic or broken preview, reducing click-through from social shares.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Full OG tags on all page types; product images used for product pages | 8-10 | 🟢 |
| OG tags present but incomplete or using the store logo instead of product images | 5-7 | 🟡 |
| Missing OG tags on most pages | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Open Graph and social meta tags are correctly implemented. Product pages show the product image and details when shared on social platforms. This maximises click-through from social sharing and referral traffic.

> 🟡 **Needs attention:** OG tags are present but {specific_issue}; e.g. product pages use the store logo instead of the product image for `og:image`, or category pages are missing OG tags entirely. When customers share products on social media, the link preview is the first impression.

> 🔴 **Critical:** Open Graph tags are missing across most pages. When products are shared on Facebook, Pinterest, WhatsApp, or other platforms, link previews are broken or generic. For an e-commerce store where social sharing drives referral traffic, this is a missed conversion opportunity.

---

## Section 3 — Product & Catalogue SEO

> E-commerce-specific checks that evaluate how well the product catalogue is structured, described, and managed for search visibility. This section replaces the Local SEO section from the generic audit.

---

### #21 — Product Page SEO Quality ★
**Tool:** AI — fetched HTML of sample product pages

**How to check:**  
AI evaluates a sample of product pages for SEO fundamentals as a unit: unique title tag with product name + category keyword, unique meta description with key selling point, H1 matching the product title, product schema present, and canonical tag correctly self-referencing. This is a holistic product page quality check.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Product pages meet all core SEO requirements consistently | 8-10 | 🟢 |
| Most product pages are good but some have template-generated issues | 5-7 | 🟡 |
| Product pages have widespread SEO deficiencies | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product pages meet all core SEO requirements: unique titles with buying keywords, custom meta descriptions, correct heading structure, Product schema, and self-referencing canonicals. The catalogue is well-optimised for search visibility.

> 🟡 **Needs attention:** Product pages are partially optimised but {specific_issue}; e.g. titles follow a rigid template without category keywords, meta descriptions are auto-generated from the first line of the product description, or not all pages have Product schema. These are high-volume pages; small improvements multiply across the entire catalogue.

> 🔴 **Critical:** Product pages have widespread SEO issues. {specific_issue}. Each product page is a potential landing page from search; with {N} products in the catalogue, the cumulative impact of poor product page SEO is substantial.

---

### #22 — Product Description Depth ★
**Tool:** AI — fetched HTML of product pages

**How to check:**  
AI evaluates the quality and depth of product descriptions on a sample of pages. Checks: word count (minimum 150-300 words for non-commodity products), unique content (not copy-pasted from manufacturer), structured information (features, benefits, specifications in separate sections), and whether descriptions address common buyer questions.

**E-commerce context:** Thin product descriptions (under 50 words or manufacturer copy-paste) are the second most common e-commerce SEO problem after duplicate URLs. Google treats pages with thin, non-unique content as low quality. Unique, detailed descriptions also reduce return rates by setting accurate expectations.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Unique, detailed descriptions (150+ words) with structured sections | 8-10 | 🟢 |
| Descriptions present but thin (50-150 words) or partially manufacturer copy | 5-7 | 🟡 |
| Missing descriptions, under 50 words, or entirely manufacturer copy-paste | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product descriptions are unique, detailed, and well-structured. They provide the depth Google needs to rank these pages and the information shoppers need to make purchase decisions confidently.

> 🟡 **Needs attention:** Product descriptions exist but {specific_issue}; e.g. many are under 100 words, some appear to be copy-pasted from manufacturer data sheets (used by every retailer selling the same product), or descriptions lack structured sections for features, benefits, and specifications.

> 🔴 **Critical:** Product descriptions are thin, missing, or entirely non-unique across the catalogue. {specific_issue}. Google treats thin, duplicated product content as low quality. This is likely a primary reason product pages are not ranking. Investing in unique product descriptions is one of the most impactful changes this store can make.

---

### #23 — Collection / Category Architecture ★
**Tool:** AI — HTML analysis of navigation and category structure

**How to check:**  
AI maps the category hierarchy by analysing navigation menus, breadcrumb trails, and internal link patterns. Evaluates: depth of hierarchy (ideally 2-3 levels), logical grouping, whether important categories are accessible from the main navigation, and whether the hierarchy reflects how shoppers search for products.

**E-commerce context:** Many e-commerce platforms (notably Shopify) lack true parent-child category relationships. This forces flat hierarchies where all collections sit at the same level, limiting the site's ability to target both broad ("shoes") and specific ("men's running shoes") keywords with appropriate page hierarchy.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Logical hierarchy (2-3 levels), matches search behaviour, accessible from nav | 8-10 | 🟢 |
| Basic structure but too flat or too deep in some areas | 5-7 | 🟡 |
| No meaningful hierarchy; all categories at one level or too deep | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Category architecture is well-structured with a logical 2-3 level hierarchy that reflects how shoppers search. Main categories are accessible from primary navigation, and breadcrumbs reinforce the hierarchy for both users and search engines.

> 🟡 **Needs attention:** Category structure is functional but {specific_issue}; e.g. the hierarchy is completely flat (all categories at one level, no subcategories), or some important product groupings are only accessible through tags rather than dedicated category pages. A clear hierarchy helps Google understand topical relationships.

> 🔴 **Critical:** Category architecture has significant structural issues. {specific_issue}. Without a logical category hierarchy, the store cannot effectively target both broad and specific keywords, and internal link authority cannot flow properly from parent categories to product pages.

---

### #24 — Product Variant & Option Handling ★
**Tool:** AI — HTML analysis of product pages with variants (size, colour, material)

**How to check:**  
AI examines how product variants are handled. Checks whether each variant creates a separate URL (and if so, whether canonicals are correct), whether variant selection changes the page URL, whether variant-specific images have alt text, and whether the page handles variants in a way that doesn't create duplicate content.

**E-commerce context:** A shirt in 5 colours and 4 sizes could generate 20 separate URLs if variants create individual pages. Without proper canonical handling, this multiplies duplicate content exponentially. The ideal approach depends on the platform, but the SEO impact must be managed.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Variants handled cleanly; no duplicate content issues from variants | 8-10 | 🟢 |
| Variants mostly handled but some duplicate content from variant URLs | 5-7 | 🟡 |
| Variants creating significant duplicate content or thin pages | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product variants (size, colour, material) are handled cleanly. Variant selection does not create duplicate content issues, and the chosen approach (single URL with variant selectors, or separate URLs with correct canonicals) is correctly implemented.

> 🟡 **Needs attention:** Variant handling has {specific_issue}; e.g. colour variants create separate URLs without canonical tags pointing to the main product, or variant pages have identical descriptions. This creates duplicate content that dilutes the product's ranking authority.

> 🔴 **Critical:** Product variants are creating significant duplicate content. {specific_issue}. With {N} products and multiple variants each, this could mean hundreds or thousands of thin, duplicate pages competing with each other in search results.

---

### #25 — Out-of-Stock & Discontinued Product Strategy ★
**Tool:** AI — HTML analysis of out-of-stock product pages (if detectable)

**How to check:**  
AI checks how the store handles products that are out of stock or discontinued. Evaluates: whether out-of-stock products return 200 (good if temporary) or 404/410, whether there is a "notify when back in stock" option, whether discontinued product pages redirect to the parent category, and whether product pages are simply deleted (destroying any accumulated search authority).

**E-commerce context:** Product pages accumulate search authority over time through links and impressions. Deleting an out-of-stock product page destroys all that accumulated value. The correct strategy depends on whether the product will return (keep the page, show alternatives) or is permanently discontinued (301 redirect to parent category or replacement).

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Clear strategy: temporary OOS pages kept with alternatives; discontinued properly redirected | 8-10 | 🟢 |
| Some handling in place but inconsistent | 5-7 | 🟡 |
| Products simply deleted or returning 404s with no strategy | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Out-of-stock and discontinued products are handled strategically. Temporarily unavailable products retain their pages with "notify me" options and related product suggestions. Permanently discontinued products redirect to the appropriate category page, preserving accumulated link authority.

> 🟡 **Needs attention:** Out-of-stock product handling is inconsistent. {specific_issue}; e.g. some discontinued products return 404 errors while others redirect correctly, or out-of-stock pages exist but offer no alternative products or "notify me" options. A consistent strategy preserves both SEO value and potential customer conversions.

> 🔴 **Critical:** {specific_issue}; e.g. discontinued products are returning 404 errors with no redirects, or out-of-stock pages have been deleted entirely. Every deleted product page that had rankings or backlinks represents lost search authority. Implementing a proper product lifecycle strategy is essential.

---

### #26 — Faceted Navigation SEO ◆
**Tool:** AI — HTML analysis of filtered/faceted navigation on category pages

**How to check:**  
AI examines category pages with filtering options (price range, brand, size, colour, material, rating). Checks: whether each filter combination creates a crawlable URL, whether those URLs are canonicalised or noindexed, whether important filter combinations (e.g. "brand + category") have dedicated landing pages, and whether `robots.txt` or meta robots directives prevent excessive crawling of filter URLs.

**E-commerce context:** A category page with 5 filter dimensions and 10 options each can theoretically generate 100,000+ unique URLs. Without proper management, this is the largest source of crawl budget waste and index bloat on e-commerce sites.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Faceted navigation properly managed; strategic filter pages indexed | 8-10 | 🟢 |
| Some management but incomplete; excessive filter URLs crawlable | 5-7 | 🟡 |
| Faceted navigation unmanaged; massive index bloat risk | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Faceted navigation is properly managed. Filter combinations use appropriate canonicalisation or noindex directives. Strategically valuable filter pages (e.g. brand + category) are indexed as dedicated landing pages while noise combinations are suppressed.

> 🟡 **Needs attention:** Faceted navigation management is partial. {specific_issue}; e.g. price filter combinations are generating crawlable URLs, or some filter parameters aren't handled by canonicals or noindex. Each unmanaged filter dimension multiplies the number of thin, duplicate pages exponentially.

> 🔴 **Critical:** Faceted navigation is unmanaged. Filter parameters are creating thousands of crawlable, indexable URLs with near-duplicate content. This is likely the store's biggest SEO problem; it wastes crawl budget, creates massive duplicate content, and dilutes ranking authority across the entire domain.

---

### #27 — Product Image SEO ◆
**Tool:** AI — fetched HTML of product pages

**How to check:**  
AI performs a deep check of product image SEO beyond the basic alt text check in #16. Evaluates: descriptive filenames (not "IMG_3421.jpg"), multiple product angles with individual alt text, image sitemap presence or inclusion in main sitemap, structured data `image` field pointing to the primary product image, and whether images are optimised for Google Image Search and Google Shopping.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Images have descriptive names, unique alt text per angle, image sitemap present | 8-10 | 🟢 |
| Basic alt text present but filenames generic; no image sitemap | 5-7 | 🟡 |
| Generic filenames, missing alt text, no image SEO strategy | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product images are fully optimised for search: descriptive filenames, unique alt text for each product angle, and images included in the sitemap. The store is positioned to capture traffic from Google Image Search and Google Shopping's visual results.

> 🟡 **Needs attention:** Product image SEO is partially addressed. {specific_issue}; e.g. alt text is present but filenames are generic (DSC_1234.jpg), or multiple product angles share the same alt text. Google Image Search is a significant product discovery channel; each image is a potential organic entry point.

> 🔴 **Critical:** Product image SEO is not addressed. {specific_issue}. For a visual product catalogue, this means missing out on Google Image Search traffic entirely. Product images are often the first touchpoint shoppers have with a store; making them discoverable in search is a high-impact opportunity.

---

### #28 — User-Generated Content (Reviews on Pages) ◆
**Tool:** AI — fetched HTML of product pages

**How to check:**  
AI checks whether product pages include customer reviews directly on the page (not loaded via iframe or third-party widget that hides content from crawlers). Evaluates: whether review text is in the page HTML (not JavaScript-loaded), whether `AggregateRating` schema includes review count and average, and whether reviews add unique keyword-rich content to each product page.

**E-commerce context:** Customer reviews serve triple duty for SEO: they add unique, keyword-rich content to product pages (naturally containing long-tail phrases shoppers use), they enable star ratings in search results via schema, and they signal trustworthiness to both Google and shoppers.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Reviews present in page HTML, AggregateRating schema complete | 8-10 | 🟢 |
| Reviews present but loaded via JS only, or schema incomplete | 5-7 | 🟡 |
| No reviews on product pages, or reviews hidden from crawlers | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Customer reviews are present in the page HTML and supported by complete AggregateRating schema. Reviews add unique, keyword-rich content to each product page and enable star ratings in search results. Well implemented.

> 🟡 **Needs attention:** Reviews exist but {specific_issue}; e.g. reviews are loaded entirely via JavaScript (invisible to Google until rendered), AggregateRating schema is missing or incomplete, or reviews are on a separate page rather than the product page itself. Reviews that Google can crawl and index add valuable unique content to every product page.

> 🔴 **Critical:** No customer reviews are present on product pages, or reviews are completely hidden behind a third-party iframe. For e-commerce, reviews are one of the most effective ways to add unique, long-tail keyword content at scale while simultaneously improving conversion rates and enabling star ratings in search results.

---

## Section 4 — E-Commerce Keyword Strategy

> What the store is ranking for today and the product-level, category-level, and long-tail traffic it could capture with targeted improvements.

---

### #29 — Current Ranking Keywords (Top 20) ★
**Tool:** Google Search Console — `https://search.google.com/search-console`

**How to check:**
1. GSC → Performance → Search results
2. Sort by impressions (descending)
3. Record the top 20 queries, their average position, CTR, and clicks
4. Categorise: branded vs product vs category vs informational

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Rankings for 10+ relevant product/category keywords | 8-10 | 🟢 |
| Rankings exist but mostly branded or very low position | 5-7 | 🟡 |
| Few or no relevant keyword rankings | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store has established rankings for {N} relevant product and category keywords. This provides a foundation to build on. The current keyword profile is recorded in the report for strategic reference.

> 🟡 **Needs attention:** Current rankings are limited. {specific_issue}; e.g. most visibility comes from branded searches, or product keywords rank at position 15+ with low CTR. The keyword baseline is established; the strategy section outlines how to improve from here.

> 🔴 **Critical:** The store has very little organic keyword visibility. {specific_issue}. This indicates either a new domain, significant technical barriers preventing indexation (see Technical SEO findings), or a fundamental content/authority gap. The keyword strategy must start from foundational improvements.

---

### #30 — Product & Category Keyword Coverage ★
**Tool:** Google Search — check ranking for core product and category keywords

**How to check:**
1. Identify the store's 5-10 core product categories
2. Search for each category as a buyer would (e.g. "buy [product type] online", "[product type] UK")
3. Check if the store appears in the top 20 results
4. Note which categories have coverage and which are invisible

**E-commerce context:** Each product category should have a dedicated, optimised category page targeting the primary commercial keyword. Missing coverage for a core category means losing all organic traffic for that product line.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Store appears for 80%+ of core category keywords | 8-10 | 🟢 |
| Store appears for 40-80% of core category keywords | 5-7 | 🟡 |
| Store appears for fewer than 40% of core category keywords | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store has organic visibility for the majority of its core product and category keywords. Category pages are targeting the right commercial terms and appearing in search results.

> 🟡 **Needs attention:** The store has organic coverage for some but not all core categories. {specific_issue}; e.g. the store ranks for "running shoes" but has no visibility for "trail running shoes" or "women's running shoes." Each missing category keyword represents lost purchase-intent traffic.

> 🔴 **Critical:** The store has minimal organic visibility for its core product categories. {specific_issue}. Shoppers searching for the types of products this store sells are not finding it in Google. This is the fundamental problem the audit's recommendations address.

---

### #31 — Long-Tail & Modifier Keyword Opportunities ★
**Tool:** Google Search suggestions, Google Search Console, SEOptimer

**How to check:**
1. For each core category, check Google autocomplete suggestions
2. Note modifier patterns: brand, material, colour, use case, price range, "best", "cheap", "for [audience]"
3. Check whether the store has pages targeting these long-tail combinations
4. Evaluate whether product titles and descriptions include relevant modifiers

**E-commerce context:** Long-tail modifiers represent the bulk of e-commerce search volume. A store ranking for "leather jacket" captures one keyword; a store that also ranks for "men's brown leather jacket", "leather jacket under $200", and "best leather jacket for winter" captures the entire purchase journey.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Product pages and categories include modifier keywords; long-tail coverage evident | 8-10 | 🟢 |
| Some modifier keywords present but significant gaps | 5-7 | 🟡 |
| No long-tail strategy; products have generic, modifier-free titles | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product pages and category descriptions include relevant long-tail modifiers (brand, material, colour, use case). The store is positioned to capture specific, high-intent product searches beyond just the base category keywords.

> 🟡 **Needs attention:** Long-tail keyword coverage is partial. {specific_issue}; e.g. product titles include brand and name but not material or use case, or category pages don't include modifier-based subcategories. Adding modifier keywords to product titles and creating subcategory pages for popular modifiers would capture more purchase-intent traffic.

> 🔴 **Critical:** No long-tail keyword strategy is evident. Product titles and descriptions use generic, modifier-free language. {specific_issue}. The store is competing for only the most competitive head terms while leaving the vast majority of specific, high-conversion product searches to competitors.

---

### #32 — Quick-Win Keywords (pos. 4-20) ★
**Tool:** Google Search Console

**How to check:**
1. GSC → Performance → filter by position 4-20
2. Sort by impressions
3. Identify product and category keywords just outside page 1 or in lower page 1 positions
4. Note which pages rank for these terms and what improvements would push them higher

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| 10+ product/category keywords in positions 4-20 (strong opportunity) | 8-10 | 🟢 |
| 5-10 keywords in striking distance | 5-7 | 🟡 |
| Fewer than 5, or none with meaningful volume | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** {N} product and category keywords are in striking distance (positions 4-20). These represent the fastest path to increased organic revenue; small improvements in content, internal links, or page speed can move these onto page 1 where they will capture significantly more clicks.

> 🟡 **Needs attention:** Some striking-distance keywords exist but volume is limited. {specific_issue}. The action plan prioritises improvements to the pages ranking for these terms, as they represent the quickest wins.

> 🔴 **Critical:** Very few keywords in striking distance. This indicates either very new content, significant authority gaps, or technical issues preventing pages from ranking at all. The strategy shifts from quick optimisation to foundational improvements.

---

### #33 — Keyword Gap vs Competitors ◆
**Tool:** SEOptimer, Google Search — compare keyword visibility

**How to check:**
1. Identify the store's top 3 organic competitors (from #35)
2. Check what product and category keywords competitors rank for
3. Identify keywords where competitors have visibility but the client does not
4. Prioritise by search volume and commercial intent

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Client covers 80%+ of competitor keyword footprint | 8-10 | 🟢 |
| Client covers 50-80% | 5-7 | 🟡 |
| Client covers fewer than 50% | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store's keyword coverage is competitive. Few significant keyword gaps exist relative to the top 3 organic competitors. Focus should be on deepening existing rankings rather than chasing new keyword territory.

> 🟡 **Needs attention:** Competitors rank for {N} product/category keywords where the store has no visibility. {specific_issue}; e.g. a competitor has dedicated pages for "[brand] [product type]" that the client lacks. These gaps represent products the store sells but isn't being found for.

> 🔴 **Critical:** Significant keyword gaps exist. Competitors collectively rank for a much larger set of product and category keywords. {specific_issue}. Closing these gaps requires both content creation (new category/product pages) and authority building.

---

### #34 — Branded vs Non-Branded Traffic Split ◆
**Tool:** Google Search Console

**How to check:**
1. GSC → Performance → filter queries containing brand name = branded traffic
2. All other queries = non-branded traffic
3. Calculate the ratio

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Non-branded traffic is 50%+ of total organic | 8-10 | 🟢 |
| Non-branded is 25-50% | 5-7 | 🟡 |
| Non-branded is under 25% (high brand dependency) | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store has a healthy balance of branded and non-branded organic traffic. Non-branded searches account for {N}% of organic visibility, indicating the store is discoverable by shoppers who don't already know the brand.

> 🟡 **Needs attention:** The store relies heavily on branded searches ({N}% branded). This means organic growth is tied to brand awareness efforts rather than product discoverability. Increasing non-branded keyword visibility through category page optimisation and content marketing would reduce this dependency.

> 🔴 **Critical:** Almost all organic traffic comes from branded searches ({N}%). The store is essentially invisible to shoppers who don't already know the brand name. This is a significant vulnerability; any dip in brand awareness directly reduces organic traffic. Building non-branded visibility is a strategic priority.

---

## Section 5 — Competitor & SERP Analysis

> Benchmarking the store's SEO position against the competitors winning product and category searches.

---

### #35 — Identify Top 3 Organic Competitors ★
**Tool:** Google Search

**How to check:**
1. Search for the store's top 3-5 core product/category keywords
2. Note which domains consistently appear in the top 5 organic results
3. Include both direct competitors (other stores) and marketplace competitors (Amazon, eBay, Etsy)
4. Record for use in subsequent competitor checks

**Scoring logic:**

Research item; populate competitor comparison table in the report.

**Standard messages:**

> Competitors identified: {competitor_1}, {competitor_2}, {competitor_3}. These domains consistently outrank the store for core product and category keywords. The following checks compare the store's SEO metrics and content against these competitors.

---

### #36 — Compare Domain Authority ★
**Tool:** SEOptimer — Domain Strength / SEO Score comparison

**How to check:**
1. Run SEOptimer on the client domain and each competitor
2. Note overall SEO score, domain authority equivalent, and total indexed pages
3. Compare link profile strength

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Client DA within 10 points of top competitors | 8-10 | 🟢 |
| Client DA 10-25 points below competitors | 5-7 | 🟡 |
| Client DA 25+ points below competitors | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Domain authority is competitive with the top 3 organic competitors. The store is not at a structural authority disadvantage; ranking improvements will come from content and on-page optimisation rather than requiring major authority building.

> 🟡 **Needs attention:** Domain authority is moderately below competitors ({client_da} vs average {competitor_avg}). This means the store needs to be more precise with keyword targeting and on-page optimisation to compensate. Authority building through quality backlinks and content will help close the gap over time.

> 🔴 **Critical:** Domain authority is significantly below competitors ({client_da} vs average {competitor_avg}). This indicates a substantial authority gap that limits ranking potential even with perfect on-page SEO. A parallel authority-building strategy (content marketing, PR, digital partnerships) is needed alongside technical and on-page improvements.

---

### #37 — SERP Feature & Shopping Carousel Presence ◆
**Tool:** Google Search — inspect SERP layout for target keywords

**How to check:**
1. Search for the store's top 10 product/category keywords
2. Note which SERP features appear: Google Shopping carousel, Product Knowledge Panels, "People Also Ask", image packs, featured snippets
3. Check if the store appears in any of these features
4. Note which competitors appear in shopping carousels or product results

**E-commerce context:** Google Shopping results (free product listings) appear for the majority of product searches and capture significant click-through. Stores not appearing in these features are losing traffic to those that do.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Store appears in Shopping results and/or other SERP features | 8-10 | 🟢 |
| SERP features present for target keywords but store is absent | 5-7 | 🟡 |
| Store absent from all SERP features; competitors dominate | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store appears in Google Shopping results and/or other SERP features for core product keywords. This provides additional visibility beyond standard organic listings.

> 🟡 **Needs attention:** Google Shopping carousels and product-related SERP features appear for {N} of the store's target keywords, but the store is not present. {specific_issue}; e.g. Google Merchant Center may not be set up, product feeds may be incomplete, or Product schema may be missing. Free Google Shopping listings are a significant organic traffic opportunity.

> 🔴 **Critical:** The store is absent from all product-related SERP features while competitors appear prominently. For product searches, Google Shopping results often capture more clicks than standard organic listings. Setting up Google Merchant Center and submitting a product feed should be a priority.

---

### #38 — Content Gap Analysis ◆
**Tool:** Google Search — compare content types and coverage

**How to check:**
1. Compare the types of content top competitors publish: buying guides, comparison articles, "best [product type]" roundups, how-to guides, video content
2. Note content types the client is missing entirely
3. Evaluate whether competitors' blog or resource content drives organic traffic to product pages

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Client has content coverage comparable to competitors | 8-10 | 🟢 |
| Client has some content but missing key content types | 5-7 | 🟡 |
| Client has no content marketing; competitors have extensive content | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Content coverage is competitive. The store provides the informational and comparison content shoppers need alongside its product catalogue. This captures top-of-funnel organic traffic that feeds into product discovery.

> 🟡 **Needs attention:** Competitors publish content types the store does not have. {specific_issue}; e.g. competitors have buying guides for each category, or "best [product type] for [use case]" articles that rank and drive traffic to product pages. Adding this content layer would capture informational searches that currently go to competitors.

> 🔴 **Critical:** The store has no content marketing while competitors use blogs, guides, and comparison content to capture organic traffic at scale. {specific_issue}. Content marketing for e-commerce isn't optional; it captures the 60-70% of product-related searches that have informational intent and feeds shoppers into the purchase funnel.

---

## Section 6 — Backlink Profile

> Who links to the store and whether those links support or undermine its authority. Growth tier only.

---

### #39 — Total Backlinks & Referring Domains ◆
**Tool:** SEOptimer or Moz Link Explorer

**How to check:**
1. Run the domain through SEOptimer or Moz
2. Note total backlinks, unique referring domains, and domain authority
3. Compare against competitors from #36

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Referring domain count competitive with top 3 competitors | 8-10 | 🟢 |
| Referring domains exist but significantly fewer than competitors | 5-7 | 🟡 |
| Very few referring domains; major authority gap | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store has a healthy backlink profile with {N} referring domains. Link authority is competitive with the top organic competitors in the category.

> 🟡 **Needs attention:** The store has {N} referring domains, which is below competitors ({competitor_avg} average). For e-commerce, quality backlinks from industry publications, review sites, and complementary brands can be built through PR, partnerships, and content marketing. The link gap is not critical but limits ranking potential for competitive keywords.

> 🔴 **Critical:** The store has very few referring domains ({N}), compared to competitors averaging {competitor_avg}. This authority gap means even well-optimised pages will struggle to outrank competitors for competitive product keywords. A link-building strategy should run in parallel with on-page improvements.

---

### #40 — Toxic / Spammy Backlinks ◆
**Tool:** SEOptimer or Moz — review link quality

**How to check:**
1. Review the backlink profile for low-quality or spammy links
2. Look for: links from irrelevant foreign-language sites, link farm patterns, exact-match anchor text manipulation, PBN-style links
3. Note the volume and severity

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Clean link profile; no concerning patterns | 8-10 | 🟢 |
| Some questionable links but not dominant | 5-7 | 🟡 |
| Significant toxic link volume; penalty risk | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The backlink profile is clean. No significant toxic or spammy link patterns detected. No disavow action required.

> 🟡 **Needs attention:** Some questionable backlinks identified. {specific_issue}. While not at penalty-risk levels, monitoring these and potentially disavowing the worst offenders is recommended as a preventive measure.

> 🔴 **Critical:** The backlink profile contains a concerning volume of toxic or spammy links. {specific_issue}. This may be contributing to ranking suppression. A disavow file should be prepared and submitted through Google Search Console.

---

### #41 — Competitor Link Gap ◆
**Tool:** SEOptimer or Moz — compare link profiles

**How to check:**
1. Compare the client's referring domains against each competitor's
2. Identify domains that link to competitors but not to the client
3. Prioritise by relevance and authority (industry publications, review sites, complementary brands)

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Few actionable link gaps; competitors' links are mostly non-replicable | 8-10 | 🟢 |
| 10-20 actionable link opportunities from competitor analysis | 5-7 | 🟡 |
| 20+ relevant sites linking to competitors but not client | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Few actionable link opportunities from competitor analysis. The store's link profile covers most of the same sources as competitors.

> 🟡 **Needs attention:** {N} relevant domains link to competitors but not to the store. These include {examples}. Each represents a potential outreach opportunity; industry publications, product review sites, and complementary brand partnerships are typically the most productive sources for e-commerce link building.

> 🔴 **Critical:** Significant link gap identified. {N}+ relevant domains link to competitors but not to the store. The link-building opportunities are documented in the report, prioritised by authority and relevance.

---

## Section 7 — UX & Conversion (E-Commerce Adapted)

> How well the site turns organic visitors into buyers. For e-commerce, this includes cart and checkout SEO impact, trust signals, and the overall purchase funnel.

---

### #42 — Navigation & Site Architecture ★
**Tool:** AI — HTML `<nav>` elements and link structure

**How to check:**  
AI analyses navigation structure for e-commerce best practices: mega menu or category-organised navigation, number of top-level items (5-8 for e-commerce), search bar prominence, breadcrumb navigation, and whether the navigation reflects the product category hierarchy.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Clean, category-organised navigation; breadcrumbs present; search prominent | 8-10 | 🟢 |
| Navigation functional but overcrowded or missing key elements | 5-7 | 🟡 |
| Confusing navigation; key categories buried; no breadcrumbs | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Navigation is well-structured for e-commerce. Categories are logically organised, breadcrumbs reinforce hierarchy, and the search function is prominently placed. Shoppers can find products through both browse and search paths.

> 🟡 **Needs attention:** Navigation has room for improvement. {specific_issue}; e.g. too many top-level items create decision fatigue, breadcrumbs are missing, or the search bar is hard to find. For e-commerce, navigation quality directly impacts both SEO (crawl efficiency) and conversion (product findability).

> 🔴 **Critical:** Navigation has significant issues. {specific_issue}. Poor navigation on an e-commerce site means shoppers can't find products, search engines can't crawl efficiently, and both traffic and conversions suffer.

---

### #43 — Cart & Checkout SEO Impact ★
**Tool:** AI — HTML analysis of cart and checkout pages (if accessible)

**How to check:**  
AI evaluates the SEO impact of the cart and checkout process. Checks: whether cart and checkout pages are noindexed (they should be), whether the checkout process forces users off the main domain, whether abandoned cart URLs create indexable thin pages, and whether the thank-you/confirmation page is noindexed.

**E-commerce context:** Cart and checkout pages should not appear in search results. If they are indexed, they create thin content pages. If the checkout is on a separate domain (common with some payment processors), the domain switch can confuse tracking and attribution.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Cart/checkout pages noindexed; checkout on same domain; no thin pages | 8-10 | 🟢 |
| Mostly handled but some cart/checkout URLs indexed | 5-7 | 🟡 |
| Cart/checkout pages indexed; creating thin content or crawl issues | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Cart and checkout pages are properly noindexed. The checkout process stays on the same domain. No thin transaction pages are appearing in search results.

> 🟡 **Needs attention:** {specific_issue}; e.g. cart page is indexed, or abandoned cart URLs are crawlable. While not critical, indexed transaction pages are thin content signals and waste crawl budget. Adding noindex directives to cart, checkout, and order confirmation pages is a quick fix.

> 🔴 **Critical:** Cart and checkout pages have significant SEO issues. {specific_issue}; e.g. checkout is on a separate domain breaking the user journey, or hundreds of abandoned cart URLs are indexed as thin pages. These are quick fixes with meaningful impact.

---

### #44 — Trust Signals & Social Proof ★
**Tool:** AI — fetched HTML

**How to check:**  
AI scans key pages for trust signals critical to e-commerce conversion: SSL/security badges, payment method icons, return/refund policy visibility, shipping information, customer review widgets, trust badges (e.g. Trustpilot, Google Customer Reviews), and contact information accessibility.

**E-commerce context:** Organic visitors arrive without the trust context that paid ad audiences receive. A shopper finding a store through Google for the first time needs visible trust signals to convert. Missing trust signals primarily affect conversion rate, but indirectly affect SEO through high bounce rates and low engagement.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Comprehensive trust signals: reviews, security badges, policies, contact info | 8-10 | 🟢 |
| Some trust signals present but incomplete | 5-7 | 🟡 |
| Minimal or no visible trust signals | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Trust signals are well-implemented: customer reviews are visible, security and payment badges are displayed, return policy is accessible, and contact information is easy to find. These signals help convert organic visitors who are discovering the store for the first time.

> 🟡 **Needs attention:** Trust signals are partially present but {specific_issue}; e.g. no visible customer reviews on product pages, return policy is buried in the footer, or no security badges near the "Add to Cart" button. For first-time organic visitors, trust is the primary conversion barrier.

> 🔴 **Critical:** The store lacks basic trust signals that online shoppers expect. {specific_issue}. First-time visitors from organic search have no brand familiarity; without visible reviews, security indicators, and clear policies, the store's conversion rate for organic traffic will be significantly below potential.

---

### #45 — Page Layout & Readability ★
**Tool:** AI — fetched HTML

**How to check:**  
AI reviews page layout for e-commerce best practices: product image size and placement, "Add to Cart" button prominence, price visibility, product information hierarchy, mobile layout of product pages, and whether key buying information (price, availability, shipping) is visible without scrolling.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Well-structured pages; key buying info visible above fold; scannable | 8-10 | 🟢 |
| Mostly readable but some pages have layout issues | 5-7 | 🟡 |
| Poor layout; key information buried or hard to find | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Page layouts are well-structured for e-commerce. Product pages show key buying information (price, availability, primary image, "Add to Cart") prominently. Content is scannable with clear visual hierarchy.

> 🟡 **Needs attention:** Page layout has room for improvement. {specific_issue}; e.g. the "Add to Cart" button is below the fold on mobile, price information requires scrolling to find, or product descriptions are dense text blocks without scannable structure. Layout improvements directly impact conversion rate.

> 🔴 **Critical:** Page layout has significant issues that impact both SEO and conversion. {specific_issue}. For e-commerce, page layout is a direct revenue factor; shoppers who can't quickly find price, availability, and the purchase button leave within seconds.

---

### #46 — Overall E-Commerce Conversion Funnel ◆
**Tool:** AI — cross-page analysis; manual spot-check of the buyer journey

**How to check:**  
Manual trace of a representative organic buyer journey: category page from Google → product page → add to cart → checkout. At each step, check: is there a logical next action? Are related products suggested? Is pricing clear? Are trust signals visible at every stage? Does the funnel retain the shopper or create abandonment points?

**E-commerce context:** This is the capstone check. Technical SEO drives indexation, on-page SEO drives rankings, keyword strategy drives the right traffic; but the conversion funnel determines whether any of that investment generates revenue. A broken funnel makes every other SEO improvement worthless.

**Scoring logic:**

| Condition | Score | Rating |
|---|---|---|
| Coherent funnel; each step leads naturally to purchase | 8-10 | 🟢 |
| Partially coherent; some friction points or dead ends | 5-7 | 🟡 |
| Disconnected; major friction points or abandoned paths | 1-4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The buyer journey from organic landing through to checkout is coherent. Category pages lead to products, product pages encourage "Add to Cart," and the checkout process is clean. Related products are suggested at appropriate points. The funnel supports conversion at every stage.

> 🟡 **Needs attention:** The funnel is partially coherent but breaks down at {specific_stage}; e.g. product pages don't suggest related products, the "Add to Cart" flow has unnecessary steps, or there is no path from blog content to relevant product pages. Closing these gaps improves the conversion rate of existing organic traffic without requiring any additional rankings.

> 🔴 **Critical:** The conversion funnel has significant disconnects. {specific_issues}. Organic visitors landing on the store have no clear path to purchase. Without a coherent funnel, even strong rankings will produce disappointing revenue. Funnel architecture should be addressed alongside technical and on-page improvements.

---

## Section 8 — AI Search & Answer Engine Optimisation (GEO / AEO)

> Shopping is moving into generated answers fast. Buyers ask ChatGPT and Perplexity *"best {product} for {need}"* or *"{product A} vs {product B}"*, and Google increasingly answers product and category queries with AI Overviews before any listing loads. **GEO** (Generative Engine Optimisation) is about getting the store's products *recommended and cited* inside those answers; **AEO** (Answer Engine Optimisation) is about making product and buying-guide content machine-extractable. All checks are **manual** — the auditor runs the queries and records the result. Much of this rests on structured product data and third-party reviews, which the earlier sections already cover; this section assesses them specifically through the lens of AI visibility.
>
> **Tier note:** ★ = Basic + Full · ◆ = Full only

---

### #47 — Google AI Overview & Shopping AI Presence ★
**Tool:** Google Search (logged-out / incognito) — `https://google.com`

**How to check:**
1. Search 4–6 high-intent commercial queries: top category terms, *"best {product} for {use case}"*, and flagship product names
2. Note whether an **AI Overview** (and any AI-generated shopping/product summary) appears, and whether the store's products or domain are cited
3. Check whether competitors' products are being surfaced where the client's are not
4. Record the queries where AI answers appear but the store is absent — these are the priority targets

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Store's products/domain cited in AI Overviews for key queries | 8–10 | 🟢 |
| AI answers appear but cite competitors / marketplaces, not the store | 4–7 | 🟡 |
| Consistently absent from AI answers on commercial queries | 1–4 | 🔴 |
| No AI Overviews triggered for these queries yet | — | ℹ️ N/A |

**Standard messages:**

> 🟢 **Good:** The store's products are being cited in Google's AI Overviews for key commercial queries — surfacing the catalogue at the very top of the page. Maintain the structured-data and content patterns earning these citations.

> 🟡 **Needs attention:** AI answers appear for the store's target queries but tend to cite competitors or marketplaces (Amazon, etc.) rather than the store itself. Strengthening product structured data (#49), review signals (#50) and buying-guide content (#51) improves the odds of the store being the cited source rather than the marketplace it sells through.

> 🔴 **Critical:** For the commercial queries where Google now shows AI answers, the store is consistently absent while competitors appear. This removes visibility at the top of the highest-intent queries. Closing the product-data and content gaps in this section is the route back in.

> ℹ️ **N/A:** Google is not yet triggering AI Overviews for these queries. Re-check each audit cycle — shopping coverage is expanding.

---

### #48 — Answer Engine Product Recommendation Presence ★
**Tool:** ChatGPT (search mode), Perplexity, Google Gemini — direct queries

**How to check:**
1. Ask each assistant category and use-case shopping questions: *"best {product} for {need/budget}"*, *"recommend a {product} under {price}"*, *"where can I buy {product type}"*
2. Note whether the store's products or brand are recommended, and whether a competitor or marketplace is recommended instead
3. Ask a direct comparison for a flagship product vs a known competitor product — check whether the engine has accurate specs/price to work with
4. Record the sources cited (review sites, roundups, marketplaces) — these determine who gets recommended

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Store's products recommended for category queries across ≥2 engines | 8–10 | 🟢 |
| Appears occasionally or only when named directly | 5–7 | 🟡 |
| Never surfaces; only competitors/marketplaces recommended | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store's products are surfacing in answer-engine shopping recommendations for category and use-case queries. As buyers increasingly shop via these tools, this is valuable, hard-to-replicate visibility.

> 🟡 **Needs attention:** The store's products appear only occasionally, or when named directly, while competitors and marketplaces dominate open recommendations. Because engines lean on {cited_sources}, improving third-party review presence and publishing extractable buying-guide content are the highest-leverage moves.

> 🔴 **Critical:** The store never surfaces when buyers ask answer engines for product recommendations — only competitors and marketplaces do. This is a growing gap as AI shopping matures. A deliberate GEO push (structured product data, review signals, comparison/buying-guide content) is recommended.

---

### #49 — Product Structured Data for AI ◆
**Tool:** Google Rich Results Test — `https://search.google.com/test/rich-results?url={url}` + Schema Markup Validator

**How to check:**
1. This extends #8 (product schema) into the GEO dimension — clean, complete product data is what feeds AI shopping answers
2. Run 3–4 product pages through the validator and confirm valid `Product` markup with `offers` (price, currency, availability), `aggregateRating`, `review`, `brand`, `gtin`/`sku`, and `image`
3. Confirm `Organization` markup with `sameAs` links, and `BreadcrumbList` on category pages
4. Flag products where price, availability or ratings are present visually but absent from the structured data (the machine-readable gap)

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Complete, valid product schema incl. price, availability, ratings | 8–10 | 🟢 |
| Product schema present but missing offers/ratings/identifiers | 5–7 | 🟡 |
| No product schema, or broken/incomplete markup | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Product structured data is complete and valid — price, availability, ratings and identifiers are all machine-readable. This is precisely the data AI shopping answers draw on, and it's in good shape across the sampled products.

> 🟡 **Needs attention:** Product schema is present but incomplete — {specific_issue}, e.g. `aggregateRating` or `offers`/availability is missing, or products lack `gtin`/`sku` identifiers. Engines and shopping surfaces prefer complete data; filling these gaps improves both rich-result eligibility and AI product visibility.

> 🔴 **Critical:** Product pages lack complete structured data — {specific_issue}, e.g. no valid `Product`/`offers` markup, so price, availability and ratings aren't machine-readable. AI shopping answers and Google's shopping surfaces rely on this data; without it the catalogue is largely invisible to them. Implementing complete product schema is a priority.

---

### #50 — Review & Rating Signal Strength for AI Synthesis ◆
**Tool:** On-page reviews + Google Shopping + third-party review platforms

**How to check:**
1. This extends #28 (UGC/reviews on pages) into the GEO dimension — engines synthesise sentiment from reviews when recommending products
2. Assess on-page review **volume, recency and rating** for flagship products vs competitors
3. Check whether ratings appear in Google Shopping / product results (a proxy for machine-readable, syndicated review data)
4. Check third-party presence (Trustpilot, Google reviews, marketplace reviews) — the off-site signals engines also draw on
5. Note products with strong sales but thin/no reviews — these are the easiest wins

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Strong, recent review volume on-page and in third-party sources | 8–10 | 🟢 |
| Reviews present but thin or dated vs competitors | 5–7 | 🟡 |
| Little/no review signal on key products | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** Key products carry strong, recent review signals both on-page and across third-party sources. This is exactly the sentiment data engines synthesise when recommending products, and it's working in the store's favour.

> 🟡 **Needs attention:** Review signals are present but thin or dated relative to competitors — {specific_issue}, e.g. flagship products with few recent reviews, or no ratings surfacing in shopping results. Because engines weight review volume and recency, a structured review-generation effort on key products is a high-leverage action.

> 🔴 **Critical:** Key products carry little or no review signal on-page or off-site. This is a primary reason products aren't surfacing in AI recommendations (#48) — the engines have minimal sentiment data to draw on. Building review volume on flagship products, and ensuring ratings are machine-readable, is foundational.

---

### #51 — Buying-Guide & Comparison Content ◆
**Tool:** Manual review of content/blog + site search

**How to check:**
1. Check whether the store publishes the content types engines extract for shopping answers: *"best {product} for {use case}"* guides, *"{product A} vs {product B}"* comparisons, buying guides, and gift/occasion guides
2. Assess whether existing guides answer the question **directly and early**, with extractable structure (comparison tables, clear recommendations, concise pros/cons)
3. Check whether product-selection help exists on category pages (not just a bare product grid)
4. Note the gap between the store's guide content and what competitors publish (cross-reference #38)

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| Store publishes extractable buying-guide/comparison content | 8–10 | 🟢 |
| Some guide content but thin, buried, or not extractable | 5–7 | 🟡 |
| No buying-guide or comparison content | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** The store publishes the buying-guide and comparison content that answer engines pull shopping answers from, structured for clean extraction. This gives the store a citable footprint beyond bare product pages — a real GEO advantage.

> 🟡 **Needs attention:** Some guide content exists but it's thin, buried, or not structured for extraction — {specific_issue}, e.g. a buying guide with no clear recommendation or comparison table. Restructuring existing guides to answer the question directly, and filling obvious gaps (*"best X for Y"*, *"X vs Y"*), would improve AI shopping visibility.

> 🔴 **Critical:** The store has no buying-guide or comparison content — only product and category pages. This is the content engines most readily extract into shopping answers, and competitors publishing it are capturing that visibility. A buying-guide content plan is a high-priority GEO recommendation.

---

### #52 — AI Crawler Access & Feed Health ★
**Tool:** Direct fetch — `{domain}/robots.txt`, `{domain}/llms.txt` + Google Merchant Center reference

**How to check:**
1. Check `robots.txt` directives for AI crawler user-agents: `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`
2. Determine whether any block is intentional or an accidental blanket rule silently removing products from AI answers
3. **E-commerce-specific:** confirm the product **feed** (Google Merchant Center / structured feed) is present and healthy — clean feed data increasingly underpins AI shopping surfaces as well as Shopping ads
4. Check for an `llms.txt` file pointing engines to key category and guide pages

**How to score:**

| Condition | Score | Rating |
|---|---|---|
| AI crawlers permitted (or blocked by intent); product feed healthy | 8–10 | 🟢 |
| Mixed/unclear directives, or feed issues/gaps | 5–7 | 🟡 |
| AI crawlers accidentally blocked, or feed missing/broken | 1–4 | 🔴 |

**Standard messages:**

> 🟢 **Good:** AI crawler access is aligned with the store's goals and the product feed is healthy — so the data and pages engines and shopping surfaces rely on are available to them. {llms_txt_note}

> 🟡 **Needs attention:** {specific_issue} — e.g. AI crawler directives haven't been considered, or the Merchant Center feed has disapprovals/gaps. Resolving feed issues matters specifically here: clean feed data increasingly feeds AI shopping surfaces, not just paid Shopping. An `llms.txt` file pointing to key category and guide pages would also help.

> 🔴 **Critical:** The store is undercutting its own AI shopping visibility — {specific_issue}, e.g. AI crawlers are accidentally blocked in `robots.txt`, or the product feed is missing/broken. Engines and shopping surfaces can't recommend products they can't access clean data for. Correcting crawler access and feed health are fast, high-leverage fixes.

---

---

## Audit Summary — E-Commerce Points by Section & Tier

| Section | # Points | Basic ★ | Full ◆ |
|---|---|---|---|
| 1 — Technical SEO (E-Commerce Adapted) | 12 | 10 | 12 |
| 2 — On-Page SEO (Product & Category) | 8 | 6 | 8 |
| 3 — Product & Catalogue SEO | 8 | 5 | 8 |
| 4 — E-Commerce Keyword Strategy | 6 | 4 | 6 |
| 5 — Competitor & SERP Analysis | 4 | 2 | 4 |
| 6 — Backlink Profile | 3 | 0 | 3 |
| 7 — UX & Conversion (E-Commerce) | 5 | 4 | 5 |
| 8 — AI Search & Answer Engine Optimisation (GEO/AEO) | 6 | 3 | 6 |
| **Total** | **52** | **34** | **52** |

---

## Key Differences vs Generic Audit (v3)

| Generic Audit (v3) | E-Commerce Audit (v1) |
|---|---|
| Local SEO section (7 checks) | **Replaced** with Product & Catalogue SEO (8 checks) |
| Google Business Profile | **Removed**; not applicable |
| Local citation & NAP consistency | **Replaced** with Product Schema, category architecture |
| Standard keyword overview | **Replaced** with e-commerce keyword strategy (product + category + long-tail) |
| Generic UX checks | **Replaced** with cart/checkout SEO, trust signals, e-commerce funnel |
| No pagination/infinite scroll check | **Added**; critical for product discovery |
| No tag/filter page management | **Added**; major index bloat risk on all platforms |
| No product description depth check | **Added**; thin product content is the #2 e-commerce SEO issue |
| No variant handling check | **Added**; duplicate content from product variants |
| No out-of-stock strategy check | **Added**; product lifecycle management for SEO |
| No faceted navigation check | **Added** (Full tier); largest crawl budget risk |
| No Shopping carousel / Merchant Center check | **Added** (Full tier); critical SERP feature for e-commerce |
| Generic GEO/AEO layer | **Specialised** — AI shopping presence, product-data-for-AI, review synthesis, buying-guide content, feed health |

---

*Document version: v1.0 — March 2026*  
*Prepared by: Szymon Kokot / Illucrum*
