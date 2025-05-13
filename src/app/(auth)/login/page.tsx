"use client";

import { Eye, EyeOff } from "lucide-react";

import { loginSchema } from "@/schema";
//import { loginUser } from "@/utils/mockAuth";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword , setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });

   

    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message || "Invalid input";
      toast.error(errorMessage);
      return;
    }
    setLoading(true);

    try {
      // const data =  loginUser(email, password);
      // login(data.token);
      await login(email , password)
      toast.success("Login Succesfully ");
    } catch (error) {
      toast.error("Login Failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-lg w-full space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
  
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
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
  
        <button
          type="submit"
          className="bg-black hover:bg-black/90 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
  
        <p className="text-center text-sm mt-4">
          Don’t have an account? {" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </form>
    </div>
  </div>
  
  );
};

export default LoginPage;
