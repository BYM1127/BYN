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
    return []
  }
}
