"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type CartItem = {
  id: string | number
  name?: string
  price?: number
  qty?: number
  meta?: any
}

type StoreState = {
  cart: CartItem[]
  wishlist: Array<string | number>
  cartCount: number
  wishlistCount: number
  addToCart: (item: CartItem, qty?: number) => void
  removeFromCart: (id: string | number) => void
  setQty: (id: string | number, qty: number) => void
  toggleWishlist: (id: string | number) => void
  isInWishlist: (id: string | number) => boolean
  clearCart: () => void
}

const StoreContext = createContext<StoreState | undefined>(undefined)

const LOCAL_KEY = "planet_t_store_v1"

function readFromLocal() {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(LOCAL_KEY) : null
    if (!raw) return { cart: [], wishlist: [] }
    return JSON.parse(raw)
  } catch {
    return { cart: [], wishlist: [] }
  }
}

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initial = readFromLocal()
  const [cart, setCart] = useState<CartItem[]>(initial.cart ?? [])
  const [wishlist, setWishlist] = useState<Array<string | number>>(initial.wishlist ?? [])

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify({ cart, wishlist }))
    } catch (e) {
      // ignore
    }
  }, [cart, wishlist])

  const addToCart = (item: CartItem, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => String(p.id) === String(item.id))
      if (found) {
        return prev.map((p) => (String(p.id) === String(item.id) ? { ...p, qty: (p.qty ?? 1) + qty } : p))
      }
      return [...prev, { ...item, qty }]
    })
  }

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((p) => String(p.id) !== String(id)))
  }

  const setQty = (id: string | number, qty: number) => {
    setCart((prev) => prev.map((p) => (String(p.id) === String(id) ? { ...p, qty } : p)))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (id: string | number) => {
    setWishlist((prev) => {
      const s = prev.map(String)
      if (s.includes(String(id))) return prev.filter((x) => String(x) !== String(id))
      return [...prev, id]
    })
  }

  const isInWishlist = (id: string | number) => wishlist.map(String).includes(String(id))

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((s, it) => s + (it.qty ?? 1), 0),
      wishlistCount: wishlist.length,
      addToCart,
      removeFromCart,
      setQty,
      toggleWishlist,
      isInWishlist,
      clearCart,
    }),
    [cart, wishlist]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used inside StoreProvider")
  return ctx
}
