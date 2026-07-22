import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, shippingAddress, shippingCost } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    await dbConnect()

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const totalAmount = subtotal + shippingCost

    // Create a pending order in the database
    const order = await Order.create({
      userId: null, // If user is logged in, attach their ID here via auth context server-side
      pillar: 'crochet', 
      status: 'pending',
      paymentStatus: 'pending',
      lineItems: items.map((item: any) => ({
        productId: item.productId,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        variations: item.variations
      })),
      subtotal,
      shippingCost,
      totalAmount,
      shippingAddress,
    })

    // --- PAYFAST INTEGRATION ---
    const payfastParams: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id=${order._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/payment`,
      name_first: shippingAddress.firstName || 'Customer',
      name_last: shippingAddress.lastName || '',
      email_address: shippingAddress.email || 'customer@example.com',
      m_payment_id: order._id.toString(),
      amount: totalAmount.toFixed(2),
      item_name: `Order ${order._id.toString().slice(-6)} from BYM Studio`,
    }

    // Generate MD5 Signature for PayFast
    let getString = ''
    for (const key in payfastParams) {
      getString += `${key}=${encodeURIComponent(payfastParams[key].trim()).replace(/%20/g, '+')}&`
    }
    
    // Append passphrase if it exists
    if (process.env.PAYFAST_PASSPHRASE) {
      getString += `passphrase=${encodeURIComponent(process.env.PAYFAST_PASSPHRASE.trim()).replace(/%20/g, '+')}`
    } else {
      getString = getString.slice(0, -1)
    }

    const signature = crypto.createHash('md5').update(getString).digest('hex')
    payfastParams.signature = signature

    // We return the fields to the frontend so it can construct and submit the form
    return NextResponse.json({ 
      provider: 'payfast',
      url: process.env.PAYFAST_URL!,
      fields: payfastParams 
    })
    
  } catch (error: any) {
    console.error('Checkout API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
