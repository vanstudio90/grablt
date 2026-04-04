import type { MetadataRoute } from "next";
import { listings as staticListings } from "@/lib/data";
import { generateDemoListings } from "@/lib/demoProducts";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://buyormeet.com";

// Quality gate: only index listings meeting these criteria
function isIndexable(listing: {
  title?: string;
  description?: string;
  images?: string[];
  status?: string;
}): boolean {
  if (!listing.title || listing.title.length < 5) return false;
  if (!listing.description || listing.description.length < 30) return false;
  if (!listing.images || listing.images.length === 0) return false;
  if (listing.status && listing.status !== "available") return false;
  return true;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Add static listings (quality-filtered)
  for (const l of staticListings) {
    if (!isIndexable(l)) continue;
    urls.push({
      url: `${BASE_URL}/listing/${l.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Add demo listings (quality-filtered)
  try {
    const demo = generateDemoListings();
    for (const l of demo) {
      if (!isIndexable(l)) continue;
      urls.push({
        url: `${BASE_URL}/listing/${l.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  } catch (e) {
    console.error("Failed to generate demo listings for sitemap:", e);
  }

  // Add real DB listings (quality-filtered)
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data } = await supabase
        .from("listings")
        .select("id, title, description, images, status, updated_at")
        .eq("status", "available")
        .limit(45000);

      if (data) {
        for (const l of data) {
          if (!isIndexable(l)) continue;
          urls.push({
            url: `${BASE_URL}/listing/db-${l.id}`,
            lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }
  } catch (e) {
    console.error("Failed to fetch DB listings for sitemap:", e);
  }

  return urls;
}
