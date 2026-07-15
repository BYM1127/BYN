import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  displayName: { type: String, required: true },
  photoURL: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: { type: String },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
