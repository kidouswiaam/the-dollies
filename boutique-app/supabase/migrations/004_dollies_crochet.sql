-- The Dollies Crochet Studio — product types & branding
-- Run in Supabase SQL Editor after 001–003

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS product_type TEXT NOT NULL DEFAULT 'physical'
    CHECK (product_type IN ('physical', 'digital'));

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT FALSE;

UPDATE settings SET
  boutique_name = 'The Dollies Crochet Studio',
  tagline = 'Handmade crochet dolls & instant PDF patterns — made with love, stitch by stitch.',
  hero_image_url = COALESCE(hero_image_url, 'https://images.unsplash.com/photo-1582794543139-8a1bb05fbb85?w=1200&q=85')
WHERE id = '00000000-0000-0000-0000-000000000001'::UUID;

INSERT INTO categories (name) VALUES ('Dolls'), ('Patterns')
ON CONFLICT (name) DO NOTHING;
