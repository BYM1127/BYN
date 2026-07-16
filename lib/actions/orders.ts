'use server'

import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import User from '@/models/User'
import { revalidatePath } from 'next/cache'
import { sendEmail } from '@/lib/resend'

export type OrderStatus = 'pending_review' | 'quoted' | 'accepted' | 'deposit_paid' | 'in_production' | 'ready' | 'delivered' | 'confirmed' | 'reviewing' | 'completed' | 'cancelled'

async function notifyUser(userId: string, subject: string, html: string) {
  try {
    const user = await User.findById(userId);
    if (user && user.email) {
      await sendEmail({ to: user.email, subject, html });
    }
  } catch(e) { console.error('Email error:', e) }
}

export async function submitCrochetOrder(userId: string, data: any) {
  try {
    await dbConnect()
    const doc = await Order.create({
      userId,
      pillar: 'crochet',
      status: 'pending_review',
      data,
    })
    
    await notifyUser(
      userId, 
      "Your Crochet Order has been received! - BYM Studio", 
      `<h1>Thank you for your order!</h1><p>We've received your crochet request and will review it shortly. Your order ID is ${doc._id}.</p>`
    );
    
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
    
    await notifyUser(
      userId, 
      "Your Photography Booking Request - BYM Studio", 
      `<h1>Booking Request Received!</h1><p>We've received your photography booking request and will get back to you soon to confirm the details.</p>`
    );

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
    
    await notifyUser(
      userId, 
      "Your Web Design Enquiry - BYM Studio", 
      `<h1>Enquiry Received!</h1><p>Thank you for reaching out about your web design project. We will review your requirements and respond shortly.</p>`
    );

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
    const order = await Order.findByIdAndUpdate(orderId, { status })
    if (order && order.userId) {
      await notifyUser(
        order.userId.toString(),
        "Order Status Update - BYM Studio",
        `<h1>Update on your order</h1><p>Your order status has been updated to: <strong>${status.replace('_', ' ').toUpperCase()}</strong>.</p>`
      );
    }
    revalidatePath('/admin')
  } catch (error) {
    console.error('Error updating order status:', error)
    throw new Error('Failed to update order status')
  }
}
