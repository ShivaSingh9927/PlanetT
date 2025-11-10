import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SearchPage() {
  const params = useSearchParams()
  const q = params?.get("q") ?? ""
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search results for “{q}”</h1>
      <p className="text-sm text-gray-600 mb-6">(This is a placeholder — integrate your search backend or filter client-side data.)</p>
      <Link href="/shop" className="text-sm text-blue-600">Back to shop</Link>
    </div>
  )
}
