import dbConnect from '@/lib/db'
import ActivityLog from '@/models/ActivityLog'

type ActionType = 'LOGIN' | 'REGISTER' | 'ORDER' | 'WHATSAPP_CONTACT' | 'EMAIL_CONTACT'

export async function logActivity(action: ActionType, user: string = 'Guest', details?: string) {
  try {
    await dbConnect()
    await ActivityLog.create({
      action,
      user,
      details,
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}
