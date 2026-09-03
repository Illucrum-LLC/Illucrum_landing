const CONFIG = {
  relayEndpoint: "https://relay.illucrum.com/",
  maxUrls: 25,
  politeDelayMs: 1000,
  topWords: 20,
  maxRenderedRows: 500,
};

const STOP_WORDS = new Set(["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be",
    "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "cannot", "could",
    "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for",
    "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "her", "here", "hers",
    "herself", "him", "himself", "his", "how", "i", "i'm", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself",
    "just", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
    "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "should", "" +
    "shouldn't", "so", "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then",
    "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
    "wasn't", "we", "were", "weren't", "what", "when", "where", "which", "while", "who", "whom", "why", "with",
    "won't", "would", "wouldn't", "you", "your", "yours", "yourself", "yourselves"]);

function collapseWhitespace(value)
{
  if (value === null || value === undefined)
    return null;

  const text = String(value).replace(/\s+/g, " ").trim();
  return text;
}

function lengthOf(value)
{
  return value === null || value === undefined ? null : value.length;
}

function toAbsoluteUrl(href, baseUrl)
{
  if (!href)
    return null;
  
  const trimmed = href.trim();

  if (!trimmed || trimmed.startsWith("#"))
    return null;

  if (/^(mailto:|tel:|javascript:|data:)/i.test(trimmed))
    return trimmed;

  try
  {
    return new URL(trimmed, baseUrl).toString();
  }
  catch
  {
    return null;
  }
}

function isSameHost(urlA, urlB)
{
  try
  {
    const strip = (host) => host.replace(/^www\./i, "").toLowerCase();
    return strip(new URL(urlA).hostname) === strip(new URL(urlB).hostname);
  }
  catch
  {
    return false;
  }
}

