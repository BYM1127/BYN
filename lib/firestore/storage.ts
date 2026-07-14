import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  if (!storage) throw new Error('Firebase Storage is not initialized')
  
  // Generate a unique filename using UUID and original extension
  const ext = file.name.split('.').pop()
  const filename = `${uuidv4()}.${ext}`
  const storageRef = ref(storage, `${folder}/${filename}`)
  
  // Upload the file
  const snapshot = await uploadBytes(storageRef, file)
  
  // Get the public download URL
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}
