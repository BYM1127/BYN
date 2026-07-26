
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

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

const crochetDir = path.join(__dirname, 'public', 'crochet');
const bymContentDir = path.join(__dirname, 'public', 'BYM content');

const getImages = (dir, prefix) => {
  return fs.readdirSync(dir)
    .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
    .map((file, index) => ({
      pillar: 'crochet',
      title: 'Crochet Work',
      imageUrl: `/${prefix}/${file}`,
      category: 'crochet',
      tags: ['crochet', 'handmade'],
      rating: 5,
      reviews: 0
    }));
};

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Optional: Delete existing crochet portfolio items if you want to prevent duplicates
    // console.log('Clearing existing crochet items...');
    // await PortfolioItem.deleteMany({ pillar: 'crochet' });

    const crochetImages = getImages(crochetDir, 'crochet');
    const bymImages = getImages(bymContentDir, 'BYM content');
    
    const allImages = [...crochetImages, ...bymImages];

    // Also add the base photography and webdesign items from the hardcoded array
    const baseItems = [
      { pillar: 'photography', title: 'Golden Hour Portrait', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop', category: 'photography', tags: ['portrait', 'outdoor'] },
      { pillar: 'webdesign', title: 'BMZtrial1', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop', category: 'webdesign', tags: ['business', 'github'] },
      { pillar: 'photography', title: 'Family at Sunset', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop', category: 'photography', tags: ['family', 'outdoor'] },
      { pillar: 'webdesign', title: 'DkLC - Catering', imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop', category: 'webdesign', tags: ['catering', 'github'] },
      { pillar: 'photography', title: 'Maternity Glow Session', imageUrl: 'https://images.unsplash.com/photo-1519064438302-7634f1b40d6c?q=80&w=600&auto=format&fit=crop', category: 'photography', tags: ['maternity', 'studio'] },
      { pillar: 'webdesign', title: 'IMELA-PROJECTS', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop', category: 'webdesign', tags: ['electrical', 'solar'] },
      { pillar: 'photography', title: 'Event Coverage', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop', category: 'photography', tags: ['events', 'coverage'] },
      { pillar: 'photography', title: 'Creative Studio Headshot', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', category: 'photography', tags: ['headshot', 'studio'] },
      { pillar: 'photography', title: 'Urban Lifestyle Shoot', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', category: 'photography', tags: ['lifestyle', 'urban'] }
    ];

    const finalItems = [...allImages, ...baseItems];

    console.log(`Inserting ${finalItems.length} items...`);
    
    // Use upsert or just clear and insert
    await PortfolioItem.deleteMany({});
    await PortfolioItem.insertMany(finalItems);
    
    console.log('Successfully seeded database!');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
