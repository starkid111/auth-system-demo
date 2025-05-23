"use client";

import { Eye, EyeOff } from "lucide-react";

import { registerSchema } from "@/schema";
import { registerUser } from "@/utils/supabaseAuth";
import toast from "react-hot-toast";
//import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  //const {login} = useAuth() // add only when  mocking the backend
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse({ email, password, fullName });

    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || "Invalid input";
      toast.error(errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      registerUser(email, password, fullName);
      // const tokenData = {token : "mock-data" + Date.now()}
      // login(tokenData.token)
      //toast.success("Account created. Check your email to confirm.");
       setTimeout(() => {
       router.push("/login");
       }, 2000);
    } catch (error) {
      toast.error("User already existed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-lg w-full space-y-6">
    <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
        </div>
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
        </div>
      </div>

      <button
        type="submit"
        className="bg-black hover:bg-black/90 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto flex items-center justify-center"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  </div>
</div>

  );
};
export default RegisterPage;
