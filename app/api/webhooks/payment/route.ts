import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import { sendOrderConfirmation } from '@/lib/actions/emails'

export async function POST(req: Request) {
  try {
    // PayFast ITN sends application/x-www-form-urlencoded
    const bodyText = await req.text()
    const searchParams = new URLSearchParams(bodyText)
    
    const payfastData: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      payfastData[key] = value
    })

    // 1. Validate the ITN payload with PayFast by posting it straight back
    const validationRes = await fetch(process.env.PAYFAST_VALIDATION_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyText
    })

    const validationText = await validationRes.text()
    
    // 2. Process Order if Valid and COMPLETE
    if (validationText === 'VALID' && payfastData.payment_status === 'COMPLETE') {
      await dbConnect()
      const orderId = payfastData.m_payment_id
      
      const order = await Order.findById(orderId)
      if (order && order.paymentStatus !== 'paid') {
        order.paymentStatus = 'paid'
        order.status = 'processing'
        order.payfastToken = payfastData.pf_payment_id
        await order.save()

        // Send Order Confirmation Email via Resend
        await sendOrderConfirmation(order)
      }
    }
    
    // PayFast expects an empty 200 OK response
    return new NextResponse('', { status: 200 })
  } catch (error: any) {
    console.error('PayFast Webhook Error:', error)
    return new NextResponse('Error', { status: 400 })
  }
}
