import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PortfolioItem from '@/models/PortfolioItem';
import seedData from '../../../seedData.json';

export async function GET() {
  try {
    await dbConnect();
    // Clear everything first to prevent duplicates
    await PortfolioItem.deleteMany({});
    
    // Insert all items from seedData
    await PortfolioItem.insertMany(seedData);
    
    return NextResponse.json({ success: true, message: `Successfully seeded ${seedData.length} items to PortfolioItem collection.` });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
