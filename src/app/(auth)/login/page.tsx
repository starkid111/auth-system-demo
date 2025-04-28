"use client"

import { loginUser } from '@/utils/api';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const LoginPage = () => {
   const {login} = useAuth()
const router = useRouter()
const [email , setEmail] = useState("");
const [password , setPassword] = useState("");
const [loading , setLoading ] = useState(false)
const [error , setError] = useState("")


const handleLogin = async(e : React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
         const data = await loginUser(email , password);
         login(data.token);
    } catch (err: any) {
        if (err.response && err.response.status === 400) {
            setError('Invalid credentials. Please try again.');
          } else if (err.message.includes('Network')) {
            setError('Network error. Please check your connection.');
          } else {
            setError('Something went wrong. Please try again later.');
          }
      } finally {
        setLoading(false);
      }
}


    
  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}
  

export default LoginPage