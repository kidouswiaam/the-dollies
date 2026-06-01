# The Dollies Crochet Studio

Premium full-stack crochet e-commerce — handmade **dolls** (physical) and **PDF patterns** (digital), with WhatsApp ordering and a no-code admin dashboard.

## Brand

**The Dollies Crochet Studio** — feminine pink & black aesthetic, glassmorphism UI, Pinterest-style product grid.

## Stack

- React (Vite) + Tailwind CSS v4 + Framer Motion
- Supabase (database, auth, storage, realtime)

## Features

| Storefront | Admin |
|------------|-------|
| Hero + featured + Dolls / Patterns sections | Add / edit / delete products |
| Badges: **NEW**, **SALE**, **DIGITAL** | Set type: physical or digital |
| WhatsApp orders (auto message + type) | Image upload, promotions, settings |
| Search, category & type filters | Realtime storefront updates |
| Dark / light mode | WhatsApp number in settings |

## Setup

```bash
cd boutique-app
npm install
cp .env.example .env   # add Supabase URL + anon key
```

### Supabase SQL (in order)

1. `supabase/migrations/001_schema.sql`
2. `supabase/migrations/002_policies.sql`
3. `supabase/migrations/003_storage.sql`
4. **`supabase/migrations/004_dollies_crochet.sql`** ← run this if you already ran 001–003 before

### Admin user

1. Authentication → Add user  
2. `profiles` table → `role` = `admin`

### Run

```bash
npm run dev
```

- Store: http://localhost:5173  
- Admin: http://localhost:5173/admin/login  

### First steps in admin

1. **Settings** → WhatsApp number + boutique name  
2. **Categories** → Dolls, Patterns (seeded by default)  
3. **Products** → Create doll (physical) or pattern (digital PDF)

## Product types

| Type | Badge | Stock | Order |
|------|-------|-------|-------|
| `physical` | — | Quantity tracked | Ships handmade |
| `digital` | DIGITAL | Always available | Instant Download PDF via WhatsApp |

## WhatsApp message includes

- Product name, price, promotion  
- **Type:** Physical (Handmade Doll) or Digital (PDF Pattern)  
- Quantity: 1  

Phone number: **Settings** in admin (stored in Supabase, not in code).

## Deploy

Build: `npm run build` → deploy `dist/` to Vercel/Netlify with env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
