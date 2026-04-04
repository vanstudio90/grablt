import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/signup",
          "/profile",
          "/messages",
          "/messages/",
          "/cart",
          "/checkout",
          "/buying",
          "/selling",
          "/transaction/",
          "/dispute/",
          "/auth/",
          "/api/",
          "/search",
          "/*?*",
        ],
      },
    ],
    sitemap: "https://buyormeet.com/sitemap.xml",
    host: "https://buyormeet.com",
  };
}
