-- Run once to update storefront text & social links in Supabase
UPDATE settings SET
  boutique_name = 'The Dollies Crochet Studio',
  tagline = 'Handmade creations only—tired hands, endless crochet love',
  social_links = '{"instagram":"https://www.instagram.com/the.dollies23?igsh=b2lqaDdlMHVjeGFh","facebook":"https://www.facebook.com/profile.php?id=100063708463987","pinterest":""}'::jsonb
WHERE id = '00000000-0000-0000-0000-000000000001'::UUID;
