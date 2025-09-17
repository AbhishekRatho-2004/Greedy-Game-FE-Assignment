import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationDrawer from "./NotificationDrawer";
import axios from "axios";
import ProfileDrawer from "./ProfileDrawer";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  const fetchNotificationCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`
      );
      if (res.data.success) {
        setNotificationCount(res.data.todos.length);
      }
    } catch (err) {
      console.error("Error fetching notification count", err);
    }
  };

  useEffect(() => {
    fetchNotificationCount();
    const interval = setInterval(fetchNotificationCount, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <>
   
      <div className="flex items-center justify-between p-4 shadow-sm border-b bg-white">
        <h1 className="text-lg font-bold">GREEDYGAME</h1>
        <div className="flex items-center gap-6">
      
          <div className="relative cursor-pointer" onClick={() => setShowDrawer(true)}>
            <Bell className="w-6 h-6 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>

          <div className="relative">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border py-2 z-50">
                 <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowProfileDrawer(true); // open profile drawer
                    setShowMenu(false);
                  }}
                >
                  Profile
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <NotificationDrawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          fetchNotificationCount(); 
        }}
      />
      {showProfileDrawer && (
        <ProfileDrawer onClose={() => setShowProfileDrawer(false)} />
      )}
    </>
  );
}
