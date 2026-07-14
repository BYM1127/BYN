import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json()

    if (!resend) {
      console.warn('RESEND_API_KEY not found. Email not sent.', { to, subject })
      return NextResponse.json({ success: true, mocked: true })
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'BYM Studio <hello@bymstudio.co>',
      to: process.env.EMAIL_DEV_OVERRIDE_TO ? [process.env.EMAIL_DEV_OVERRIDE_TO] : (Array.isArray(to) ? to : [to]),
      replyTo: process.env.EMAIL_REPLY_TO || 'hello@bymstudio.co',
      subject,
      html,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
