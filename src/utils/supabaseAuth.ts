import { supabase } from "./supabaseClient";

//Register a new User 
export const registerUser = async  (email : string , password : string) =>  {
      const {data , error } = await supabase.auth.signUp({email , password}) 
      if (error) {
        throw error
      }
     
} 

//login existing user 
export const loginUser = async (email: string , password : string) => {
    const {data , error } = await supabase.auth.signInWithPassword({email, password})
    if (error) {
        throw error
    }
    return data.session
 }