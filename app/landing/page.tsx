"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/man_in_jacket.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
          PLANET T
        </h1>
        <p className="text-gray-200 text-lg mb-10 max-w-md mx-auto">
          Discover premium fashion. Log in or join today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 bg-black border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>

        <div className="flex items-center justify-center my-6">
          <div className="h-px w-20 bg-gray-400/40" />
          <span className="mx-3 text-gray-300 text-sm">OR</span>
          <div className="h-px w-20 bg-gray-400/40" />
        </div>

        <button
          onClick={() => alert("Google Sign-In coming soon!")}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition mx-auto"
        >
          <FcGoogle size={22} />
          Sign in with Google
        </button>

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-10 inline-block px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
