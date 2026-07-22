'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string // Can be productId or a unique ID based on variations
  productId: string
  title: string
  price: number
  quantity: number
  imageUrl: string
  variations?: { [key: string]: string }
  weightGrams?: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('bym_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart')
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to local storage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('bym_cart', JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === newItem.id)
      if (existing) {
        return prev.map(item => 
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        )
      }
      return [...prev, newItem]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, isCartOpen, setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
