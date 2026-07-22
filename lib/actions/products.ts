'use server'

import dbConnect from '@/lib/db'
import Product from '@/models/Product'

export interface ProductData {
  id?: string
  title: string
  description?: string
  imageUrl: string
  category: string
  price: number
  tags: string[]
  rating?: number
  reviews?: number
  stockQuantity: number
  sku?: string
  isPublished: boolean
}

export async function getProducts() {
  try {
    await dbConnect()
    const items = await Product.find({ isPublished: true }).sort({ createdAt: -1 }).lean()
    
    return items.map((item: any) => ({
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      price: item.price,
      tags: item.tags,
      rating: item.rating,
      reviews: item.reviews,
      stockQuantity: item.stockQuantity,
      sku: item.sku,
      isPublished: item.isPublished
    })) as ProductData[]
  } catch (error) {
    console.error('Error getting products:', error)
    return [
      { id: 'prod1', title: 'Chunky Hand-Knit Throw Blanket', description: 'Cozy throw blanket', imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop', category: 'blankets', price: 1200, tags: ['blanket', 'chunky'], stockQuantity: 5, isPublished: true },
    ] as ProductData[]
  }
}

export async function getProductById(id: string) {
  try {
    await dbConnect()
    const item = await Product.findById(id).lean()
    if (!item) return null
    return {
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      price: item.price,
      tags: item.tags,
      stockQuantity: item.stockQuantity,
      weightGrams: item.weightGrams,
      sku: item.sku,
      isPublished: item.isPublished,
    } as any
  } catch (error) {
    console.error('Error getting product by id:', error)
    return null
  }
}

export async function createProduct(data: any) {
  try {
    await dbConnect()
    const doc = await Product.create(data)
    return { success: true, id: doc._id.toString() }
  } catch (error: any) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await dbConnect()
    await Product.findByIdAndUpdate(id, data)
    return { success: true }
  } catch (error: any) {
    console.error('Error updating product:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteProduct(id: string) {
  try {
    await dbConnect()
    await Product.findByIdAndDelete(id)
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }
}
