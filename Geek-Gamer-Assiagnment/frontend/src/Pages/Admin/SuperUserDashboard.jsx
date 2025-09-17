import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../User/Navbar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function SuperUserDashboard() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showAddDrawer, setShowAddDrawer] = useState(false);

  const token = localStorage.getItem("token") || localStorage.getItem("admin_token");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/todos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(res.data.todos.map(todo => ({
      ...todo,
      date: moment(todo.dueDate).format("DD/MM/YYYY"),
      status: todo.status.charAt(0).toUpperCase() + todo.status.slice(1)
    })));
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchTodos();
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

    
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          
          <Outlet context={{
            todos, users, fetchTodos, fetchUsers,
            selectedTodo, setSelectedTodo,
            showAddDrawer, setShowAddDrawer
          }} />
        </div>
      </div>
    </div>
  );
}
