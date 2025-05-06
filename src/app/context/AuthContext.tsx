
"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import type { Session } from "@supabase/supabase-js"; // important!
//import { loginUser } from "@/utils/supabaseAuth";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

interface AuthContextType {
   // token : string | null ,  for api.ts and mockAuth.ts
   // login : (token : string) => void , for api.ts and mockAuth.ts , we used token cause the login function was returning a token 
   session : Session | null 
   login : (email : string , password: string) => Promise<void>,
    logout : () => Promise<void>
    loadingState: boolean,
    
}
const AuthContext = createContext<AuthContextType>({
    //token: null,
    session: null,
    login: async () => {}, //add async when using supabase
    logout: async () => {},
    loadingState:true
})

export const  AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
   // const [token , setToken] = useState<string | null>(null)
   const [session , setSession] = useState<Session | null>(null)
    const [loadingState , setLoadingState ] = useState(true)

    //  used if there is a token
    //   const savedToken =  localStorage.getItem("token")
    //   if (savedToken) {
    //     setToken(savedToken)
    //    }
    //   setLoadingState(false)
    //  }, []) 



   useEffect(()=> {
    //track auth session
        const getSession = async () => {
            const {data : {session}} = await supabase.auth.getSession()
            setSession(session ?? null)
            setLoadingState(false)
        }
        getSession()
        
         // Listen for session changes (login/logout)
         const {data : {subscription}} =  supabase.auth.onAuthStateChange((_event , session) => {
            setSession(session)
         }
        );
         
         return   subscription.unsubscribe()
         
   }, [] )


    
//    const login = (token: string) => {
//         setToken(token)
//         localStorage.setItem("token" , token)
//         router.push("/dashboard")
//     }

const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  
    setSession(data.session);
    router.push("/dashboard");
  };
     
    // const logout = () => {
    //     setToken(null)
    //     localStorage.removeItem("token")
    //      router.push("/login")
    // }

    const logout = async () => {
        await supabase.auth.signOut()
        setSession(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{session , login , logout , loadingState}}>
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
