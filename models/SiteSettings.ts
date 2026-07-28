import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema({
  heroTagline: { type: String },
  heroTitle: { type: String },
  heroSubtitle: { type: String },
  contactEmail: { type: String },
  aboutText: { type: String },
  instagramUrl: { type: String },
  tiktokUrl: { type: String },
  facebookUrl: { type: String },
  whatsappNumber: { type: String },
}, { timestamps: true })

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)
