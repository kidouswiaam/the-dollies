/**
 * ═══════════════════════════════════════════════════════════
 *  LUMIÈRE BOUTIQUE — Configuration & Product Catalog
 *  Edit this file to customize your store (no code changes needed elsewhere).
 * ═══════════════════════════════════════════════════════════
 */

/** WhatsApp: country code + number, digits only (no +, spaces, dashes) */
const BOUTIQUE_CONFIG = {
  shopName: "Lumière Boutique",
  tagline: "Curated luxury for the modern wardrobe",
  whatsappPhone: "1234567890",
  currencySymbol: "$",
  email: "hello@lumiereboutique.com",
  phone: "+1 (555) 123-4567",
  address: "124 Maison Street, New York, NY",
  hours: "Mon–Sat 10am – 7pm",
  heroImage:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    pinterest: "https://pinterest.com",
  },
};

/** Filter categories — add or remove as needed */
const CATEGORIES = ["All", "Dresses", "Outerwear", "Accessories", "Bags"];

/**
 * Product fields:
 * id, name, description, price, oldPrice?, discount?, image, stock, category
 * stock: "in-stock" | "low-stock" | "out-of-stock"
 */
const PRODUCTS = [
  {
    id: "silk-midi-dress",
    name: "Silk Midi Dress",
    description:
      "Fluid Italian silk with a flattering bias cut. Perfect for evening occasions or elevated everyday wear.",
    price: 71.99,
    oldPrice: 89.99,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    stock: "in-stock",
    category: "Dresses",
  },
  {
    id: "linen-blazer",
    name: "Linen Relaxed Blazer",
    description:
      "Breathable European linen in a relaxed silhouette. Layer over dresses or tailored trousers.",
    price: 124.0,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    stock: "in-stock",
    category: "Outerwear",
  },
  {
    id: "gold-hoop-earrings",
    name: "Gold Hoop Earrings",
    description:
      "18k gold-plated hoops with a lightweight feel. A timeless staple for any jewelry collection.",
    price: 36.13,
    oldPrice: 42.5,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60903?w=600&q=80",
    stock: "low-stock",
    category: "Accessories",
  },
  {
    id: "cashmere-scarf",
    name: "Cashmere Wrap Scarf",
    description:
      "Ultra-soft Mongolian cashmere in an oversized wrap. Available in neutral tones.",
    price: 68.0,
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c8?w=600&q=80",
    stock: "in-stock",
    category: "Accessories",
  },
  {
    id: "leather-tote",
    name: "Leather Structured Tote",
    description:
      "Full-grain leather with interior pockets and gold hardware. Handcrafted in small batches.",
    price: 140.4,
    oldPrice: 156.0,
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1548039186-c79fbb390c5d?w=600&q=80",
    stock: "in-stock",
    category: "Bags",
  },
  {
    id: "satin-slip-skirt",
    name: "Satin Slip Skirt",
    description:
      "Lustrous satin with a midi length and subtle sheen. Pairs beautifully with knits or blazers.",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    stock: "out-of-stock",
    category: "Dresses",
  },
  {
    id: "wool-coat",
    name: "Wool Blend Coat",
    description:
      "Double-breasted coat in premium wool blend. Structured shoulders and timeless camel hue.",
    price: 289.0,
    oldPrice: 340.0,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
    stock: "in-stock",
    category: "Outerwear",
  },
  {
    id: "pearl-clutch",
    name: "Pearl Evening Clutch",
    description:
      "Hand-beaded pearl clutch with detachable chain strap. Ideal for weddings and galas.",
    price: 98.0,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bfcdfc6a83c?w=600&q=80",
    stock: "low-stock",
    category: "Bags",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sophie Laurent",
    role: "Regular customer",
    text: "The quality exceeds every expectation. I ordered the silk dress and received a personal note with styling tips. Truly a boutique experience.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maya Chen",
    role: "Fashion editor",
    text: "Lumière curates pieces that feel timeless yet fresh. WhatsApp ordering made it effortless — I had my bag confirmed within minutes.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Vasquez",
    role: "Bride",
    text: "Found my wedding accessories here. Beautiful packaging, fast communication, and pieces I will cherish forever.",
    rating: 5,
  },
];

const BOUTIQUE_VALUES = [
  { title: "Craftsmanship", text: "Every piece is selected for exceptional materials and lasting quality." },
  { title: "Personal Service", text: "We reply on WhatsApp with honest advice — never pushy sales." },
  { title: "Sustainable Mindset", text: "Small batches and timeless designs meant to be worn for years." },
];
