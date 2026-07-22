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
    to: process.env.EMAIL_FROM || 'hello@bym-studio.com', // Replace with admin email
    subject: `New Order Received: #${orderId}`,
    html: `<p>You have received a new order for R${order.totalAmount}.</p><br/>${html}`,
  })

  return customerResult
}
