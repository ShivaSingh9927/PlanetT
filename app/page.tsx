"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingBag, Menu, X, Search, ChevronRight, ChevronLeft } from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  const carouselImages = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k7qK6mSR3DEouw3ujLSk18F4prx7qI.png",
      alt: "Man in black casual jacket",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lDGq7FeYMjol1bdgGtdeuZDKYyIbLx.png",
      alt: "Man in brown suede jacket",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-H1051IvHRl0rWlyJJZXeqrXo5EoWTW.png",
      alt: "Man in black leather jacket",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EG2cHhhqwMjNIEV6ZiUiS3L4A4DJbq.png",
      alt: "Man in white puffer jacket",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
        setFadeOut(false)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const handlePrevImage = () => {
    setFadeOut(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
      setFadeOut(false)
    }, 300)
  }

  const handleNextImage = () => {
    setFadeOut(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
      setFadeOut(false)
    }, 300)
  }

  // discount text (change here to update badge globally)
  const DISCOUNT_TEXT = "49%"

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: "$249.99",
      image: "/black-leather-men-jacket.jpg",
      category: "Jackets",
    },
    {
      id: 2,
      name: "Classic Denim Jeans",
      price: "$99.99",
      image: "/dark-blue-denim-jeans.jpg",
      category: "Jeans",
    },
    {
      id: 3,
      name: "Cotton Crew Shirt",
      price: "$49.99",
      image: "/white-cotton-men-shirt.jpg",
      category: "Shirts",
    },
    {
      id: 4,
      name: "Wool Blazer",
      price: "$299.99",
      image: "/black-wool-blazer.jpg",
      category: "Jackets",
    },
  ]

  const categoryItems = [
    {
      id: "jackets",
      name: "Jackets",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k7qK6mSR3DEouw3ujLSk18F4prx7qI.png",
      link: "/shop?category=Jackets",
    },
    {
      id: "sweaters",
      name: "Sweaters",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lDGq7FeYMjol1bdgGtdeuZDKYyIbLx.png",
      link: "/shop?category=sweaters",
    },
    {
      id: "jeans",
      name: "Jeans",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-H1051IvHRl0rWlyJJZXeqrXo5EoWTW.png",
      link: "/shop?category=Jeans",
    },
    {
      id: "shirts",
      name: "Shirts",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EG2cHhhqwMjNIEV6ZiUiS3L4A4DJbq.png",
      link: "/shop?category=Shirts",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Avika Style */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="text-2xl font-bold tracking-tight text-black hidden sm:block absolute left-1/2 -translate-x-1/2">
              PLANET T
            </h1>
            <h1 className="text-xl font-bold tracking-tight text-black sm:hidden">PLANET T</h1>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-50 rounded transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-gray-50 rounded transition-colors">
                <Heart size={20} />
              </button>
              <Link href="/cart" className="p-2 hover:bg-gray-50 rounded transition-colors relative">
                <ShoppingBag size={20} />
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="mt-4 space-y-3 pb-4 animate-in fade-in duration-200">
              <Link href="/shop" className="block font-medium hover:text-gray-600">
                Shop
              </Link>
              <Link href="/shop?category=Jackets" className="block text-gray-600 hover:text-gray-900">
                Jackets
              </Link>
              <Link href="/shop?category=Jeans" className="block text-gray-600 hover:text-gray-900">
                Jeans
              </Link>
              <Link href="/shop?category=Shirts" className="block text-gray-600 hover:text-gray-900">
                Shirts
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-100 overflow-hidden">
        <div className="relative h-96 sm:h-screen max-h-96 sm:max-h-full flex items-center">
          <img
            src={carouselImages[currentImageIndex].url || "/placeholder.svg"}
            alt={carouselImages[currentImageIndex].alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 w-full px-4 sm:px-8 py-8 sm:py-0 flex flex-col justify-center">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm tracking-widest text-white uppercase font-semibold mb-3 sm:mb-4">
                New Collection
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Elevate Your Style
              </h2>
              <p className="text-sm sm:text-base text-white/90 mb-6 sm:mb-8 max-w-md leading-relaxed">
                Premium clothing for the modern man. Discover our curated collection of jackets, jeans, and shirts
                crafted for timeless style.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-sm font-medium hover:bg-gray-900 transition-colors group"
              >
                SHOP NOW
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors hidden sm:block"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors hidden sm:block"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setFadeOut(true)
                  setTimeout(() => {
                    setCurrentImageIndex(index)
                    setFadeOut(false)
                  }, 300)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white w-6" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Winter Edit Section */}
      <section className="px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest text-gray-600 uppercase mb-4">Premium Collection</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Winter Edit</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our carefully selected collection of premium pieces perfect for the season. Each item is crafted for
            quality and style.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/shop?category=Jackets"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-black text-white rounded-sm font-medium hover:bg-gray-900 transition-colors text-center text-sm"
          >
            SHOP JACKETS
          </Link>
          <Link
            href="/shop?category=Shirts"
            className="px-6 sm:px-8 py-2 sm:py-3 border border-black text-black rounded-sm font-medium hover:bg-gray-50 transition-colors text-center text-sm"
          >
            SHOP SHIRTS
          </Link>
        </div>
      </section>

      {/* Shop By Category - no blur now */}
      <section className="px-4 sm:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Shop By Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {categoryItems.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden rounded-sm h-48 sm:h-64"
            >
              {/* removed blur classes so image is sharp */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/28 group-hover:bg-black/36 transition-all duration-300" />
              <div className="relative flex items-center justify-center h-full">
                <h3 className="text-lg sm:text-xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals - moved here (after Shop By Category) */}
      <section className="px-4 sm:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">New Arrivals</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="flex gap-4 px-4 sm:px-0 pb-4">
            {featuredProducts.map((product, idx) => (
              <Link key={idx} href={`/product/${product.id}`} className="flex-shrink-0 w-40 sm:w-48 group relative">
                <div className="relative bg-gray-100 rounded-sm overflow-hidden mb-3 aspect-square flex items-center justify-center">
                  {/* discount badge */}
                  <div className="absolute top-3 left-3 z-30 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {DISCOUNT_TEXT}
                  </div>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                <p className="text-gray-900 font-bold text-sm mt-1">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - 2x2 Grid (badge added) */}
      <section className="px-4 sm:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Featured Items</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group relative">
              <div className="relative bg-gray-100 rounded-sm overflow-hidden mb-4 aspect-square flex items-center justify-center">
                {/* discount badge */}
                <div className="absolute top-3 left-3 z-30 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {DISCOUNT_TEXT}
                </div>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
                  <Heart size={18} className="text-gray-900" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-2">{product.category}</p>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-900 font-bold text-sm">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/shop?category=Jackets" className="hover:text-white transition">
                    Jackets
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Jeans" className="hover:text-white transition">
                    Jeans
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Shirts" className="hover:text-white transition">
                    Shirts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Planet T. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
