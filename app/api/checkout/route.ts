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

    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const totalAmount = subtotal + shippingCost

    const order = await Order.create({
      userId: null,
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

    const payfastParams: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id=${order._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/payment`,
      name_first: shippingAddress.firstName || 'Customer',
      m_payment_id: order._id.toString(),
      amount: totalAmount.toFixed(2),
      item_name: `Order ${order._id.toString().slice(-6)} from BYM Studio`,
    }

    // Include optional fields only if they have a value
    if (shippingAddress.lastName) payfastParams.name_last = shippingAddress.lastName;
    if (shippingAddress.email) payfastParams.email_address = shippingAddress.email;

    // Generate MD5 Signature for PayFast (MUST be alphabetically sorted)
    const sortedKeys = Object.keys(payfastParams).sort()
    let getString = ''
    for (const key of sortedKeys) {
      if (payfastParams[key] !== '') {
        getString += `${key}=${encodeURIComponent(payfastParams[key].trim()).replace(/%20/g, '+')}&`
      }
    }
    
    // Append passphrase if it exists
    if (process.env.PAYFAST_PASSPHRASE) {
      getString += `passphrase=${encodeURIComponent(process.env.PAYFAST_PASSPHRASE.trim()).replace(/%20/g, '+')}`
    } else {
      getString = getString.slice(0, -1) // remove trailing &
    }

    const signature = crypto.createHash('md5').update(getString).digest('hex')
    payfastParams.signature = signature

    // We return the fields to the frontend so it can construct and submit the POST form
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
