import { MetadataRoute } from "next";
import {
  getPublishedPosts,
  getPublishedBooks,
  WPPost,
  WPBook,
} from "@/lib/wordpress";

const SITE_URL = "https://swordcirclepen.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/books`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let posts: WPPost[] = [];
  let books: WPBook[] = [];

  try {
    posts = await getPublishedPosts();
  } catch {
    // Graceful fallback: if WordPress is unreachable, return static routes only.
  }

  try {
    books = await getPublishedBooks();
  } catch {
    // Graceful fallback: if WordPress is unreachable, return static routes only.
  }

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const modified = (post as WPPost & { modified?: string }).modified ?? post.date;
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(modified),
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  const bookRoutes: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${SITE_URL}/books/${book.slug}`,
    lastModified: new Date(book.modified ?? book.date),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...bookRoutes];
}
