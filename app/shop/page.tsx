import { supabaseServer as supabase } from '@/lib/supabase-server';
import type { Product, Category } from '@/lib/types';
import { ShopGrid } from '@/components/shop/shop-grid';
import { ShopHero } from '@/components/shop/shop-hero';

export const revalidate = 3600;

export default async function AllShopPage() {
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from('products')
      .select('id, slug, name, price, compare_price, fabric, is_new_arrival, is_best_seller, is_featured, category:categories(slug, name), product_images(url, is_primary)')
      .eq('is_active', true)
      .order('is_featured', { ascending: false }),
    supabase
      .from('categories')
      .select('id, slug, name')
      .eq('is_active', true)
      .order('sort_order'),
  ]);

  return (
    <>
      <ShopHero
        title="All Collections"
        description="Discover our full collection of couture, luxury pret, unstitched lawn, sarees, and menswear."
      />
      <ShopGrid
        products={(products as unknown as Product[]) || []}
        categories={(categories as Category[]) || []}
      />
    </>
  );
}
