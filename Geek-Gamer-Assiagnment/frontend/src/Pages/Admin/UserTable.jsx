import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import AddUserDrawer from "./AddUserDrawer";

export default function UsersTable({ users, onToggleRole, onAddUser }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Last Updated : 16/08/2023 18:00
        </p>
        <button
          className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium"
          onClick={() => setOpenDrawer(true)}
        >
          + Add Users
        </button>
      </div>

      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b last:border-0">
              <td className="py-3">
                {user.name} <br />
                <span className="text-xs text-gray-500">{user.email}</span>
              </td>
              <td className="py-3 capitalize">{user.role}</td>
              <td className="py-3">
                <Switch
                  checked={user.role === "admin"}
                  onChange={() => onToggleRole(user)}
                  className={`${
                    user.role === "admin" ? "bg-green-500" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${
                      user.role === "admin" ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {openDrawer && (
        <AddUserDrawer
          onClose={() => setOpenDrawer(false)}
          onAddUser={onAddUser}
        />
      )}
    </div>
  );
}
