-- Fixed product types: doll | pattern only
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_product_type_check;

UPDATE products SET product_type = 'pattern' WHERE product_type IN ('digital', 'pattern');
UPDATE products SET product_type = 'doll' WHERE product_type IN ('physical', 'doll') OR product_type IS NULL;

ALTER TABLE products
  ALTER COLUMN product_type SET DEFAULT 'doll';

ALTER TABLE products
  ADD CONSTRAINT products_product_type_check
  CHECK (product_type IN ('doll', 'pattern'));
