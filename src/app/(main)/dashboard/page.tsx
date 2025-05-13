"use client"

import { useEffect, useState } from 'react';

import Link from 'next/link';
//import { fetchUserData } from '@/utils/api';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const {session , logout , loadingState } = useAuth()
   // const [userData , setUserData] = useState<any>(null)
    
  const router = useRouter();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchUserData(token);
  //       setUserData(data); 
  //     } catch (error) {
  //       setError("Failed to fetch user data");
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (!loadingState && !token) {
  //     router.push('/login');
  //   } else {
  //     fetchUser();
  //   }
  // }, [token, router , loadingState]);

 useEffect(() => {
  if (!loadingState && !session) {
    router.push("/login")
  }
 }, [session , router , loadingState])
 
  if (loadingState) {
    return (
      <div className="max-w-2xl mx-auto mt-24 p-6 text-center">
        <p>Loading user data...</p>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md w-full space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <p className="text-center mb-6">Welcome, you are logged in!</p>
  
      {session && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold">User Info</h2>
          <p><strong>Welcome</strong> {session?.user.email}</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim labore reprehenderit odit nam aliquam quo dolores quis iste nisi corporis.</p>
        </div>
      )}
  
      <div className="space-y-4">
        <Link href="/profile" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full md:w-auto block text-center">
          Go to Profile
        </Link>
  
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full md:w-auto"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
  );
}
