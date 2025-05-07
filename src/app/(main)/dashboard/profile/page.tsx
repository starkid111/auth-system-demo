"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/app/context/AuthContext";

const ProfilePage = () => {
  const { session } = useAuth();
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user?.id)
        .single();

      if (data) {
        setFullName(data.full_name);
      }

      setLoading(false);
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user?.id, full_name: fullName });

    setLoading(false);
    if (!error) {
      alert("Profile updated");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

      <p className="mb-2 text-gray-600">Email: {user?.email}</p>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 p-3 border rounded"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default ProfilePage;
