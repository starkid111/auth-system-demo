
"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

interface AuthContextType {
    token : string | null ,
    login : (token : string) => void
    logout : () => void
    
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const  AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [token , setToken] = useState<string | null>(null)

    useEffect(()=> {
      const savedToken =  localStorage.getItem("token")
      if (savedToken) {
        setToken(savedToken)
      }
    }, [])

   const login = (token: string) => {
        setToken(token)
        localStorage.setItem("token" , token)
        router.push("/dashboard")
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem("token")
         router.push("/login")
    }

    return (
        <AuthContext.Provider value={{token , login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const  useAuth = ()=> {
    const context = useContext(AuthContext)
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}
