"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingBag, ChevronLeft, Star } from "lucide-react"

// <-- ADDED: import the store hook (adjust path if your context folder is elsewhere)
import { useStore } from "../../../context/CartWishlistContext"

/**
 * PRODUCT / SIMILAR DATA (same as yours)
 * Keep these objects here (or move to a separate module if you prefer)
 */
const PRODUCT_DETAILS: { [key: number]: any } = {
  1: {
    name: "Premium Leather Jacket",
    price: 249.99,
    category: "Jackets",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-H1051IvHRl0rWlyJJZXeqrXo5EoWTW.png",
    angles: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-H1051IvHRl0rWlyJJZXeqrXo5EoWTW.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k7qK6mSR3DEouw3ujLSk18F4prx7qI.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eHh1NiJD3d1XQMyPfWbRcHO8NlKN3U.png",
    ],
    rating: 4.8,
    reviews: 124,
    description:
      "Timeless premium leather jacket crafted with the finest Italian leather. Features a classic design with quality stitching and hardware.",
    details: [
      "100% Genuine Italian Leather",
      "Premium YKK Zippers",
      "Adjustable Waist Tabs",
      "Two Chest Pockets",
      "Hand-Stitched Seams",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Brown", "Tan"],
  },
  2: {
    name: "Classic Denim Jeans",
    price: 99.99,
    category: "Jeans",
    image: "/dark-blue-denim-jeans.jpg",
    angles: [
      "/dark-blue-denim-jeans.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-MUDqOM4ZOiatAhlKDcM8XvzDTmVWLN.jpeg",
      "/dark-blue-denim-jeans.jpg",
    ],
    rating: 4.6,
    reviews: 89,
    description:
      "Versatile dark blue denim jeans with a classic fit. Perfect for everyday wear with premium quality construction.",
    details: ["98% Cotton, 2% Spandex", "Classic Fit", "Five Pocket Design", "Heavy-Weight Denim", "Reinforced Seams"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Black", "Light Blue"],
  },
  3: {
    name: "Cotton Crew Shirt",
    price: 49.99,
    category: "Shirts",
    image: "/white-cotton-men-shirt.jpg",
    angles: [
      "/white-cotton-men-shirt.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k7qK6mSR3DEouw3ujLSk18F4prx7qI.png",
      "/white-cotton-men-shirt.jpg",
    ],
    rating: 4.5,
    reviews: 67,
    description:
      "Essential cotton crew neck shirt offering comfort and style. Soft, breathable fabric perfect for any occasion.",
    details: ["100% Premium Cotton", "Crew Neck Design", "Short Sleeves", "Machine Washable", "Pre-Shrunk"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["White", "Black", "Gray", "Navy"],
  },
  4: {
    name: "Wool Blazer",
    price: 299.99,
    category: "Jackets",
    image: "/black-wool-blazer.jpg",
    angles: [
      "/black-wool-blazer.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lDGq7FeYMjol1bdgGtdeuZDKYyIbLx.png",
      "/black-wool-blazer.jpg",
    ],
    rating: 4.9,
    reviews: 156,
    description: "Sophisticated wool blazer for formal and business occasions. Tailored fit with premium finishing.",
    details: ["100% Premium Wool", "Two Button Front", "Tailored Fit", "Interior Pockets", "Dry Clean Only"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Charcoal", "Navy"],
  },
  5: {
    name: "Slim Fit Jeans",
    price: 89.99,
    category: "Jeans",
    image: "/blue-slim-jeans.jpg",
    angles: [
      "/blue-slim-jeans.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-MUDqOM4ZOiatAhlKDcM8XvzDTmVWLN.jpeg",
      "/blue-slim-jeans.jpg",
    ],
    rating: 4.7,
    reviews: 98,
    description: "Modern slim fit jeans with stretch comfort. Great for a contemporary look.",
    details: ["97% Cotton, 3% Spandex", "Slim Fit", "Mid-Rise Waist", "Tapered Leg", "Premium Denim"],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Medium Blue", "Dark Blue", "Black"],
  },
}

const SIMILAR_PRODUCTS: { [key: string]: number[] } = {
  Jackets: [1, 4, 7],
  Jeans: [2, 5, 8],
  Shirts: [3, 6, 9],
  Pants: [8],
}

/**
 * Client component that unwraps `params` using React.use (imported as `use`)
 * NOTE: props.params is a Promise in the App Router in newer Next.js versions.
 */
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // unwrap the async params object (React 19 / Next.js App Router)
  const { id } = use(params)
  const numericId = Number.parseInt(String(id))
  const product = PRODUCT_DETAILS[numericId] ?? PRODUCT_DETAILS[1]

  // Store hooks (cart + wishlist)
  const { addToCart, toggleWishlist, isInWishlist } = useStore()

  // Safe initial states (guard arrays)
  const [selectedAngle, setSelectedAngle] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? "")
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? "")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  // initialize local favorite state from context on mount / when product id changes
  useEffect(() => {
    setIsFavorite(isInWishlist(numericId))
  }, [isInWishlist, numericId])

  // Add-to-cart wired to context
  const handleAddToCart = () => {
    // push product into context store
    addToCart({ id: numericId, name: product.name, price: product.price }, quantity)

    // local UI feedback
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  // Toggle wishlist via context + flip local UI
  const handleToggleWishlist = () => {
    toggleWishlist(numericId)
    // flip local state immediately for instant UI feedback
    setIsFavorite((prev) => !prev)
  }

  // Build similar products safely and filter out undefined entries
  const similarProductIds = (product && SIMILAR_PRODUCTS[product.category]) || [1, 2, 3]
  const similarProducts = similarProductIds
    .filter((pid) => pid !== numericId)
    .map((pid) => PRODUCT_DETAILS[pid])
    .filter(Boolean)
    .slice(0, 3)

  const colorMap: { [key: string]: string } = {
    Black: "bg-black",
    White: "bg-white border border-border",
    Brown: "bg-yellow-900",
    Tan: "bg-yellow-700",
    "Dark Blue": "bg-blue-900",
    "Light Blue": "bg-blue-400",
    Blue: "bg-blue-600",
    Gray: "bg-gray-400",
    Navy: "bg-blue-900",
    Charcoal: "bg-gray-700",
    "Medium Blue": "bg-blue-600",
    Beige: "bg-yellow-100",
  }

  // If product is missing (very unlikely due to fallback), render a simple message
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Product not found</h2>
          <p className="text-sm text-gray-600">The product you requested does not exist.</p>
          <div className="mt-4">
            <Link href="/shop" className="text-sm text-blue-600 underline">
              Back to shop
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors text-xs sm:text-sm"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Back to Shop</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <h1 className="text-base sm:text-lg font-bold tracking-tight">PLANET T</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Product Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center sticky top-24 lg:top-20">
              <img
                src={product.angles?.[selectedAngle] ?? product.image}
                alt={`${product.name} angle ${selectedAngle + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Angle Gallery - Desktop */}
            <div className="hidden sm:grid grid-cols-3 gap-3">
              {(product.angles ?? []).map((angle: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAngle(idx)}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-50 border-2 transition-colors ${
                    selectedAngle === idx ? "border-gray-900" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={angle ?? "/placeholder.svg"} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-2">
                {(product.angles ?? []).map((angle: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAngle(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border-2 transition-colors ${
                      selectedAngle === idx ? "border-gray-900" : "border-gray-200"
                    }`}
                  >
                    <img src={angle ?? "/placeholder.svg"} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Title and Price */}
            <div>
              <p className="text-xs tracking-widest text-gray-500 uppercase mb-1 sm:mb-2">{product.category}</p>
              <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? "fill-gray-900 text-gray-900" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">${product.price.toFixed(2)}</div>
              <p className="text-foreground leading-relaxed text-xs sm:text-sm">{product.description}</p>
            </div>

            {/* Details */}
            <div>
              <h3 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-wide">Key Features</h3>
              <ul className="space-y-1 sm:space-y-2">
                {(product.details ?? []).map((detail: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                    <span className="text-gray-900 mt-0.5 flex-shrink-0">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-wide">
                Color: <span className="text-gray-600 normal-case">{selectedColor}</span>
              </h3>
              <div className="flex gap-2 sm:gap-3">
                {(product.colors ?? []).map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full transition-all ${colorMap[color] ?? ""} ${
                      selectedColor === color ? "ring-2 ring-gray-900 ring-offset-2" : ""
                    }`}
                    title={color}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-wide">
                Size: <span className="text-gray-600 normal-case">{selectedSize}</span>
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {(product.sizes ?? []).map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-sm border text-xs sm:text-sm transition-colors ${
                      selectedSize === size ? "bg-black text-white border-black" : "border-gray-200 text-foreground hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-semibold text-xs sm:text-sm">Qty:</span>
                <div className="flex items-center border border-gray-200 rounded-sm w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 transition-colors text-sm">
                    −
                  </button>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 border-r border-l border-gray-200 text-sm min-w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 transition-colors text-sm">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => handleAddToCart()}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-sm font-semibold hover:bg-gray-900 transition-colors text-xs sm:text-sm"
                >
                  <ShoppingBag size={16} className="sm:w-5 sm:h-5" />
                  <span>{addedToCart ? "Added!" : "Add to Cart"}</span>
                </button>
                <button onClick={() => handleToggleWishlist()} className="px-3 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Heart size={16} className={`sm:w-5 sm:h-5 ${isFavorite ? "fill-gray-900 text-gray-900" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
              {similarProducts.map((prod: any, idx: number) => {
                // find the key for this product in PRODUCT_DETAILS (returns string key)
                const prodKey = Object.keys(PRODUCT_DETAILS).find((k) => PRODUCT_DETAILS[Number(k)]?.name === prod.name) ?? "1"
                return (
                  <Link key={idx} href={`/product/${prodKey}`} className="group">
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-2 sm:mb-3 aspect-square flex items-center justify-center">
                      <img src={prod.image || "/placeholder.svg"} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">{prod.category}</p>
                    <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2">{prod.name}</h3>
                    <p className="font-bold text-xs sm:text-sm">${prod.price.toFixed(2)}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
