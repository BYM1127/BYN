import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, ...form } = body

    const adminEmail = 'bokasyarnmarket@gmail.com'

    let subject = ''
    let html = ''

    if (type === 'photography') {
      subject = `📷 New Photography Booking — ${form.name}`
      html = `
        <h2>New Photography Booking Request</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Phone:</strong> ${form.phone || 'Not provided'}</p>
        <p><strong>Package:</strong> ${form.packageId}</p>
        <p><strong>Preferred Date:</strong> ${form.preferredDate}</p>
        <p><strong>Alternative Date:</strong> ${form.alternativeDate || 'None'}</p>
        <p><strong>Location:</strong> ${form.location || 'Not specified'}</p>
        <p><strong>Add-Ons:</strong> ${form.addOns?.length ? form.addOns.join(', ') : 'None'}</p>
        <p><strong>Special Requests:</strong> ${form.specialRequests || 'None'}</p>
      `
    } else if (type === 'webdesign') {
      subject = `💻 New Web Design Enquiry — ${form.name}`
      html = `
        <h2>New Web Design Enquiry</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Phone:</strong> ${form.phone || 'Not provided'}</p>
        <p><strong>Business:</strong> ${form.businessName || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${form.tier}</p>
        <p><strong>Budget:</strong> ${form.budget}</p>
        <p><strong>Timeline:</strong> ${form.timeline}</p>
        <p><strong>Features:</strong> ${form.features?.length ? form.features.join(', ') : 'None'}</p>
        <p><strong>Description:</strong><br/>${form.description}</p>
        ${form.referenceUrl1 ? `<p><strong>Reference 1:</strong> <a href="${form.referenceUrl1}">${form.referenceUrl1}</a></p>` : ''}
        ${form.referenceUrl2 ? `<p><strong>Reference 2:</strong> <a href="${form.referenceUrl2}">${form.referenceUrl2}</a></p>` : ''}
      `
    } else if (type === 'crochet') {
      subject = `🧶 New Crochet Custom Order — ${form.name}`
      html = `
        <h2>New Custom Crochet Order Request</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Phone:</strong> ${form.phone || 'Not provided'}</p>
        <p><strong>Piece Type:</strong> ${form.pieceType}</p>
        <p><strong>Stitch Style:</strong> ${form.stitchStyle}</p>
        <p><strong>Colours:</strong> ${form.colours?.join(', ') || 'None'}</p>
        <p><strong>Size:</strong> ${form.size}</p>
        <p><strong>Custom Size Note:</strong> ${form.customSizeNote || 'None'}</p>
        <p><strong>Vision/Inspiration:</strong><br/>${form.inspirationNote || 'None'}</p>
        <p><strong>Reference Link:</strong> ${form.referenceLink ? `<a href="${form.referenceLink}">${form.referenceLink}</a>` : 'None'}</p>
        ${form.referenceImage ? `<p><strong>Uploaded Reference Picture:</strong><br/><img src="${form.referenceImage}" style="max-width:400px; border-radius:8px; margin-top:8px;" alt="Customer Reference" /></p>` : ''}
        <p><strong>Customer Notes:</strong><br/>${form.customerNotes || 'None'}</p>
      `
    } else if (type === 'crochet_quote') {
      subject = `🧶 New Crochet Quote Request — ${form.fullName || form.name}`
      const itemsList = form.items?.map((item: any) => `<li>${item.title} (Qty: ${item.quantity}) — R${item.price * item.quantity}</li>`).join('') || ''
      html = `
        <h2>New Order Quote Request</h2>
        <p><strong>Customer Name:</strong> ${form.fullName || form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Phone:</strong> ${form.phone || 'Not provided'}</p>
        <p><strong>Delivery Address:</strong> ${form.addressLine1}, ${form.city}, ${form.province} ${form.postalCode}</p>
        <h3>Ordered Items:</h3>
        <ul>${itemsList}</ul>
        <p><strong>Items Total (Est.):</strong> R${form.cartTotal}</p>
      `
    } else {
      return NextResponse.json({ error: 'Unknown notification type' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — email not sent')
      return NextResponse.json({ success: true, mocked: true })
    }

    const { data, error } = await resend.emails.send({
      from: 'BYM Studio <onboarding@resend.dev>',
      to: adminEmail,
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ success: false, error }, { status: 500 })
    }

    console.log('Email sent:', data)
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Notify admin error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
