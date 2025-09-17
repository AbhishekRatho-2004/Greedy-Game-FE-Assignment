import React from "react";
import { LayoutDashboard, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/superuser/dashboard" },
    { name: "Users", icon: <Users className="w-5 h-5" />, path: "/superuser/users" },
  ];

  return (
    <div className="w-60 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-4 text-lg font-bold border-b border-gray-800">
        GREEDYGAME
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
