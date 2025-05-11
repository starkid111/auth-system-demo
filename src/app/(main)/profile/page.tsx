"use client"

import React, { useEffect, useState } from 'react'

import { supabase } from '@/utils/supabaseClient'
import toast from 'react-hot-toast'
import { useAuth } from '@/app/context/AuthContext'

interface ProfileData {
    id : string ,
    full_name: string ,
}

const ProfilePage = () => {
  const {logout , session} = useAuth()
  const [profile , setProfile ] = useState<ProfileData | null>(null)
  const [loading , setLoading ] = useState(true)
  const [newFullName , setNewFullName] = useState("")
  const [editMode , setEditMode] = useState(false)
 
 

useEffect(()=> {
    const fetchProfile = async() => {
        if (!session) {
            setLoading(false)
            return
        }

        try {
          const {data , error }= await supabase.from("profiles").select("id , full_name").eq("id" , session.user.id).single()
          if (error) {
            throw error
          }
          setProfile(data)
          setNewFullName(data.full_name)
        }
        catch(err: any ) {
            toast.error(err.message || "Failed to load profile ")
        } finally {
            setLoading(false)
        }

       
    }


    fetchProfile()
}, [session])





const handleUpdateProfile = async() => {
    setLoading(true)
    try {
       const { error } = await supabase.from("profiles").update({full_name : newFullName}).eq("id" , session?.user.id)
       if (error) {
        throw error
       }
      
       setProfile((prevProfile) => prevProfile && {...prevProfile , full_name : newFullName})
       setEditMode(false)
       toast.success("Profile updated successfully");
    } catch {
       toast.error("failed to update profile")
    } finally {
        setLoading(false)
    }
}
  
if (loading) {
    return <div className="text-center mt-10">Loading Profile...</div>;
  }

  if (!profile) {
    return (
      <div className="text-center mt-10">
        <p>No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
    {editMode ? (
      <>
        <div>
          <input
            type="text"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded w-full mt-2"
        >
          Cancel
        </button>
      </>
    ) : (
      <>
        <p>
          <span className="font-bold">Full Name:</span> {profile.full_name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {session?.user.email}
        </p>
        <button
          onClick={() => setEditMode(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-4"
        >
          Edit Profile
        </button>
      </>
    )}

    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full mt-4"
    >
      Logout
    </button>
  </div>
  );
};

export default ProfilePage