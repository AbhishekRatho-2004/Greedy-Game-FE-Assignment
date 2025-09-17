import React from "react";
import { useOutletContext } from "react-router-dom";
import DashboardStats from "./DashboardStats";
import TodoTable from "./TodoTable";
import AddTodoDrawer from "../User/AddTodo";
import AddUserDrawer from "./AddUserDrawer";
import AdminAddTodoDrawer from "./AdminAddTodo";

export default function DashboardPage() {
  const { todos, fetchTodos, selectedTodo, setSelectedTodo, showAddDrawer, setShowAddDrawer } = useOutletContext();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    await fetch(`http://localhost:5000/api/todo/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowAddDrawer(true);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Hello, SuperUser</h2>

      <DashboardStats
        all={todos.length}
        upcoming={todos.filter(t => t.status === "in-progress").length}
        completed={todos.filter(t => t.status === "Completed").length}
      />

      <TodoTable
        todos={todos}
        onAddClick={() => { setSelectedTodo(null); setShowAddDrawer(true); }}
        onRowClick={() => {}}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {(selectedTodo || showAddDrawer) && (
        <AdminAddTodoDrawer
          todo={selectedTodo}
          onClose={() => { setSelectedTodo(null); setShowAddDrawer(false); fetchTodos(); }}
          refreshTodos={fetchTodos}
        />
      )}
    </>
  );
}
