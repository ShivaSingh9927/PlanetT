"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Lock } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipCode
    ) {
      setStep("payment")
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep("confirmation")
    }, 2000)
  }

  const subtotal = 449.97
  const tax = 45.0
  const shipping = 0
  const total = 494.97

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Cart</span>
          </Link>
          <h1 className="text-lg font-bold tracking-tight">PLANET T</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Checkout Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {step === "confirmation" ? (
          /* Confirmation Screen */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            <div className="bg-secondary rounded-lg p-6 mb-6 space-y-3">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-bold text-lg">#ORD-2025-001234</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-bold">5-7 Business Days</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Order Total</p>
                <p className="font-bold text-lg text-accent">${total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="inline-block bg-secondary text-foreground px-6 py-3 rounded-md font-semibold hover:opacity-80 transition-opacity"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {/* Step Indicator */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => setStep("shipping")}
                  className={`flex-1 py-3 rounded-md font-semibold transition-colors ${
                    step === "shipping"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground opacity-50"
                  }`}
                >
                  Shipping
                </button>
                <button
                  onClick={() => step !== "shipping" && setStep("payment")}
                  className={`flex-1 py-3 rounded-md font-semibold transition-colors ${
                    step === "payment"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground opacity-50 cursor-not-allowed"
                  }`}
                  disabled={step === "shipping"}
                >
                  Payment
                </button>
              </div>

              {/* Shipping Form */}
              {step === "shipping" && (
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity mt-6"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* Payment Form */}
              {step === "payment" && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Lock size={20} />
                    Payment Information
                  </h2>

                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on Card"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={16}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      maxLength={5}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={3}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="flex-1 bg-secondary text-foreground px-6 py-3 rounded-md font-semibold hover:opacity-80 transition-opacity"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isProcessing ? "Processing..." : "Complete Purchase"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="bg-secondary rounded-lg p-6 h-fit">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span>Premium Leather Jacket</span>
                  <span>$249.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Classic Denim Jeans (x2)</span>
                  <span>$199.98</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-accent font-semibold">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
