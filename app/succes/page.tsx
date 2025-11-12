export default function SuccessPage() {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-2">🎉 Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase. A confirmation email will be sent shortly.</p>
        <a href="/" className="mt-6 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition">
          Back to Home
        </a>
      </div>
    );
  }
  