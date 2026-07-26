import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PortfolioItem from '@/models/PortfolioItem';
import Product from '@/models/Product';
import seedData from '../../../seedData.json';

export async function GET() {
  try {
    await dbConnect();
    // Clear everything first to prevent duplicates
    await PortfolioItem.deleteMany({});
    
    // Insert all items from seedData
    await PortfolioItem.insertMany(seedData);
    
    // Also seed the Product collection for the crochet shop
    await Product.deleteMany({});
    const crochetItems = seedData.filter((item: any) => item.pillar === 'crochet');
    const products = crochetItems.map((item: any) => ({
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
    
    return NextResponse.json({ success: true, message: `Successfully seeded ${seedData.length} portfolio items and ${products.length} products.` });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
