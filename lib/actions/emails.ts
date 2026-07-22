'use server'

import { sendEmail } from '@/lib/resend'

export async function sendOrderConfirmation(order: any) {
  const customerEmail = order.shippingAddress?.email || order.userId?.email
  const orderId = order._id?.toString().slice(-6).toUpperCase()

  if (!customerEmail) {
    console.error('Cannot send order confirmation: No customer email provided.')
    return { success: false }
  }

  const itemsListHtml = order.lineItems.map((item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.title}</strong><br/>
        <small style="color: #666;">Qty: ${item.quantity}</small>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        R${item.price * item.quantity}
      </td>
    </tr>
  `).join('')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #111;">Order Confirmed!</h1>
        <p style="font-size: 16px;">Thank you for shopping at BYM Studio.</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2 style="margin-top: 0; font-size: 18px;">Order #${orderId}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${itemsListHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; text-align: right; font-weight: bold;">Subtotal:</td>
              <td style="padding: 10px; text-align: right;">R${order.subtotal}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: right; font-weight: bold;">Shipping:</td>
              <td style="padding: 10px; text-align: right;">R${order.shippingCost}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px;">R${order.totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="padding: 20px 0;">
        <h3 style="font-size: 16px;">Shipping Address:</h3>
        <p style="margin: 0; line-height: 1.5;">
          ${order.shippingAddress?.fullName}<br/>
          ${order.shippingAddress?.addressLine1}<br/>
          ${order.shippingAddress?.city}, ${order.shippingAddress?.province}<br/>
          ${order.shippingAddress?.postalCode}
        </p>
      </div>
      
      <div style="text-align: center; padding: 20px; font-size: 12px; color: #888;">
        <p>If you have any questions, simply reply to this email.</p>
        <p>BYM Studio</p>
      </div>
    </div>
  `

  // Send to Customer
  const customerResult = await sendEmail({
    to: customerEmail,
    subject: `Order Confirmation #${orderId} - BYM Studio`,
    html,
  })

  // Send Notification to Admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || 'hello@bym-studio.com',
    subject: `🛒 New Order Received: #${orderId} — R${order.totalAmount}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 2px solid #d4af37; border-radius: 12px; overflow: hidden;">
        <div style="background: #111; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0; font-size: 22px;">💰 New Order — Action Required</h1>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 18px; font-weight: bold;">Order <span style="color: #d4af37;">#${orderId}</span> — <span style="color: #22c55e;">R${order.totalAmount}</span></p>
          <p><strong>Customer:</strong> ${order.shippingAddress?.fullName}<br/>
             <strong>Email:</strong> ${customerEmail}<br/>
             <strong>Address:</strong> ${order.shippingAddress?.addressLine1}, ${order.shippingAddress?.city}</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
            ${order.lineItems.map((item: any) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px;">${item.title} × ${item.quantity}</td>
                <td style="padding: 8px; text-align: right; font-weight: bold;">R${item.price * item.quantity}</td>
              </tr>`).join('')}
          </table>
          <p style="margin-top: 16px; font-size: 16px;"><strong>Total: R${order.totalAmount}</strong></p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://bym-studio.vercel.app'}/admin/orders" 
             style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #d4af37; color: #111; text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Order in Admin →
          </a>
        </div>
      </div>`,
  })

  return customerResult
}

export async function sendPhotographyBookingNotification(form: {
  name: string
  email: string
  phone: string
  packageId: string
  preferredDate: string
  alternativeDate: string
  location: string
  addOns: string[]
  specialRequests: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || 'hello@bym-studio.com'

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 2px solid #3da58a; border-radius: 12px; overflow: hidden;">
      <div style="background: #111; padding: 20px; text-align: center;">
        <h1 style="color: #3da58a; margin: 0; font-size: 22px;">📷 New Photography Booking Request</h1>
      </div>
      <div style="padding: 24px;">
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${form.email}">${form.email}</a></p>
        <p><strong>Phone:</strong> ${form.phone || 'Not provided'}</p>
        <p><strong>Package:</strong> ${form.packageId}</p>
        <p><strong>Preferred Date:</strong> ${form.preferredDate}</p>
        <p><strong>Alternative Date:</strong> ${form.alternativeDate || 'None'}</p>
        <p><strong>Location:</strong> ${form.location || 'Not specified'}</p>
        <p><strong>Add-Ons:</strong> ${form.addOns.length ? form.addOns.join(', ') : 'None'}</p>
        <p><strong>Special Requests:</strong> ${form.specialRequests || 'None'}</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://bym-studio.vercel.app'}/admin" 
           style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #3da58a; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Open Admin Dashboard →
        </a>
      </div>
    </div>`

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: #111; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #3da58a; margin: 0;">Booking Request Received! 📷</h1>
      </div>
      <div style="padding: 24px; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
        <p>Hi <strong>${form.name}</strong>,</p>
        <p>Thanks for your photography booking request! I've received your request for the <strong>${form.packageId}</strong> package on <strong>${form.preferredDate}</strong> and will confirm your session within 24 hours.</p>
        <p>If you have any urgent questions, simply reply to this email.</p>
        <p style="margin-top: 24px;">With love,<br/><strong>BYM Studio</strong></p>
      </div>
    </div>`

  await Promise.all([
    sendEmail({ to: adminEmail, subject: `📷 New Photography Booking — ${form.name} (${form.packageId})`, html: adminHtml }),
    sendEmail({ to: form.email, subject: `Booking Request Received — BYM Studio Photography`, html: customerHtml }),
  ])
}

export async function sendWebEnquiryNotification(form: {
  name: string
  email: string
  phone: string
  businessName: string
  tier: string
  budget: string
  timeline: string
  description: string
  referenceUrl1: string
  referenceUrl2: string
  features: string[]
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || 'hello@bym-studio.com'

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 2px solid #8b5cf6; border-radius: 12px; overflow: hidden;">
      <div style="background: #111; padding: 20px; text-align: center;">
        <h1 style="color: #8b5cf6; margin: 0; font-size: 22px;">💻 New Web Design Enquiry</h1>
      </div>
      <div style="padding: 24px;">
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${form.email}">${form.email}</a></p>
        <p><strong>Phone:</strong> ${form.phone || 'Not provided'}</p>
        <p><strong>Business:</strong> ${form.businessName || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${form.tier}</p>
        <p><strong>Budget:</strong> ${form.budget}</p>
        <p><strong>Timeline:</strong> ${form.timeline}</p>
        <p><strong>Features Needed:</strong> ${form.features.length ? form.features.join(', ') : 'None selected'}</p>
        <p><strong>Description:</strong><br/>${form.description}</p>
        ${form.referenceUrl1 ? `<p><strong>Reference 1:</strong> <a href="${form.referenceUrl1}">${form.referenceUrl1}</a></p>` : ''}
        ${form.referenceUrl2 ? `<p><strong>Reference 2:</strong> <a href="${form.referenceUrl2}">${form.referenceUrl2}</a></p>` : ''}
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://bym-studio.vercel.app'}/admin" 
           style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #8b5cf6; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Open Admin Dashboard →
        </a>
      </div>
    </div>`

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: #111; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #8b5cf6; margin: 0;">Project Enquiry Received! 💻</h1>
      </div>
      <div style="padding: 24px; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
        <p>Hi <strong>${form.name}</strong>,</p>
        <p>Thank you for reaching out! I've received your web design enquiry for a <strong>${form.tier}</strong> project and will send you a free, no-obligation quote within 24 hours.</p>
        <p>If you have any urgent questions, simply reply to this email.</p>
        <p style="margin-top: 24px;">With love,<br/><strong>BYM Studio</strong></p>
      </div>
    </div>`

  await Promise.all([
    sendEmail({ to: adminEmail, subject: `💻 New Web Enquiry — ${form.name} (${form.tier})`, html: adminHtml }),
    sendEmail({ to: form.email, subject: `Project Enquiry Received — BYM Studio Web Design`, html: customerHtml }),
  ])
}

