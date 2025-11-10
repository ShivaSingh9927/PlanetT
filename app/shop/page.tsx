"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Heart, ChevronDown, Filter } from "lucide-react"

const PRODUCTS = [
  { id: 1, name: "Premium Leather Jacket", price: 249.99, category: "Jackets", image: "/black-leather-men-jacket.jpg" },
  { id: 2, name: "Classic Denim Jeans", price: 99.99, category: "Jeans", image: "/dark-blue-denim-jeans.jpg" },
  { id: 3, name: "Cotton Crew Shirt", price: 49.99, category: "Shirts", image: "/white-cotton-men-shirt.jpg" },
  { id: 4, name: "Wool Blazer", price: 299.99, category: "Jackets", image: "/black-wool-blazer.jpg" },
  { id: 5, name: "Slim Fit Jeans", price: 89.99, category: "Jeans", image: "/blue-slim-jeans.jpg" },
  { id: 6, name: "Linen Shirt", price: 59.99, category: "Shirts", image: "/beige-linen-shirt.jpg" },
  { id: 7, name: "Leather Bomber", price: 279.99, category: "Jackets", image: "/brown-leather-bomber.jpg" },
  { id: 8, name: "Black Chinos", price: 79.99, category: "Pants", image: "/black-chinos.jpg" },
  { id: 9, name: "Oxford Shirt", price: 69.99, category: "Shirts", image: "/white-oxford-shirt.jpg" },
]

const CATEGORIES = ["All", "Jackets", "Jeans", "Shirts", "Pants"]
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200+", min: 200, max: Number.POSITIVE_INFINITY },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const priceRange = PRICE_RANGES[selectedPrice]
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max
      return categoryMatch && priceMatch
    })
  }, [selectedCategory, selectedPrice])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
              PLANET T
            </Link>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-foreground rounded-sm hover:bg-gray-200 transition-colors"
            >
              <Filter size={18} />
              <span className="text-sm hidden sm:inline">Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-sm space-y-4 mb-4">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 rounded-sm text-xs sm:text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-black text-white"
                          : "bg-white text-foreground border border-gray-200 hover:border-black"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Price</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="price"
                        value={idx}
                        checked={selectedPrice === idx}
                        onChange={() => setSelectedPrice(idx)}
                        className="cursor-pointer"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Shop</h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            {filteredProducts.length} of {PRODUCTS.length}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="relative bg-gray-100 rounded-sm overflow-hidden mb-3 aspect-square flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(product.id)
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      size={18}
                      className={`${favorites.includes(product.id) ? "fill-gray-900 text-gray-900" : "text-gray-900"}`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">{product.name}</h3>
                <p className="text-gray-900 font-bold text-sm">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("All")
                setSelectedPrice(0)
              }}
              className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-900 transition-colors text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
