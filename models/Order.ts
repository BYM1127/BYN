import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pillar: { type: String, enum: ['crochet', 'photography', 'webdesign'], required: true },
  status: { type: String, required: true, default: 'pending_review' },
  data: { type: mongoose.Schema.Types.Mixed }, // flexible JSON payload for different form types
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
