'use server'

import dbConnect from '@/lib/db'
import PortfolioItem from '@/models/PortfolioItem'
import { revalidatePath } from 'next/cache'

export interface PortfolioItemData {
  id?: string
  pillar: 'crochet' | 'photography' | 'webdesign' | 'gallery'
  title: string
  description?: string
  imageUrl: string
  category: string
  price?: number
  tags: string[]
  rating?: number
  reviews?: number
}

export async function addPortfolioItem(data: Omit<PortfolioItemData, 'id'>) {
  try {
    await dbConnect()
    const doc = await PortfolioItem.create(data)
    revalidatePath(`/${data.pillar}`)
    revalidatePath('/admin/photography')
    revalidatePath('/admin/web')
    revalidatePath('/admin/crochet')
    return doc._id.toString()
  } catch (error) {
    console.error('Error adding portfolio item:', error)
    throw new Error('Failed to add item')
  }
}

export async function updatePortfolioItem(id: string, data: Partial<PortfolioItemData>) {
  try {
    await dbConnect()
    await PortfolioItem.findByIdAndUpdate(id, data)
    revalidatePath('/')
    revalidatePath('/admin/photography')
    revalidatePath('/admin/web')
    revalidatePath('/admin/crochet')
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    throw new Error('Failed to update item')
  }
}

export async function deletePortfolioItem(id: string) {
  try {
    await dbConnect()
    await PortfolioItem.findByIdAndDelete(id)
    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    throw new Error('Failed to delete item')
  }
}

export async function getPortfolioItems(pillar?: string) {
  try {
    await dbConnect()
    const query = pillar ? { pillar } : {}
    const items = await PortfolioItem.find(query).sort({ createdAt: -1 })
    
    return items.map(item => ({
      id: item._id.toString(),
      pillar: item.pillar,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      price: item.price,
      tags: item.tags,
      rating: item.rating,
      reviews: item.reviews,
    })) as PortfolioItemData[]
  } catch (error) {
    console.error('Error getting portfolio items:', error)
    if (pillar === 'crochet') {
      return [
        { id: 'fb1', pillar: 'crochet', title: 'Chunky Hand-Knit Throw', imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop', category: 'blankets', price: 1200, tags: ['blanket', 'chunky'], rating: 5, reviews: 14 },
        { id: 'fb2', pillar: 'crochet', title: 'Summer Boho Tote Bag', imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop', category: 'bags', price: 650, tags: ['bag', 'summer'], rating: 5, reviews: 8 },
        { id: 'fb3', pillar: 'crochet', title: 'Granny Square Crop Top', imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop', category: 'tops', price: 450, tags: ['top', 'vintage'], rating: 4.8, reviews: 22 },
        { id: 'fb4', pillar: 'crochet', title: 'Plush Baby Bear Beanie', imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', category: 'baby', price: 200, tags: ['baby', 'beanie'], rating: 5, reviews: 31 },
        { id: 'fb5', pillar: 'crochet', title: 'Textured Throw Pillow', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop', category: 'home_decor', price: 350, tags: ['home', 'pillow'], rating: 4.9, reviews: 11 },
      ] as PortfolioItemData[]
    }
    return []
  }
}