function truncate(value, max)
{
  const text = value === null || value === undefined ? "" : String(value);
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

function sleep()
{
  return new Promise((resolve) => setTimeout(resolve, CONFIG.politeDelayMs));
}

function parseUrlInput(rawInput)
{
  const candidates = String(rawInput || "").split(/[\s,]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const urls = [];
  const rejected = [];
  const seen = new Set();

  for (const candidate of candidates)
    {
    const withScheme = /^https?:\/\//i.test(candidate) ?
      candidate :
      "https://" + candidate;

    let parsed;
    try
    {
      parsed = new URL(withScheme);
    }
    catch
    {
      rejected.push({
        input: candidate,
        reason: "Not a valid URL"
      });
      continue;
    }

    if (!parsed.hostname.includes("."))
      {
      rejected.push({
        input: candidate,
        reason: "No domain in the address"
      });
      continue;
    }

    parsed.hash = "";
    const normalised = parsed.toString();

    if (seen.has(normalised)) continue;
    seen.add(normalised);
    urls.push(normalised);
  }

  const overflow = Math.max(0, urls.length - CONFIG.maxUrls);
  return {
    urls: urls.slice(0, CONFIG.maxUrls),
    rejected,
    overflow
  };
}

async function fetchThroughRelay(url, relayEndpoint)
{
  const startedAt = Date.now();
  const relayUrl = relayEndpoint + "?url=" + encodeURIComponent(url);

  let response;
  try
  {
    response = await fetch(relayUrl, {
      method: "GET",
      cache: "no-store"
    });
  }
  catch (error)
  {
    return {
      ok: false,
      url,
      finalUrl: null,
      status: null,
      contentType: null,
      body: null,
      elapsedMs: Date.now() - startedAt,
      errorType: "relay_unreachable",
      errorMessage: "The fetch relay did not respond. Check the relay address, or try again.",
    };
  }

  const relayError = response.headers.get("X-Crawl-Error");
  const originStatusHeader = response.headers.get("X-Crawl-Status");
  const originStatus = originStatusHeader ? Number(originStatusHeader) : null;
  const finalUrl = response.headers.get("X-Crawl-Final-Url") || url;
  const contentType = response.headers.get("X-Crawl-Content-Type") || null;
  const elapsedMs =
    Number(response.headers.get("X-Crawl-Elapsed-Ms")) ||
    Date.now() - startedAt;

  if (relayError)
  {
    return {
      ok: false,
      url,
      finalUrl,
      status: originStatus,
      contentType,
      body: null,
      elapsedMs,
      errorType: relayError,
      errorMessage: response.headers.get("X-Crawl-Error-Message") || "Fetch failed.",
    };
  }

  const body = await response.text();

  if (originStatus && originStatus >= 400)
  {
    return {
      ok: false,
      url,
      finalUrl,
      status: originStatus,
      contentType,
      body,
      elapsedMs,
      errorType: "http_error",
      errorMessage: `The server returned ${originStatus}.`,
    };
  }

  return {
    ok: true,
    url,
    finalUrl,
    status: originStatus,
    contentType,
    body,
    elapsedMs,
    truncated: response.headers.get("X-Crawl-Truncated") === "true",
    errorType: null,
    errorMessage: null,
  };
}

function parseHtml(html)
{
  return new DOMParser().parseFromString(html, "text/html");
}

function extractMeta(doc, baseUrl)
{
  const titles = Array.from(doc.querySelectorAll("title"));
  const descriptions = Array.from(
    doc.querySelectorAll('meta[name="description" i]'),
  );

  const canonicalRaw = doc.querySelector('link[rel="canonical" i]');
  const canonical = canonicalRaw ?
    toAbsoluteUrl(canonicalRaw.getAttribute("href"), baseUrl) :
    null;

  const robots = doc.querySelector('meta[name="robots" i]');
  const viewport = doc.querySelector('meta[name="viewport" i]');
  const charsetTag =
    doc.querySelector("meta[charset]") ||
    doc.querySelector('meta[http-equiv="content-type" i]');

  const description =
    descriptions.length > 0 ?
    collapseWhitespace(descriptions[0].getAttribute("content") || "") :
    null;
  const title =
    titles.length > 0 ? collapseWhitespace(titles[0].textContent) : null;

  return {
    lang: doc.documentElement.getAttribute("lang") || null,
    title,
    titleLength: lengthOf(title),
    titleCount: titles.length,
    description,
    descriptionLength: lengthOf(description),
    descriptionCount: descriptions.length,
    canonical,
    canonicalIsSelf: canonical === null ?
      null : normaliseForCompare(canonical) === normaliseForCompare(baseUrl),
    metaRobots: robots ?
      collapseWhitespace(robots.getAttribute("content")) : null,
    viewport: viewport ?
      collapseWhitespace(viewport.getAttribute("content")) : null,
    charset: charsetTag ?
      charsetTag.getAttribute("charset") ||
      collapseWhitespace(charsetTag.getAttribute("content")) : null,
  };
}

function normaliseForCompare(url) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/+$/, "");
    return (
      parsed.hostname.replace(/^www\./i, "").toLowerCase() +
      path +
      parsed.search
    );
  } catch {
    return url;
  }
}

function extractSocialTags(doc) {
  const openGraph = {};
  const twitter = {};

  for (const tag of doc.querySelectorAll("meta[property], meta[name]")) {
    const key = (
      tag.getAttribute("property") ||
      tag.getAttribute("name") ||
      ""
    ).toLowerCase();
    const value = collapseWhitespace(tag.getAttribute("content") || "");

    if (key.startsWith("og:")) openGraph[key] = value;
    else if (key.startsWith("twitter:")) twitter[key] = value;
  }

  return {
    openGraph,
    twitter
  };
}

function extractHeadings(doc) {
  const headings = [];
  let order = 0;

  for (const element of doc.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
    order += 1;
    const text = collapseWhitespace(element.textContent) || "";
    headings.push({
      level: Number(element.tagName.substring(1)),
      order,
      text,
      charLength: text.length,
    });
  }

  return headings;
}

