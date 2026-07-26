import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  displayName: { type: String, required: true },
  photoURL: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: { type: String },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  nickname: { type: String },
  website: { type: String },
  telegram: { type: String },
  whatsapp: { type: String },
  bio: { type: String },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
