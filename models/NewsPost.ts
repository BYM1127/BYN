import mongoose from 'mongoose'

const NewsPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  imageUrl: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, { timestamps: true })

export default mongoose.models.NewsPost || mongoose.model('NewsPost', NewsPostSchema)