function extractText(doc) {
  const source = doc.querySelector("main") || doc.body;
  if (!source) return "";

  const working = source.cloneNode(true);
  const noise =
    "script, style, noscript, template, svg, iframe, nav, footer, header";
  for (const element of working.querySelectorAll(noise)) {
    element.remove();
  }

  return collapseWhitespace(working.textContent) || "";
}

/** Unicode-aware word splitting. Keeps apostrophes and hyphens inside words. */
function tokenise(text) {
  const matches = String(text)
    .toLowerCase()
    .match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu);
  return matches || [];
}

function wordFrequencies(tokens, limit) {
  const counts = new Map();

  for (const token of tokens) {
    if (STOP_WORDS.has(token)) continue;
    if (token.length < 2) continue;
    counts.set(token, (counts.get(token) || 0) + 1);
  }

  const total = tokens.length || 1;

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word, count], index) => ({
      rank: index + 1,
      word,
      count,
      sharePct: Math.round((count / total) * 10000) / 100,
    }));
}

function extractSchemas(doc) {
  const blocks = [];

  const scripts = doc.querySelectorAll('script[type="application/ld+json" i]');
  scripts.forEach((script, index) => {
    const raw = (script.textContent || "").trim();
    if (!raw) return;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      blocks.push({
        source: "json-ld",
        blockIndex: index,
        type: null,
        rawJson: raw,
        parseError: true,
      });
      return;
    }

    const nodes = [];
    const collect = (node) => {
      if (Array.isArray(node)) node.forEach(collect);
      else if (node && typeof node === "object") {
        if (Array.isArray(node["@graph"])) node["@graph"].forEach(collect);
        if (node["@type"] || Object.keys(node).length) nodes.push(node);
      }
    };
    collect(parsed);

    for (const node of nodes) {
      const type = node["@type"];
      blocks.push({
        source: "json-ld",
        blockIndex: index,
        type: Array.isArray(type) ? type.join("|") : type || null,
        rawJson: JSON.stringify(node),
        parseError: false,
      });
    }
  });

  const microdata = doc.querySelectorAll("[itemscope][itemtype]");
  microdata.forEach((element, index) => {
    const properties = {};
    for (const property of element.querySelectorAll("[itemprop]")) {
      const name = property.getAttribute("itemprop");
      properties[name] =
        property.getAttribute("content") ||
        collapseWhitespace(property.textContent) ||
        "";
    }
    blocks.push({
      source: "microdata",
      blockIndex: index,
      type: (element.getAttribute("itemtype") || "").split("/").pop() || null,
      rawJson: JSON.stringify(properties),
      parseError: false,
    });
  });

  const rdfa = doc.querySelectorAll("[typeof]");
  rdfa.forEach((element, index) => {
    blocks.push({
      source: "rdfa",
      blockIndex: index,
      type: element.getAttribute("typeof"),
      rawJson: "",
      parseError: false,
    });
  });

  return blocks;
}

function extractLinks(doc, baseUrl) {
  const links = [];

  for (const anchor of doc.querySelectorAll("a[href]")) {
    const href = toAbsoluteUrl(anchor.getAttribute("href"), baseUrl);
    if (!href) continue;

    const rel = collapseWhitespace(anchor.getAttribute("rel")) || "";
    const isWeb = /^https?:/i.test(href);

    links.push({
      href,
      type: !isWeb ?
        "other" : isSameHost(href, baseUrl) ?
        "internal" : "external",
      anchorText: collapseWhitespace(anchor.textContent) || "",
      rel,
      nofollow: /\bnofollow\b/i.test(rel),
      target: anchor.getAttribute("target") || "",
    });
  }

  return links;
}

function extractImages(doc, baseUrl) {
  const images = [];

  for (const image of doc.querySelectorAll("img")) {
    const alt = image.getAttribute("alt");
    images.push({
      src: toAbsoluteUrl(
        image.getAttribute("src") || image.getAttribute("data-src"),
        baseUrl,
      ),
      alt: alt === null ? null : collapseWhitespace(alt),
      hasAltAttribute: alt !== null,
      isDecorative: alt === "",
      loading: image.getAttribute("loading") || "",
      width: image.getAttribute("width") || "",
      height: image.getAttribute("height") || "",
    });
  }

  return images;
}

