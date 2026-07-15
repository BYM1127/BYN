'use server'

import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import { revalidatePath } from 'next/cache'

export type OrderStatus = 'pending_review' | 'quoted' | 'accepted' | 'deposit_paid' | 'in_production' | 'ready' | 'delivered' | 'confirmed' | 'reviewing' | 'completed' | 'cancelled'

export async function submitCrochetOrder(userId: string, data: any) {
  try {
    await dbConnect()
    const doc = await Order.create({
      userId,
      pillar: 'crochet',
      status: 'pending_review',
      data,
    })
    return doc._id.toString()
  } catch (error) {
    console.error('Error submitting order:', error)
    throw new Error('Failed to submit order')
  }
}

export async function submitPhotographyBooking(userId: string, data: any) {
  try {
    await dbConnect()
    const doc = await Order.create({
      userId,
      pillar: 'photography',
      status: 'pending_review',
      data,
    })
    return doc._id.toString()
  } catch (error) {
    console.error('Error submitting order:', error)
    throw new Error('Failed to submit order')
  }
}

export async function submitWebDesignEnquiry(userId: string, data: any) {
  try {
    await dbConnect()
    const doc = await Order.create({
      userId,
      pillar: 'webdesign',
      status: 'pending_review',
      data,
    })
    return doc._id.toString()
  } catch (error) {
    console.error('Error submitting order:', error)
    throw new Error('Failed to submit order')
  }
}

export async function getUserOrders(userId: string) {
  try {
    await dbConnect()
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).populate('userId', 'email displayName')
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.error('Error getting user orders:', error)
    return []
  }
}

export async function getAllOrders() {
  try {
    await dbConnect()
    const orders = await Order.find().sort({ createdAt: -1 }).populate('userId', 'email displayName')
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.error('Error getting all orders:', error)
    return []
  }
}

export async function getOrdersByPillar(pillar: string) {
  try {
    await dbConnect()
    const orders = await Order.find({ pillar }).sort({ createdAt: -1 }).populate('userId', 'email displayName')
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.error('Error getting orders by pillar:', error)
    return []
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    await dbConnect()
    await Order.findByIdAndUpdate(orderId, { status })
    revalidatePath('/admin')
  } catch (error) {
    console.error('Error updating order status:', error)
    throw new Error('Failed to update order status')
  }
}
