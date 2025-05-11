import { supabase } from "./supabaseClient";
import toast from "react-hot-toast";

//Register a new User
export const registerUser = async (
  email: string,
  password: string,
  fullName: string
) => {
  const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;
  try {
    // Attempt to register the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

     
    if (error || !data.user) {
      throw new Error(error?.message || "Registration failed");
    }


    const userId = data.user.id;

    // Check if profile already exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (profileCheckError && profileCheckError.code !== "PGRST116") {
      throw new Error(profileCheckError.message);
    }

    if (!existingProfile) {
      // Insert profile only if it doesn't exist
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          full_name: fullName,
        },
      ]);

      if (profileError) {
        throw new Error(profileError.message);
      }
    }
    toast.success("Account created. Check your email to confirm.");
    return data;
  } catch (error) {
    toast.error("User already exist , please login ")
  }
 
};


//login existing user
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data.session;
};