function buildRecord(fetchResult) {
  const requestedUrl = fetchResult.url;

  if (!fetchResult.ok || !fetchResult.body) {
    return {
      page: {
        url: requestedUrl,
        final_url: fetchResult.finalUrl || "",
        http_status: fetchResult.status,
        outcome: fetchResult.errorType === "http_error" ?
          "HTTP_ERROR" : "FETCH_FAILED",
        fetch_ms: fetchResult.elapsedMs,
        error_type: fetchResult.errorType,
        error_message: fetchResult.errorMessage,
      },
      headings: [],
      words: [],
      schemas: [],
      links: [],
      images: [],
      errors: [{
        url: requestedUrl,
        stage: "fetch",
        error_type: fetchResult.errorType,
        message: fetchResult.errorMessage,
        http_status: fetchResult.status,
      }, ],
    };
  }

  const baseUrl = fetchResult.finalUrl || requestedUrl;
  const doc = parseHtml(fetchResult.body);

  const meta = extractMeta(doc, baseUrl);
  const social = extractSocialTags(doc);
  const headings = extractHeadings(doc);
  const text = extractText(doc);
  const tokens = tokenise(text);
  const words = wordFrequencies(tokens, CONFIG.topWords);
  const schemas = extractSchemas(doc);
  const links = extractLinks(doc, baseUrl);
  const images = extractImages(doc, baseUrl);

  const h1s = headings.filter((heading) => heading.level === 1);
  const h2s = headings.filter((heading) => heading.level === 2);
  const internalLinks = links.filter((link) => link.type === "internal");
  const externalLinks = links.filter((link) => link.type === "external");
  const schemaTypes = Array.from(
    new Set(schemas.map((block) => block.type).filter(Boolean)),
  );

  const page = {
    url: requestedUrl,
    final_url: baseUrl,
    http_status: fetchResult.status,
    outcome: "OK",
    fetch_ms: fetchResult.elapsedMs,
    content_type: fetchResult.contentType || "",
    lang: meta.lang,
    canonical: meta.canonical,
    canonical_is_self: meta.canonicalIsSelf === null ? null : String(meta.canonicalIsSelf),
    meta_robots: meta.metaRobots,
    viewport: meta.viewport,
    charset: meta.charset,

    title: meta.title,
    title_length: meta.titleLength,
    title_count: meta.titleCount,
    meta_description: meta.description,
    meta_description_length: meta.descriptionLength,
    meta_description_count: meta.descriptionCount,

    h1: h1s.length ? h1s[0].text : null,
    h1_count: h1s.length,
    h2_count: h2s.length,
    h2_first: h2s.length ? h2s[0].text : null,
    heading_count: headings.length,

    word_count: tokens.length,
    unique_word_count: new Set(tokens).size,
    text_char_count: text.length,

    internal_links: internalLinks.length,
    external_links: externalLinks.length,
    nofollow_links: links.filter((link) => link.nofollow).length,

    images: images.length,
    images_missing_alt: images.filter((image) => !image.hasAltAttribute).length,
    images_empty_alt: images.filter((image) => image.isDecorative).length,

    og_title: social.openGraph["og:title"] ?? null,
    og_description: social.openGraph["og:description"] ?? null,
    og_type: social.openGraph["og:type"] ?? null,
    og_url: social.openGraph["og:url"] ?? null,
    og_image: social.openGraph["og:image"] ?? null,
    og_site_name: social.openGraph["og:site_name"] ?? null,
    og_locale: social.openGraph["og:locale"] ?? null,
    og_tag_count: Object.keys(social.openGraph).length,

    twitter_card: social.twitter["twitter:card"] ?? null,
    twitter_title: social.twitter["twitter:title"] ?? null,
    twitter_description: social.twitter["twitter:description"] ?? null,
    twitter_image: social.twitter["twitter:image"] ?? null,
    twitter_site: social.twitter["twitter:site"] ?? null,
    twitter_creator: social.twitter["twitter:creator"] ?? null,
    twitter_tag_count: Object.keys(social.twitter).length,

    schema_count: schemas.length,
    schema_types: schemaTypes.join(" | "),

    error_type: null,
    error_message: null,
  };

  const errors = schemas
    .filter((block) => block.parseError)
    .map(() => ({
      url: requestedUrl,
      stage: "parse",
      error_type: "invalid_json_ld",
      message: "A JSON-LD block is present but could not be parsed.",
      http_status: fetchResult.status,
    }));

  if (fetchResult.truncated) {
    errors.push({
      url: requestedUrl,
      stage: "fetch",
      error_type: "truncated",
      message: "The page exceeded the size limit and was cut short. Counts are low.",
      http_status: fetchResult.status,
    });
  }

  return {
    page,
    headings: headings.map((heading) => ({
      url: requestedUrl,
      ...heading
    })),
    words: words.map((word) => ({
      url: requestedUrl,
      ...word
    })),
    schemas: schemas.map((block) => ({
      url: requestedUrl,
      ...block
    })),
    links: links.map((link) => ({
      url: requestedUrl,
      ...link
    })),
    images: images.map((image) => ({
      url: requestedUrl,
      ...image
    })),
    errors,
  };
}

