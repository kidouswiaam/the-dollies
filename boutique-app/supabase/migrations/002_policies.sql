-- Row Level Security Policies

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Helper: check if user is authenticated staff/admin
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Profiles: users read own; admin reads all
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON profiles FOR ALL USING (is_admin());

-- Categories: public read; staff write
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_staff_write" ON categories FOR INSERT WITH CHECK (is_staff());
CREATE POLICY "categories_staff_update" ON categories FOR UPDATE USING (is_staff());
CREATE POLICY "categories_admin_delete" ON categories FOR DELETE USING (is_admin());

-- Products: public read; staff write
CREATE POLICY "products_public_read" ON products FOR SELECT USING (true);
CREATE POLICY "products_staff_insert" ON products FOR INSERT WITH CHECK (is_staff());
CREATE POLICY "products_staff_update" ON products FOR UPDATE USING (is_staff());
CREATE POLICY "products_admin_delete" ON products FOR DELETE USING (is_admin());

-- Promotions: public read active; staff manage
CREATE POLICY "promotions_public_read" ON promotions FOR SELECT USING (true);
CREATE POLICY "promotions_staff_insert" ON promotions FOR INSERT WITH CHECK (is_staff());
CREATE POLICY "promotions_staff_update" ON promotions FOR UPDATE USING (is_staff());
CREATE POLICY "promotions_admin_delete" ON promotions FOR DELETE USING (is_admin());

-- Settings: public read; admin write
CREATE POLICY "settings_public_read" ON settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_write" ON settings FOR UPDATE USING (is_admin());
CREATE POLICY "settings_admin_insert" ON settings FOR INSERT WITH CHECK (is_admin());
