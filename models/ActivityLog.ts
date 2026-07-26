import mongoose from 'mongoose'

const ActivityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['LOGIN', 'REGISTER', 'ORDER', 'WHATSAPP_CONTACT', 'EMAIL_CONTACT'],
    },
    user: {
      type: String,
      default: 'Guest',
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema)
