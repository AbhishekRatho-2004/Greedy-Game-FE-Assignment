import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Navbar from "./Navbar";
import TodoTable from "./TodoTable";
import AddTodoDrawer from "./AddTodo";
import DashboardStats from "../Admin/DashboardStats"; 

export default function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const token =
    localStorage.getItem("token") || localStorage.getItem("admin_token");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todo", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTodos(
        res.data.todos.map((todo) => ({
          ...todo,
          date: moment(todo.dueDate).format("DD/MM/YYYY"),
          status: todo.status.charAt(0).toUpperCase() + todo.status.slice(1),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchTodos();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowAddDrawer(true);
  };


  const allTodos = todos.length;
  const completedTodos = todos.filter((t) => t.status === "Completed").length;
  const upcomingTodos = todos.filter((t) => t.status === "Pending").length;

  return (
    <div>
      <Navbar />
      <div className="p-4">
       
        <DashboardStats
          all={allTodos}
          upcoming={upcomingTodos}
          completed={completedTodos}
        />

      
        <TodoTable
          todos={todos}
          onAddClick={() => {
            setSelectedTodo(null);
            setShowAddDrawer(true);
          }}
          onRowClick={(todo) => {
            setSelectedTodo(todo);
            setShowAddDrawer(false);
          }}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {(selectedTodo || showAddDrawer) && (
          <AddTodoDrawer
            todo={selectedTodo}
            onClose={() => {
              setSelectedTodo(null);
              setShowAddDrawer(false);
              fetchTodos();
            }}
          />
        )}
      </div>
    </div>
  );
}
