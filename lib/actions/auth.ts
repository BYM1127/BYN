'use server'

import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function registerUser(email: string, password: string, displayName: string) {
  try {
    await dbConnect()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { error: 'Email already in use' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    await User.create({
      email,
      password: hashedPassword,
      displayName,
      role: 'user',
    })

    return { success: true }
  } catch (error: any) {
    console.error('Registration error:', error)
    return { error: error.message || 'Something went wrong during registration' }
  }
}
