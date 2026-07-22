import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., 'bags', 'blankets'
  imageUrl: { type: String, required: true },
  images: [{ type: String }], // additional gallery images
  stockQuantity: { type: Number, required: true, default: 0 },
  weightGrams: { type: Number, required: true, default: 0 }, // For shipping calculations
  sku: { type: String, unique: true, sparse: true },
  isPublished: { type: Boolean, default: true },
  tags: [{ type: String }],
  variations: [{
    name: String, // e.g., 'Size', 'Color'
    options: [String] // e.g., ['Small', 'Medium', 'Large']
  }]
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
