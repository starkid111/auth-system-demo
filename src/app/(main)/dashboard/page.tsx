"use client"

import { useEffect, useState } from 'react';

import { fetchUserData } from '@/utils/api';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const {token , logout } = useAuth()
    const [userData , setUserData] = useState<any>(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData(token);
        setUserData(data); 
      } catch (error) {
        setError("Failed to fetch user data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      router.push('/login');
    } else {
      fetchUser();
    }
  }, [token, router]);


  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-24 p-6 text-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-24 p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
    <p className="text-center mb-6">Welcome, you are logged in!</p>

    {userData && (
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold">User Info</h2>
        <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
    )}

    <div className="flex justify-center mt-6">
      <button
        onClick={logout} // Calls logout to clear token from localStorage
        className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  </div>
  );
}
