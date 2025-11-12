"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Verify Your Order</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border rounded-lg p-2 w-full"
        />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
          className="border rounded-lg p-2 w-full"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg w-full hover:bg-gray-800"
        >
          Verify
        </button>

        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
