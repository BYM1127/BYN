'use server'

import dbConnect from '@/lib/db'
import SiteSettings from '@/models/SiteSettings'
import { revalidatePath } from 'next/cache'

export interface SiteSettingsData {
  heroTagline?: string
  heroTitle?: string
  heroSubtitle?: string
  contactEmail?: string
  aboutText?: string
  instagramUrl?: string
  tiktokUrl?: string
  facebookUrl?: string
  updatedAt?: any
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  try {
    await dbConnect()
    const settings = await SiteSettings.findOne()
    
    if (settings) {
      // Convert mongoose document to plain object for client components
      return JSON.parse(JSON.stringify(settings))
    }
    return null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export async function updateSiteSettings(data: SiteSettingsData) {
  try {
    await dbConnect()
    let settings = await SiteSettings.findOne()
    
    if (settings) {
      Object.assign(settings, data)
      await settings.save()
    } else {
      settings = await SiteSettings.create(data)
    }
    
    revalidatePath('/', 'layout') // Revalidate entire app
  } catch (error) {
    console.error('Error updating site settings:', error)
    throw new Error('Failed to update site settings')
  }
}
