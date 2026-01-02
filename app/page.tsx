import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold mb-8">Welcome to My App</h1>
      <p className="mb-4 text-lg">Please login or register to continue.</p>
      
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Login
        </Link>
        <Link href="/register" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Register
        </Link>
      </div>
    </main>
  );
}
