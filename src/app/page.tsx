"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-lg w-full space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to the App</h1>
      <p className="mb-6 text-center">
        Your journey starts here. Please log in to continue.
      </p>
      <button
        onClick={handleNavigate}
        className="bg-black hover:bg-black/90 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto flex items-center justify-center"
      >
        Go to Login
      </button>
    </div>
  </div>
  
  );
}