const TABLES = [{
    key: "pages",
    label: "Pages",
    file: "pages",
    blurb: "One row per URL. The CSV carries every column, including all Open Graph and Twitter tags.",
    columns: [{
        key: "url",
        label: "URL",
        width: 260
      },
      {
        key: "http_status",
        label: "Status",
        numeric: true
      },
      {
        key: "outcome",
        label: "Outcome"
      },
      {
        key: "title",
        label: "Title",
        width: 260
      },
      {
        key: "title_length",
        label: "Title len",
        numeric: true
      },
      {
        key: "meta_description_length",
        label: "Desc len",
        numeric: true
      },
      {
        key: "h1_count",
        label: "H1",
        numeric: true
      },
      {
        key: "h2_count",
        label: "H2",
        numeric: true
      },
      {
        key: "word_count",
        label: "Words",
        numeric: true
      },
      {
        key: "internal_links",
        label: "Int links",
        numeric: true
      },
      {
        key: "external_links",
        label: "Ext links",
        numeric: true
      },
      {
        key: "images_missing_alt",
        label: "No alt",
        numeric: true
      },
      {
        key: "schema_count",
        label: "Schemas",
        numeric: true
      },
      {
        key: "canonical_is_self",
        label: "Canon = self"
      },

      {
        key: "final_url",
        label: "Final URL",
        screen: false
      },
      {
        key: "fetch_ms",
        label: "Fetch ms",
        screen: false
      },
      {
        key: "content_type",
        label: "Content type",
        screen: false
      },
      {
        key: "lang",
        label: "Lang",
        screen: false
      },
      {
        key: "canonical",
        label: "Canonical",
        screen: false
      },
      {
        key: "meta_robots",
        label: "Meta robots",
        screen: false
      },
      {
        key: "viewport",
        label: "Viewport",
        screen: false
      },
      {
        key: "charset",
        label: "Charset",
        screen: false
      },
      {
        key: "title_count",
        label: "Title count",
        screen: false
      },
      {
        key: "meta_description",
        label: "Meta description",
        screen: false
      },
      {
        key: "meta_description_count",
        label: "Desc count",
        screen: false
      },
      {
        key: "h1",
        label: "H1",
        screen: false
      },
      {
        key: "h2_first",
        label: "First H2",
        screen: false
      },
      {
        key: "heading_count",
        label: "Heading count",
        screen: false
      },
      {
        key: "unique_word_count",
        label: "Unique words",
        screen: false
      },
      {
        key: "text_char_count",
        label: "Text chars",
        screen: false
      },
      {
        key: "nofollow_links",
        label: "Nofollow links",
        screen: false
      },
      {
        key: "images",
        label: "Images",
        screen: false
      },
      {
        key: "images_empty_alt",
        label: "Decorative images",
        screen: false
      },
      {
        key: "og_title",
        label: "og:title",
        screen: false
      },
      {
        key: "og_description",
        label: "og:description",
        screen: false
      },
      {
        key: "og_type",
        label: "og:type",
        screen: false
      },
      {
        key: "og_url",
        label: "og:url",
        screen: false
      },
      {
        key: "og_image",
        label: "og:image",
        screen: false
      },
      {
        key: "og_site_name",
        label: "og:site_name",
        screen: false
      },
      {
        key: "og_locale",
        label: "og:locale",
        screen: false
      },
      {
        key: "og_tag_count",
        label: "og tag count",
        screen: false
      },
      {
        key: "twitter_card",
        label: "twitter:card",
        screen: false
      },
      {
        key: "twitter_title",
        label: "twitter:title",
        screen: false
      },
      {
        key: "twitter_description",
        label: "twitter:description",
        screen: false,
      },
      {
        key: "twitter_image",
        label: "twitter:image",
        screen: false
      },
      {
        key: "twitter_site",
        label: "twitter:site",
        screen: false
      },
      {
        key: "twitter_creator",
        label: "twitter:creator",
        screen: false
      },
      {
        key: "twitter_tag_count",
        label: "twitter tag count",
        screen: false
      },
      {
        key: "schema_types",
        label: "Schema types",
        screen: false
      },
      {
        key: "error_type",
        label: "Error type",
        screen: false
      },
      {
        key: "error_message",
        label: "Error message",
        screen: false
      },
    ],
  },
  {
    key: "headings",
    label: "Headings",
    file: "headings",
    blurb: "Every h1–h6 in document order. Level and order together show the outline a crawler sees.",
    columns: [{
        key: "url",
        label: "URL",
        width: 260
      },
      {
        key: "level",
        label: "Level",
        numeric: true
      },
      {
        key: "order",
        label: "Order",
        numeric: true
      },
      {
        key: "text",
        label: "Text",
        width: 420
      },
      {
        key: "charLength",
        label: "Chars",
        numeric: true
      },
    ],
  },
  {
    key: "words",
    label: "Words",
    file: "words",
    blurb: `Top ${CONFIG.topWords} words per page after common stop words are removed. Share is against total words on the page.`,
    columns: [{
        key: "url",
        label: "URL",
        width: 260
      },
      {
        key: "rank",
        label: "Rank",
        numeric: true
      },
      {
        key: "word",
        label: "Word"
      },
      {
        key: "count",
        label: "Count",
        numeric: true
      },
      {
        key: "sharePct",
        label: "Share %",
        numeric: true
      },
    ],
  },
  {
    key: "links",
    label: "Links",
    file: "links",
    blurb: "Every anchor with an href, classified internal or external, with its anchor text.",
    columns: [{
        key: "url",
        label: "Found on",
        width: 240
      },
      {
        key: "type",
        label: "Type"
      },
      {
        key: "href",
        label: "Target",
        width: 320
      },
      {
        key: "anchorText",
        label: "Anchor text",
        width: 260
      },
      {
        key: "nofollow",
        label: "Nofollow"
      },
      {
        key: "rel",
        label: "rel",
        screen: false
      },
      {
        key: "target",
        label: "target",
        screen: false
      },
    ],
  },
  {
    key: "images",
    label: "Images",
    file: "images",
    blurb: "One row per <img>. A missing alt attribute and an empty one mean different things, so they are separate columns.",
    columns: [{
        key: "url",
        label: "Found on",
        width: 240
      },
      {
        key: "src",
        label: "Source",
        width: 320
      },
      {
        key: "alt",
        label: "Alt text",
        width: 260
      },
      {
        key: "hasAltAttribute",
        label: "Has alt"
      },
      {
        key: "isDecorative",
        label: "Empty alt"
      },
      {
        key: "loading",
        label: "loading"
      },
      {
        key: "width",
        label: "Width",
        screen: false
      },
      {
        key: "height",
        label: "Height",
        screen: false
      },
    ],
  },
  {
    key: "schemas",
    label: "Schema",
    file: "schemas",
    blurb: "Structured data blocks: JSON-LD, microdata and RDFa types. A block that fails to parse is reported, not hidden.",
    columns: [{
        key: "url",
        label: "URL",
        width: 240
      },
      {
        key: "source",
        label: "Source"
      },
      {
        key: "blockIndex",
        label: "Block",
        numeric: true
      },
      {
        key: "type",
        label: "@type",
        width: 200
      },
      {
        key: "parseError",
        label: "Parse error"
      },
      {
        key: "rawJson",
        label: "Raw",
        screen: false
      },
    ],
  },
  {
    key: "errors",
    label: "Errors",
    file: "errors",
    blurb: "Anything that went wrong. An empty table here is the result you want.",
    columns: [{
        key: "url",
        label: "URL",
        width: 260
      },
      {
        key: "stage",
        label: "Stage"
      },
      {
        key: "error_type",
        label: "Type"
      },
      {
        key: "message",
        label: "Message",
        width: 420
      },
      {
        key: "http_status",
        label: "Status",
        numeric: true
      },
    ],
  },
];

