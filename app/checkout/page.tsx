"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("OTP sent to your email! Please verify to complete your order.");
        // redirect to OTP page (if you have one)
        router.push(`/verify?email=${form.email}`);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Checkout</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key as keyof typeof form]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            required
            className="border rounded-lg p-2 w-full"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 px-4 rounded-lg w-full hover:bg-gray-800"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
