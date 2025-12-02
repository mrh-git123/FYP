const products = [
  /* -------------------------- BAGS (5 Items) -------------------------- */
  {
    name: 'Aurora Leather Backpack',
    slug: 'aurora-leather-backpack',
    description: 'Handcrafted full-grain leather backpack with padded laptop sleeve.',
    price: 189.99,
    salePrice: 159.99,
    category: 'Bags',
    tags: ['new', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 24,
    isFeatured: true,
  },
  {
    name: 'Voyager Canvas Tote',
    slug: 'voyager-canvas-tote',
    description: 'Durable canvas tote perfect for travel and everyday use.',
    price: 59.99,
    category: 'Bags',
    tags: ['eco'],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 32,
  },
  {
    name: 'Atlas Travel Duffel',
    slug: 'atlas-travel-duffel',
    description: 'Water-resistant duffel bag with detachable shoulder strap.',
    price: 129.99,
    category: 'Bags',
    tags: ['travel'],
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 18,
    isFeatured: true,
  },
  {
    name: 'Metro Slim Messenger',
    slug: 'metro-slim-messenger',
    description: 'Urban messenger bag with multiple organizer pockets.',
    price: 79.99,
    category: 'Bags',
    tags: ['office'],
    images: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
  },
  {
    name: 'Sahara Adventure Pack',
    slug: 'sahara-adventure-pack',
    description: 'Outdoor backpack with hydration bladder compartment.',
    price: 149.99,
    category: 'Bags',
    tags: ['outdoor'],
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
  },

  /* ----------------------- ELECTRONICS (5 Items) ----------------------- */
  {
    name: 'Solstice Wireless Headphones',
    slug: 'solstice-wireless-headphones',
    description: 'Premium ANC headphones with 35-hour battery life and fast charging.',
    price: 249.5,
    category: 'Electronics',
    tags: ['audio'],
    images: [
      'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 42,
    isFeatured: true,
  },
  {
    name: 'Nebula Bluetooth Speaker',
    slug: 'nebula-bluetooth-speaker',
    description: 'Compact speaker with deep bass and 12-hour playback.',
    price: 89.99,
    category: 'Electronics',
    tags: ['audio', 'portable'],
    images: [
      'https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 50,
  },
  {
    name: 'Orion Smartwatch',
    slug: 'orion-smartwatch',
    description: 'Fitness tracking smartwatch with AMOLED display.',
    price: 199.99,
    category: 'Electronics',
    tags: ['wearable'],
    images: [
      'https://images.unsplash.com/photo-1516571137133-1be29e89f13f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 33,
    isFeatured: true,
  },
  {
    name: 'Nova Wireless Earbuds',
    slug: 'nova-wireless-earbuds',
    description: 'Lightweight earbuds with ENC and wireless charging.',
    price: 69.99,
    category: 'Electronics',
    tags: ['audio'],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 80,
  },
  {
    name: 'Helix Gaming Mouse',
    slug: 'helix-gaming-mouse',
    description: 'High precision RGB gaming mouse with 9 programmable buttons.',
    price: 59.99,
    category: 'Electronics',
    tags: ['gaming'],
    images: [
      'https://images.unsplash.com/photo-1587202372775-989074ebd89b?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
  },

  /* -------------------------- HOME (5 Items) -------------------------- */
  {
    name: 'Lumen Smart Lamp',
    slug: 'lumen-smart-lamp',
    description: 'Voice-enabled smart lamp with adaptive brightness and ambient scenes.',
    price: 129.0,
    category: 'Home',
    tags: ['smart-home'],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
  },
  {
    name: 'Breeze Air Purifier',
    slug: 'breeze-air-purifier',
    description: 'HEPA air purifier with real-time air quality monitoring.',
    price: 149.99,
    category: 'Home',
    tags: ['clean'],
    images: [
      'https://images.unsplash.com/photo-1584270354949-1f5ba3c4d7e5?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 22,
  },
  {
    name: 'Zen Aroma Diffuser',
    slug: 'zen-aroma-diffuser',
    description: 'Ultrasonic diffuser with customizable LED lighting.',
    price: 39.99,
    category: 'Home',
    tags: ['wellness'],
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 60,
  },
  {
    name: 'CloudSoft Throw Blanket',
    slug: 'cloudsoft-throw-blanket',
    description: 'Ultra-soft microfiber blanket ideal for cozy evenings.',
    price: 29.99,
    category: 'Home',
    tags: ['comfort'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 70,
  },
  {
    name: 'Harbor Ceramic Vase',
    slug: 'harbor-ceramic-vase',
    description: 'Hand-crafted ceramic vase with matte finish.',
    price: 45.0,
    category: 'Home',
    tags: ['decor'],
    images: [
      'https://images.unsplash.com/photo-1598300056393-e7d45a3e6f02?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
  },

  /* -------------------------- SHOES (5 Items) -------------------------- */
  {
    name: 'Polar Trail Runners',
    slug: 'polar-trail-runners',
    description: 'Lightweight trail running shoes with responsive cushioning.',
    price: 119.99,
    category: 'Shoes',
    tags: ['outdoor'],
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 60,
  },
  {
    name: 'AeroFlex Running Shoes',
    slug: 'aeroflex-running-shoes',
    description: 'Breathable mesh runners designed for daily training.',
    price: 89.99,
    category: 'Shoes',
    tags: ['sports'],
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 48,
  },
  {
    name: 'UrbanStep Sneakers',
    slug: 'urbanstep-sneakers',
    description: 'Street-style sneakers with cushioned sole and leather overlays.',
    price: 109.99,
    category: 'Shoes',
    tags: ['casual'],
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 35,
  },
  {
    name: 'Nimbus Comfort Slides',
    slug: 'nimbus-comfort-slides',
    description: 'Soft EVA slides perfect for indoors and poolside.',
    price: 29.99,
    category: 'Shoes',
    tags: ['comfort'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 75,
  },
  {
    name: 'Summit Trekking Boots',
    slug: 'summit-trekking-boots',
    description: 'Durable waterproof boots for hiking and rough terrain.',
    price: 159.99,
    category: 'Shoes',
    tags: ['outdoor'],
    images: [
      'https://images.unsplash.com/photo-1595950658501-bf47b7ef2fc8?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 28,
  },
];


const users = [
  {
    name: 'Store Admin',
    email: 'admin@stellar.shop',
    password: 'Admin123!@',
    role: 'admin',
  },
  {
    name: 'Demo Customer',
    email: 'customer@stellar.shop',
    password: 'Customer123!@',
    role: 'customer',
  },
];

module.exports = { products, users };
