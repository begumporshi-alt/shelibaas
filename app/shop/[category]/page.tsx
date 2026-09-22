import { supabaseServer as supabase } from '@/lib/supabase-server';
import type { Product, Category } from '@/lib/types';
import { ShopGrid } from '@/components/shop/shop-grid';
import { ShopHero } from '@/components/shop/shop-hero';

export const revalidate = 3600;

async function getData(categorySlug?: string) {
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from('products')
      .select('id, slug, name, price, compare_price, fabric, is_new_arrival, is_best_seller, is_featured, category:categories(slug, name), product_images(url, is_primary)')
      .eq('is_active', true)
      .order('is_featured', { ascending: false }),
    supabase
      .from('categories')
      .select('id, slug, name, description, image_url')
      .eq('is_active', true)
      .order('sort_order'),
  ]);

  let activeCategory: Category | undefined;
  if (categorySlug) {
    activeCategory = (categories as Category[])?.find((c) => c.slug === categorySlug);
  }

  return {
    products: (products as unknown as Product[]) || [],
    categories: (categories as unknown as Category[]) || [],
    activeCategory,
  };
}

export default async function ShopPage({
  params,
}: {
  params: { category?: string };
}) {
  const categorySlug = params?.category;
  const { products, categories, activeCategory } = await getData(categorySlug);

  const title = activeCategory?.name || 'All Collections';
  const description =
    activeCategory?.description ||
    'Discover our curated collection of three-piece ensembles, luxury pret, unstitched lawn, sarees, and menswear — handpicked from trusted designers and brands.';

  return (
    <>
      <ShopHero title={title} description={description} image={activeCategory?.image_url} />
      <ShopGrid
        products={products}
        categories={categories}
        activeCategory={categorySlug}
      />
    </>
  );
}
