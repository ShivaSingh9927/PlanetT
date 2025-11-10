"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { useStore } from "../context/CartWishlistContext"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { cartCount, wishlistCount } = useStore()

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
    setQuery("")
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="text-lg font-bold">
            PLANET T
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm">
            <Link href="/shop">Shop</Link>
            <Link href="/shop?category=Jackets">Jackets</Link>
            <Link href="/shop?category=Jeans">Jeans</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm w-48"
            />
            <button type="submit" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          <Link href="/search" className="p-2 hover:bg-gray-50 rounded">
            <Search size={20} />
          </Link>

          <Link href="/wishlist" className="relative p-2 hover:bg-gray-50 rounded">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-2 pt-3">
            <Link href="/shop" className="py-2">Shop</Link>
            <Link href="/shop?category=Jackets" className="py-2">Jackets</Link>
            <Link href="/shop?category=Jeans" className="py-2">Jeans</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
