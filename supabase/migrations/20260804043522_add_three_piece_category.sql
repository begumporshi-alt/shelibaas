-- Add "Three Piece" category — curated three-piece (kurta, shalwar, dupatta) collections
INSERT INTO categories (name, slug, description, image_url, sort_order, is_active)
VALUES (
  'Three Piece',
  'three-piece',
  'Curated three-piece ensembles — kurta, shalwar, and dupatta sets handpicked from trusted designers and brands.',
  'https://images.pexels.com/photos/20593509/pexels-photo-20593509.jpeg?auto=compress&cs=tinysrgb&w=940',
  2,
  true
)
ON CONFLICT (slug) DO NOTHING;
