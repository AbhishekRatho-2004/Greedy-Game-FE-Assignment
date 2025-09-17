import React from "react";
import { Edit, Trash2, Filter } from "lucide-react";

export default function TodoTable({ todos, onAddClick, onRowClick, onEdit, onDelete }) {
  const getStatusStyle = (status) => {
    const normalized = status?.toLowerCase(); 
    switch (normalized) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "in-progress":
        return "bg-orange-100 text-orange-600";
      case "completed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm">
      <div className="p-4 flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">Last Updated : 16/08/2023 18:00</p>
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 bg-white hover:bg-gray-100 flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium"
            onClick={onAddClick}
          >
            + Add Todo
          </button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2">Todo</th>
            <th className="py-2">Assigned To</th>
            <th className="py-2">Due Date</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, idx) => (
            <tr key={idx} className="border-b last:border-0 cursor-pointer">
              <td className="py-3" onClick={() => onRowClick(todo)}>
                <p className="font-medium">{todo.title}</p>
                <p className="text-xs text-gray-500">{todo.description}</p>
              </td>

              {/* Assigned User */}
              <td className="py-3 text-sm text-gray-700">
                {todo.personId?.name || "Unassigned"} <br />
                <span className="text-xs text-gray-500">{todo.personId?.email}</span>
              </td>

              <td className="py-3 text-sm text-gray-700">
                {new Date(todo.dueDate).toLocaleDateString()} <br /> {todo.dueTime}
              </td>

              <td className="py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    todo.status
                  )}`}
                >
                  {todo.status}
                </span>
              </td>

              <td className="py-3 flex gap-2">
                <button
                  onClick={() => onEdit(todo)}
                  className="hover:bg-gray-100 px-2 py-1 rounded-md"
                >
                  <Edit className="w-4 h-4 text-purple-500" />
                </button>
                <button
                  onClick={() => onDelete(todo._id)}
                  className="hover:bg-gray-100 px-2 py-1 rounded-md"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
