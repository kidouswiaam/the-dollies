-- Optional: Sample products (run after migrations, adjust category IDs)
-- Get category IDs: SELECT id, name FROM categories;

/*
INSERT INTO products (name, description, price, old_price, promotion, category_id, image_urls, stock, featured)
SELECT
  'Silk Midi Dress',
  'Fluid Italian silk with a flattering bias cut.',
  71.99, 89.99, 20,
  (SELECT id FROM categories WHERE name = 'Dresses' LIMIT 1),
  ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80'],
  12, true;
*/
