"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);

  // ✅ Fetch user/order info
  useEffect(() => {
    if (!email) return;
    fetch(`/api/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order))
      .catch((err) => console.error(err));
  }, [email]);

  const handlePayment = async () => {
    setLoading(true);
    // ⚡️ Simulate payment or redirect to Stripe/Razorpay
    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (data.success) router.push("/success");
    else alert("Payment failed");
    setLoading(false);
  };

  if (!order) return <p className="p-6">Loading order...</p>;

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-2xl p-6 shadow">
      <h1 className="text-2xl font-semibold mb-4 text-center">Complete Payment</h1>

      <div className="border-b border-gray-300 mb-4 pb-3">
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Total:</strong> ₹{order.total || 499}</p>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
