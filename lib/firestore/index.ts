import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'

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
