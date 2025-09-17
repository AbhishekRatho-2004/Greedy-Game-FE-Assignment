import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function ProfileDrawer({ onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token =
    localStorage.getItem("token") || localStorage.getItem("admin_token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l z-50 p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l z-50 p-6">
        <p className="text-red-500">Failed to load profile ❌</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l z-50 transition-all">

      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Profile</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="p-6">
     
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://via.placeholder.com/60"
            alt="profile"
            className="w-14 h-14 rounded-full border"
          />
          <div>
            <p className="font-semibold text-lg">{profile.name}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <p className="text-xs text-gray-400">
              Joined On : {moment(profile.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
            {profile.role === "admin" && (
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded mt-1">
                Super Admin
              </span>
            )}
          </div>
        </div>

     
        <div className="mb-6">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={profile.name}
            disabled
            className="w-full border rounded p-2 mt-1 bg-gray-100"
          />
          <label className="text-sm font-medium mt-3 block">Email</label>
          <input
            type="text"
            value={profile.email}
            disabled
            className="w-full border rounded p-2 mt-1 bg-gray-100"
          />
          <button className="w-full mt-4 bg-green-100 text-green-700 py-2 rounded cursor-not-allowed">
            Update Profile (Disabled)
          </button>
        </div>

 
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white border rounded-lg shadow text-center">
            <p className="text-gray-500 text-sm">All Todos</p>
            <p className="text-xl font-bold">{profile.stats.total}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow text-center">
            <p className="text-gray-500 text-sm">Upcoming</p>
            <p className="text-xl font-bold">{profile.stats.pending}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow text-center">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-xl font-bold">{profile.stats.completed}</p>
          </div>
        </div>

    
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="flex items-center justify-center gap-2 text-red-600 w-full py-2 border rounded-md hover:bg-red-50"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
