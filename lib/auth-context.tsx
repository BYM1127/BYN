'use client'

import {
  createContext,
  useContext,
  type ReactNode,
} from 'react'
import { SessionProvider, useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react'
import { registerUser } from '@/lib/actions/auth'

export type UserRole = 'user' | 'admin'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: UserRole
  phone?: string
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export function useAuth() {
  const { data: session, status } = useSession()

  const loading = status === 'loading'

  const user = session?.user ? {
    uid: (session.user as any).id as string,
    email: session.user.email as string,
    displayName: session.user.name as string,
    role: (session.user as any).role as UserRole,
  } : null

  const signIn = async (email: string, password: string) => {
    const res = await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (res?.error) {
      throw new Error(res.error)
    }
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    const res = await registerUser(email, password, displayName)
    if (res.error) {
      throw new Error(res.error)
    }
    // Automatically sign in after sign up
    await signIn(email, password)
  }

  const signOut = async () => {
    await nextAuthSignOut()
  }

  return {
    user,
    profile: user,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: user?.role === 'admin',
  }
}
