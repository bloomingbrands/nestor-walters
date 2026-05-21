import "server-only";

/**
 * WordPress REST base (must include `/wp-json`). Server-only — never use `NEXT_PUBLIC_*`
 * or this URL can be inlined into the client bundle.
 *
 * Set `WORDPRESS_API_URL` in `.env.local` / hosting (see `.env.example`).
 * In development only, falls back to the staging host if unset.
 */
const WP_JSON_BASE =
  process.env.WORDPRESS_API_URL?.trim().replace(/\/$/, "") ||
  (process.env.NODE_ENV === "development"
    ? "https://swordcirclepen.blooming-brands.com/wp-json"
    : "");

function isWpConfigured(): boolean {
  return WP_JSON_BASE.length > 0;
}

export type WPEmbeddedMedia = {
  source_url?: string;
  alt_text?: string;
  media_details?: { width?: number; height?: number };
};

export type WPPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: WPEmbeddedMedia[];
  };
};

/** WordPress `book` CPT — extend ACF as fields appear in REST. */
export type WPBook = {
  id: number;
  date: string;
  date_gmt?: string;
  modified?: string;
  modified_gmt?: string;
  slug: string;
  link: string;
  status?: string;
  type?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  author?: number;
  featured_media?: number;
  template?: string;
  format?: string;
  meta?: Record<string, unknown>;
  categories?: number[];
  tags?: number[];
  class_list?: string[];
  acf?: {
    title?: string;
    description?: string;
    published_date?: string;
    author?: string;
    external_url?: string;
    /** USD price for checkout — add in WordPress ACF (number or string). */
    price_usd?: string | number;
    [key: string]: unknown;
  };
  _embedded?: {
    author?: { name: string; slug?: string }[];
    "wp:featuredmedia"?: WPEmbeddedMedia[];
  };
};

function buildUrl(path: string, params: Record<string, string>): string {
  const url = new URL(path.replace(/^\//, ""), `${WP_JSON_BASE}/`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return url.toString();
}

export function stripWpHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeBasicEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    );
}

export function wpPlainText(html: string): string {
  return decodeBasicEntities(stripWpHtml(html));
}

/** Parse ACF `price_usd` to cents (USD). Returns null if missing or invalid. */
export function getBookPriceUsdCents(book: WPBook): number | null {
  const raw = book.acf?.price_usd;
  if (raw === undefined || raw === null || raw === "") return null;
  const n = typeof raw === "number" ? raw : parseFloat(String(raw).replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
}

/** Display price string for UI (2 decimals) or null. */
export function formatBookPriceUsd(book: WPBook): string | null {
  const cents = getBookPriceUsdCents(book);
  if (cents === null) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
}

/** Featured image, or first large image `src` from `content.rendered`. */
export function getBookCoverUrl(book: WPBook): string | null {
  const embedded = book._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (embedded) return embedded;
  const html = book.content?.rendered;
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1] ?? null;
}

function coverImageBasename(url: string): string | null {
  const m = url.match(/\/([^/?#]+\.(?:png|jpe?g|webp|gif))(?:\?|$)/i);
  return m?.[1]?.toLowerCase() ?? null;
}

/** Drop cover image from body HTML when it is already shown in the book layout column. */
export function stripBookCoverFromContentHtml(
  html: string,
  coverUrl: string | null,
): string {
  if (!coverUrl || !html) return html;
  const basename = coverImageBasename(coverUrl);
  if (!basename) return html;

  const matchesCover = (src: string) => {
    if (src === coverUrl) return true;
    return coverImageBasename(src) === basename;
  };

  let out = html.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, (figure) => {
    const src = figure.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
    return src && matchesCover(src) ? "" : figure;
  });

  out = out.replace(/<img[^>]+>/gi, (tag) => {
    const src = tag.match(/src=["']([^"']+)["']/i)?.[1];
    return src && matchesCover(src) ? "" : tag;
  });

  return out;
}

async function fetchAllPages<T>(path: string, extra: Record<string, string> = {}): Promise<T[]> {
  if (!isWpConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WORDPRESS_API_URL is not set; WordPress fetches skipped.");
    }
    return [];
  }
  try {
    const results: T[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const url = buildUrl(path, {
        ...extra,
        page: String(page),
        per_page: "50",
        _embed: "1",
      });
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (!res.ok) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`WordPress ${res.status}: ${url}`);
        }
        return [];
      }
      const chunk = (await res.json()) as T[];
      results.push(...chunk);
      totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
      page += 1;
    } while (page <= totalPages);

    return results;
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`WordPress fetch failed (${path}):`, e);
    }
    return [];
  }
}

export const POSTS_PER_PAGE = 6;

export async function getPublishedPosts(): Promise<WPPost[]> {
  const posts = await fetchAllPages<WPPost>("wp/v2/posts");
  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export type PaginatedPosts = {
  posts: WPPost[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
};

/** One page of posts (newest first), for blog pagination. */
export async function getPublishedPostsPage(
  requestedPage: number,
  perPage: number = POSTS_PER_PAGE,
): Promise<PaginatedPosts> {
  const page = Math.max(1, Math.floor(requestedPage));
  const per = Math.min(100, Math.max(1, Math.floor(perPage)));
  if (!isWpConfigured()) {
    return { posts: [], total: 0, totalPages: 0, page, perPage: per };
  }
  try {
    const url = buildUrl("wp/v2/posts", {
      page: String(page),
      per_page: String(per),
      _embed: "1",
    });
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`WordPress ${res.status}: ${url}`);
      }
      return { posts: [], total: 0, totalPages: 0, page, perPage: per };
    }
    const posts = (await res.json()) as WPPost[];
    const total = Number(res.headers.get("X-WP-Total") ?? "0");
    const totalPages = Math.max(0, Number(res.headers.get("X-WP-TotalPages") ?? "0"));
    return {
      posts,
      total,
      totalPages,
      page,
      perPage: per,
    };
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`WordPress fetch failed (posts page ${page}):`, e);
    }
    return { posts: [], total: 0, totalPages: 0, page, perPage: per };
  }
}

export async function getPublishedBooks(): Promise<WPBook[]> {
  const books = await fetchAllPages<WPBook>("wp/v2/book");
  return books.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getBookById(id: number): Promise<WPBook | null> {
  if (!isWpConfigured()) return null;
  try {
    const url = buildUrl(`wp/v2/book/${id}`, { _embed: "1" });
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as WPBook;
  } catch {
    return null;
  }
}

export async function getBookBySlug(slug: string): Promise<WPBook | null> {
  if (!isWpConfigured()) return null;
  try {
    const url = buildUrl("wp/v2/book", { slug, _embed: "1" });
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = (await res.json()) as WPBook[];
    return data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!isWpConfigured()) return null;
  try {
    const url = buildUrl("wp/v2/posts", { slug, _embed: "1" });
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = (await res.json()) as WPPost[];
    return data[0] ?? null;
  } catch {
    return null;
  }
}

export function getPostFeaturedImage(post: WPPost): string | null {
  const src = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return src ?? null;
}
