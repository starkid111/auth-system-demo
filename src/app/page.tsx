"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to the App</h1>
      <p className="mb-6 text-center">
        Your journey starts here. Please log in to continue.
      </p>
      <button
        onClick={handleNavigate}
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
      >
        Go to Login
      </button>
    </div>
  );
}
