"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <p className="text-center mb-6">Welcome! You are logged in.</p>

      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
