const fs = require('fs');
const mongoose = require('mongoose');

const envLocal = fs.readFileSync('.env.local', 'utf8');
const match = envLocal.match(/MONGODB_URI="?([^"\n]+)"?/);
if (!match) throw new Error("No MONGODB_URI found");
const MONGODB_URI = match[1];

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  sku: { type: String },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  category: { type: String },
  tags: [{ type: String }],
  imageUrl: { type: String },
  images: [{ type: String }],
  stockQuantity: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  weightInGrams: { type: Number },
  variations: { type: mongoose.Schema.Types.Mixed },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const items = [
  {
    title: 'Chunky Hand-Knit Throw Blanket',
    description: 'A cozy, oversized hand-knit throw blanket perfect for chilly evenings.',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop',
    category: 'blankets',
    price: 1200,
    tags: ['blanket', 'chunky', 'cozy'],
    rating: 5,
    reviews: 14,
    stockQuantity: 5,
    sku: 'CHK-TB-001',
    isPublished: true
  },
  {
    title: 'Summer Boho Tote Bag',
    description: 'Handcrafted bohemian style tote bag for everyday use.',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
    category: 'bags',
    price: 650,
    tags: ['bag', 'summer', 'boho'],
    rating: 5,
    reviews: 8,
    stockQuantity: 12,
    sku: 'SB-TB-002',
    isPublished: true
  },
  {
    title: 'Granny Square Crop Top',
    description: 'Vintage-inspired granny square crop top.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop',
    category: 'tops',
    price: 450,
    tags: ['top', 'vintage', 'granny'],
    rating: 4.8,
    reviews: 22,
    stockQuantity: 3,
    sku: 'GS-CT-003',
    isPublished: true
  },
  {
    title: 'Plush Baby Bear Beanie',
    description: 'Adorable and incredibly soft baby beanie with bear ears.',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop',
    category: 'baby',
    price: 200,
    tags: ['baby', 'beanie', 'cute'],
    rating: 5,
    reviews: 31,
    stockQuantity: 20,
    sku: 'PB-BB-004',
    isPublished: true
  },
  {
    title: 'Textured Throw Pillow',
    description: 'Elegant textured crochet pillow cover.',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
    category: 'home_decor',
    price: 350,
    tags: ['home', 'pillow', 'decor'],
    rating: 4.9,
    reviews: 11,
    stockQuantity: 8,
    sku: 'TT-P-005',
    isPublished: true
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared old products');
    
    await Product.insertMany(items);
    console.log('Seeded new products successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
