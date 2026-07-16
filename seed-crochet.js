const fs = require('fs');
const mongoose = require('mongoose');

const envLocal = fs.readFileSync('.env.local', 'utf8');
const match = envLocal.match(/MONGODB_URI="?([^"\n]+)"?/);
if (!match) throw new Error("No MONGODB_URI found");
const MONGODB_URI = match[1];

const PortfolioItemSchema = new mongoose.Schema({
  pillar: { type: String, enum: ['crochet', 'photography', 'webdesign', 'gallery'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number },
  tags: [{ type: String }],
  rating: { type: Number },
  reviews: { type: Number },
}, { timestamps: true });

const PortfolioItem = mongoose.models.PortfolioItem || mongoose.model('PortfolioItem', PortfolioItemSchema);

const items = [
  {
    pillar: 'crochet',
    title: 'Chunky Hand-Knit Throw Blanket',
    description: 'A cozy, oversized hand-knit throw blanket perfect for chilly evenings.',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop',
    category: 'blankets',
    price: 1200,
    tags: ['blanket', 'chunky', 'cozy'],
    rating: 5,
    reviews: 14
  },
  {
    pillar: 'crochet',
    title: 'Summer Boho Tote Bag',
    description: 'Handcrafted bohemian style tote bag for everyday use.',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
    category: 'bags',
    price: 650,
    tags: ['bag', 'summer', 'boho'],
    rating: 5,
    reviews: 8
  },
  {
    pillar: 'crochet',
    title: 'Granny Square Crop Top',
    description: 'Vintage-inspired granny square crop top.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop',
    category: 'tops',
    price: 450,
    tags: ['top', 'vintage', 'granny'],
    rating: 4.8,
    reviews: 22
  },
  {
    pillar: 'crochet',
    title: 'Plush Baby Bear Beanie',
    description: 'Adorable and incredibly soft baby beanie with bear ears.',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop',
    category: 'baby',
    price: 200,
    tags: ['baby', 'beanie', 'cute'],
    rating: 5,
    reviews: 31
  },
  {
    pillar: 'crochet',
    title: 'Textured Throw Pillow',
    description: 'Elegant textured crochet pillow cover.',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
    category: 'home_decor',
    price: 350,
    tags: ['home', 'pillow', 'decor'],
    rating: 4.9,
    reviews: 11
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await PortfolioItem.deleteMany({ pillar: 'crochet' });
    console.log('Cleared old crochet items');
    
    await PortfolioItem.insertMany(items);
    console.log('Seeded new crochet items successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
