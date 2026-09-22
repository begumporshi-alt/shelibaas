import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shelibaas.com';

const STATIC_ROUTES = [
  '',
  '/shop',
  '/about',
  '/contact',
  '/faq',
  '/shipping',
  '/size-guide',
  '/signin',
  '/signup',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const [{ data: products }, { data: categories }] = await Promise.all([
      supabase.from('products').select('slug, updated_at').eq('is_active', true).limit(500),
      supabase.from('categories').select('slug').eq('is_active', true),
    ]);
    (categories as { slug: string }[] | null)?.forEach((c) => {
      entries.push({
        url: `${BASE_URL}/shop/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
    (products as { slug: string; updated_at: string }[] | null)?.forEach((p) => {
      entries.push({
        url: `${BASE_URL}/product/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });
  } catch {
    // Fall back to static routes only
  }

  return entries;
}
