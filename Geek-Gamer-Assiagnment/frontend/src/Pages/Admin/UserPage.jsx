import React from "react";
import { useOutletContext } from "react-router-dom";
import UsersTable from "./UserTable";

export default function UsersPage() {
  const { users, fetchUsers } = useOutletContext();

  const handleToggleRole = async (user) => {
    try {
      const token = localStorage.getItem("token"); 

      const res = await fetch(`http://localhost:5000/api/admin/users/${user._id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error updating role:", error.message);
        return;
      }

      await fetchUsers();
    } catch (err) {
      console.error("Failed to toggle role:", err);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
      <UsersTable users={users} onToggleRole={handleToggleRole} />
    </>
  );
}
