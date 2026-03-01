// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getProductSlugs } from '@/lib/mdx';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rafifmsn.com"; // Change to your actual production domain

  // 1. Static Routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // 2. Dynamic MDX Routes
  const slugs = getProductSlugs();
  const dynamicRoutes = slugs.map((slug) => {
    const realSlug = slug.replace(/\.mdx?$/, "");
    return {
      url: `${baseUrl}/products/${realSlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}