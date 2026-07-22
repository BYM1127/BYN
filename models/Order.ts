import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pillar: { type: String, enum: ['crochet', 'photography', 'webdesign'], required: true },
  
  // E-commerce specific fields
  lineItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String,
    quantity: Number,
    price: Number,
    variations: mongoose.Schema.Types.Mixed
  }],
  subtotal: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  
  shippingAddress: {
    fullName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  payfastToken: { type: String }, // For tracking PayFast ITN payments
  
  status: { type: String, required: true, default: 'pending' }, // e.g., pending, processing, shipped, delivered, pending_review (for custom orders)
  data: { type: mongoose.Schema.Types.Mixed }, // flexible JSON payload for old inquiry forms
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
