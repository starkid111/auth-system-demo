"use client"

import { registerUser } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export const RegisterPage = () => {
    const router = useRouter()
 const [email , setEmail] = useState("");
 const [password , setPassword] = useState("");
 const [confirmPassword , setConfirmPassword] = useState("")
 const [loading , setLoading] = useState(false)
 const [error , setError] = useState("")
 const [success , setSuccess] = useState("")


const handleRegister = async (e : React.FormEvent) => {
    e.preventDefault()
    setSuccess("")
    setError('')


    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
    try {
        setLoading(true);
        const response = await registerUser(email, password);
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => {
          router.push('/login');
        }, 2000); 
      } catch (err: any) {
        setError('Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
}
    
  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>

    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
  </div>
  )
}
export default RegisterPage;