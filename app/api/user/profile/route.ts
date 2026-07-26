import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const user = await User.findById(userId)
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({
      id: user._id,
      email: user.email,
      displayName: user.displayName,
      phone: user.phone,
      role: user.role,
      photoURL: user.photoURL,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      website: user.website,
      telegram: user.telegram,
      whatsapp: user.whatsapp,
      bio: user.bio,
      createdAt: user.createdAt
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { 
      displayName, phone, username, firstName, lastName, 
      nickname, website, telegram, whatsapp, bio, photoURL 
    } = body

    if (!displayName) {
      return NextResponse.json({ error: 'Display name is required' }, { status: 400 })
    }

    await dbConnect()

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          displayName,
          phone,
          username,
          firstName,
          lastName,
          nickname,
          website,
          telegram,
          whatsapp,
          bio,
          photoURL
        } 
      },
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        phone: updatedUser.phone,
        role: updatedUser.role,
        photoURL: updatedUser.photoURL,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        nickname: updatedUser.nickname,
        website: updatedUser.website,
        telegram: updatedUser.telegram,
        whatsapp: updatedUser.whatsapp,
        bio: updatedUser.bio
      }
    })

  } catch (error: any) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