/** Columns shown on screen. */
function screenColumns(table) {
  return table.columns.filter((column) => column.screen !== false);
}

const results = {
  pages: [],
  headings: [],
  words: [],
  links: [],
  images: [],
  schemas: [],
  errors: [],
};

function clearResults() {
  for (const key of Object.keys(results)) results[key] = [];
}

function addRecord(record) {
  results.pages.push(record.page);
  results.headings.push(...record.headings);
  results.words.push(...record.words);
  results.links.push(...record.links);
  results.images.push(...record.images);
  results.schemas.push(...record.schemas);
  results.errors.push(...record.errors);
}

function displayValue(value, column) {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "boolean") return value ? "yes" : "no";
  return truncate(value, column.width ? Math.round(column.width / 6) : 40);
}

function renderTable(table) {
  const panel = document.getElementById("panel-" + table.key);
  if (!panel) return;

  const rows = results[table.key];
  const body = panel.querySelector(".tool-tablewrap");
  const count = panel.querySelector(".tool-count");
  const note = panel.querySelector(".tool-rownote");
  const button = panel.querySelector("button");

  count.textContent = rows.length === 1 ? "1 row" : rows.length + " rows";
  button.disabled = rows.length === 0;

  if (rows.length === 0) {
    body.innerHTML =
      '<p class="tool-empty">Nothing here yet. Enter one or more URLs above and run the scrap.</p>';
    note.textContent = "";
    return;
  }

  const columns = screenColumns(table);
  const visible = rows.slice(0, CONFIG.maxRenderedRows);

  const head = columns
    .map(
      (column) =>
      `<th${column.numeric ? ' class="num"' : ""}>${escapeHtml(column.label)}</th>`,
    )
    .join("");

  const lines = visible
    .map((row) => {
      const cells = columns
        .map((column) => {
          const value = displayValue(row[column.key], column);
          const title =
            row[column.key] === null || row[column.key] === undefined ?
            "" :
            ` title="${escapeHtml(String(row[column.key]))}"`;
          return `<td${column.numeric ? ' class="num"' : ""}${title}>${escapeHtml(value)}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  body.innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${lines}</tbody></table>`;

  const hiddenColumns = table.columns.length - columns.length;
  const parts = [];
  if (rows.length > visible.length) {
    parts.push(
      `Showing the first ${visible.length} of ${rows.length} rows on screen.`,
    );
  }
  if (hiddenColumns > 0) {
    parts.push(
      `${hiddenColumns} further column${hiddenColumns === 1 ? "" : "s"} are in the CSV only.`,
    );
  }
  note.textContent = parts.join(" ");
}

function renderAllTables() {
  for (const table of TABLES) renderTable(table);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text =
    typeof value === "boolean" ? (value ? "true" : "false") : String(value);
  return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

function buildCsv(table, rows) {
  const header = table.columns.map((column) => csvCell(column.key)).join(",");
  const lines = rows.map((row) =>
    table.columns.map((column) => csvCell(row[column.key])).join(","),
  );
  return [header, ...lines].join("\r\n") + "\r\n";
}

function downloadCsv(table) {
  const rows = results[table.key];
  if (rows.length === 0) return;

  const csv = "﻿" + buildCsv(table, rows);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `illucrum-${table.file}-${timestamp()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    "-" +
    pad(now.getHours()) +
    pad(now.getMinutes())
  );
}

const ui = {};
let isRunning = false;

function cacheElements() {
  ui.form = document.getElementById("crawl-form");
  ui.input = document.getElementById("urls");
  ui.run = document.getElementById("run");
  ui.status = document.getElementById("status");
  ui.tabs = document.getElementById("tabs");
}

function setStatus(message, kind = "info") {
  ui.status.textContent = message;
  ui.status.dataset.kind = kind;
}

function selectTab(key) {
  for (const table of TABLES) {
    const isActive = table.key === key;
    const tab = document.getElementById("tab-" + table.key);
    const panel = document.getElementById("panel-" + table.key);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    panel.hidden = !isActive;
  }
}

function initTabs() {
  const tabList = ui.tabs;

  tabList.addEventListener("click", (event) => {
    const button = event.target.closest("[role=tab]");
    if (button) selectTab(button.dataset.table);
  });

  tabList.addEventListener("keydown", (event) => {
    const keys = {
      ArrowLeft: -1,
      ArrowRight: 1
    };
    if (!(event.key in keys)) return;

    const current = TABLES.findIndex(
      (table) =>
      document
      .getElementById("tab-" + table.key)
      .getAttribute("aria-selected") === "true",
    );
    const next = (current + keys[event.key] + TABLES.length) % TABLES.length;
    selectTab(TABLES[next].key);
    document.getElementById("tab-" + TABLES[next].key).focus();
    event.preventDefault();
  });

  for (const table of TABLES) {
    const panel = document.getElementById("panel-" + table.key);
    panel
      .querySelector("button")
      .addEventListener("click", () => downloadCsv(table));
  }
}

async function runCrawl(event) {
  event.preventDefault();
  if (isRunning) return;

  const relayEndpoint = CONFIG.relayEndpoint;
  const {
    urls,
    rejected,
    overflow
  } = parseUrlInput(ui.input.value);

  if (urls.length === 0) {
    setStatus("No usable URLs found. Enter one or more addresses.", "error");
    return;
  }

  isRunning = true;
  ui.run.disabled = true;
  ui.run.textContent = "Scraping...";
  clearResults();
  renderAllTables();

  const notes = [];
  if (rejected.length) {
    notes.push(
      `${rejected.length} ${rejected.length === 1 ? "entry was" : "entries were"} skipped as invalid.`,
    );
  }
  if (overflow) notes.push(`Only the first ${CONFIG.maxUrls} URLs were used.`);

  let position = 0;
  for (const url of urls) {
    position += 1;
    setStatus(`Fetching ${position} of ${urls.length} — ${url}`, "busy");

    const fetchResult = await fetchThroughRelay(url, relayEndpoint);
    addRecord(buildRecord(fetchResult));
    renderAllTables();

    if (position < urls.length) await sleep();
  }

  const failures = results.pages.filter((page) => page.outcome !== "OK").length;
  const summary =
    `Done. ${urls.length} URL${urls.length === 1 ? "" : "s"} fetched` +
    (failures ? `, ${failures} failed` : "") +
    ".";

  setStatus([summary, ...notes].join(" "), failures ? "warn" : "ok");

  isRunning = false;
  ui.run.disabled = false;
  ui.run.textContent = "Run Scrap";
}

function init() {
  cacheElements();
  ui.form.addEventListener("submit", runCrawl);
  initTabs();
  selectTab(TABLES[0].key);
  renderAllTables();
  setStatus("Ready.", "info");
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}