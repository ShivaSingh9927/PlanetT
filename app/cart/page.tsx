"use client"

import { useStore } from "../../context/CartWishlistContext"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, setQty, clearCart } = useStore()

  const total = cart.reduce((s, it) => s + (it.qty ?? 1) * (it.price ?? 0), 0)

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-6">
            {cart.map((it) => (
              <li key={String(it.id)} className="flex items-center justify-between border p-3 rounded">
                <div>
                  <p className="font-semibold">{it.name ?? `Product #${it.id}`}</p>
                  <p className="text-sm text-gray-500">${(it.price ?? 0).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-16 border rounded px-2 py-1 text-sm"
                    value={it.qty ?? 1}
                    min={1}
                    onChange={(e) => setQty(it.id, Math.max(1, Number(e.target.value)))}
                  />
                  <button onClick={() => removeFromCart(it.id)} className="text-red-600 text-sm">Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => clearCart()} className="px-4 py-2 border rounded text-sm">Clear</button>
              <button className="px-4 py-2 bg-black text-white rounded text-sm">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
