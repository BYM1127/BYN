'use server'

import { put } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get('file') as File
  const folder = formData.get('folder') as string || 'general'
  
  if (!file) {
    throw new Error('No file provided')
  }

  const ext = file.name.split('.').pop()
  const filename = `${folder}/${uuidv4()}.${ext}`
  
  const blob = await put(filename, file, {
    access: 'public',
  })
  
  return blob.url
}
