import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'

export type OrderStatus = 'pending_review' | 'quoted' | 'accepted' | 'deposit_paid' | 'in_production' | 'ready' | 'delivered' | 'confirmed' | 'reviewing' | 'completed' | 'cancelled'

export async function submitCrochetOrder(userId: string, data: any) {
  if (!db) throw new Error('Firebase is not initialized')
  const ordersRef = collection(db, 'orders')
  const docRef = await addDoc(ordersRef, {
    userId,
    pillar: 'crochet',
    status: 'pending_review',
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function submitPhotographyBooking(userId: string, data: any) {
  if (!db) throw new Error('Firebase is not initialized')
  const ordersRef = collection(db, 'orders')
  const docRef = await addDoc(ordersRef, {
    userId,
    pillar: 'photography',
    status: 'pending_review',
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function submitWebDesignEnquiry(userId: string, data: any) {
  if (!db) throw new Error('Firebase is not initialized')
  const ordersRef = collection(db, 'orders')
  const docRef = await addDoc(ordersRef, {
    userId,
    pillar: 'webdesign',
    status: 'pending_review',
    data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getUserOrders(userId: string) {
  if (!db) throw new Error('Firebase is not initialized')
  const ordersRef = collection(db, 'orders')
  const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getAllOrders() {
  if (!db) throw new Error('Firebase is not initialized')
  const ordersRef = collection(db, 'orders')
  const q = query(ordersRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  if (!db) throw new Error('Firebase is not initialized')
  const orderRef = doc(db, 'orders', orderId)
  await updateDoc(orderRef, {
    status,
    updatedAt: serverTimestamp(),
  })
}

// --- PORTFOLIO & SHOP CMS ---

export interface PortfolioItem {
  id?: string
  pillar: 'crochet' | 'photography' | 'webdesign' | 'gallery'
  title: string
  description?: string
  imageUrl: string
  category: string
  price?: number
  tags: string[]
  rating?: number
  reviews?: number
  createdAt?: any
  updatedAt?: any
}

export async function addPortfolioItem(data: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) throw new Error('Firebase is not initialized')
  const ref = collection(db, 'portfolio_items')
  const docRef = await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updatePortfolioItem(id: string, data: Partial<PortfolioItem>) {
  if (!db) throw new Error('Firebase is not initialized')
  const ref = doc(db, 'portfolio_items', id)
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deletePortfolioItem(id: string) {
  if (!db) throw new Error('Firebase is not initialized')
  const ref = doc(db, 'portfolio_items', id)
  await deleteDoc(ref)
}

export async function getPortfolioItems(pillar?: string) {
  if (!db) {
    console.warn('Firebase is not initialized. Returning empty portfolio items.')
    return []
  }
  const ref = collection(db, 'portfolio_items')
  
  let q
  if (pillar) {
    q = query(ref, where('pillar', '==', pillar), orderBy('createdAt', 'desc'))
  } else {
    q = query(ref, orderBy('createdAt', 'desc'))
  }
  
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem))
}
