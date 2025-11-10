/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Allow Next.js to optimize remote images
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
    // Set to false for actual optimization; true disables optimization
    unoptimized: false,
  },
}

export default nextConfig
