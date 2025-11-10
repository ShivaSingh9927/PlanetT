"use client"

import { useStore } from "../../context/CartWishlistContext"
import Link from "next/link"

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore()

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">You have no items in your wishlist.</p>
      ) : (
        <ul className="space-y-3">
          {wishlist.map((id) => (
            <li key={String(id)} className="flex items-center justify-between border p-3 rounded">
              <div>
                <p className="font-semibold">Product #{id}</p>
                <p className="text-sm text-gray-500">Sample item — replace with real product data</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/product/${id}`} className="text-sm text-blue-600">View</Link>
                <button onClick={() => toggleWishlist(id)} className="text-red-600 text-sm">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
