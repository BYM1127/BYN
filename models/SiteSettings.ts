import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema({
  heroTagline: { type: String },
  heroTitle: { type: String },
  heroSubtitle: { type: String },
  contactEmail: { type: String },
  aboutText: { type: String },
}, { timestamps: true })

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)
