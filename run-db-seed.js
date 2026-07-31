const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const dns = require('dns');

// Force using Google DNS for DNS resolution to avoid MongoDB Atlas SRV connection issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Read connection string
const envLocal = fs.readFileSync('.env.local', 'utf8');
const match = envLocal.match(/MONGODB_URI="?([^"\n]+)"?/);
if (!match) throw new Error("No MONGODB_URI found");
const MONGODB_URI = match[1];

// Schema Definitions
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

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Read updated seedData
    const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seedData.json'), 'utf8'));

    // Clear and Seed PortfolioItems
    await PortfolioItem.deleteMany({});
    console.log('Cleared all old PortfolioItems.');
    await PortfolioItem.insertMany(seedData);
    console.log(`Seeded ${seedData.length} PortfolioItems.`);

    // Clear and Seed Products (only crochet items are in Product collection)
    await Product.deleteMany({});
    console.log('Cleared all old Products.');
    
    const crochetItems = seedData.filter(item => item.pillar === 'crochet');
    const products = crochetItems.map(item => ({
      title: item.title,
      description: item.description || 'Handcrafted crochet piece',
      imageUrl: item.imageUrl,
      category: item.category,
      price: item.price || 0,
      tags: item.tags || [],
      rating: item.rating || 5,
      reviews: item.reviews || 0,
      stockQuantity: 1,
      isPublished: true,
    }));

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} Products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
