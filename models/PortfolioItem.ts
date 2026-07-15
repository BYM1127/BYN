import mongoose from 'mongoose'

const PortfolioItemSchema = new mongoose.Schema({
  pillar: { type: String, enum: ['crochet', 'photography', 'webdesign', 'gallery'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number },
  tags: [{ type: String }],
  rating: { type: Number },
  reviews: { type: Number },
}, { timestamps: true })

export default mongoose.models.PortfolioItem || mongoose.model('PortfolioItem', PortfolioItemSchema)
