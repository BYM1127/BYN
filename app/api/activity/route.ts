import { NextResponse } from 'next/server'
import { logActivity } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    const { action, user, details } = await req.json()

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 })
    }

    await logActivity(action, user || 'Guest', details)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Activity Logging Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
