import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

export interface SiteSettings {
  heroTagline?: string
  heroTitle?: string
  heroSubtitle?: string
  contactEmail?: string
  aboutText?: string
  updatedAt?: any
}

const SETTINGS_DOC_ID = 'global'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!db) {
    console.warn('Firebase is not initialized. Falling back to default site settings.')
    return null
  }
  try {
    const docRef = doc(db, 'site_settings', SETTINGS_DOC_ID)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return snapshot.data() as SiteSettings
    }
    return null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export async function updateSiteSettings(data: SiteSettings) {
  if (!db) throw new Error('Firebase is not initialized')
  const docRef = doc(db, 'site_settings', SETTINGS_DOC_ID)
  await setDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true })
}
