import React from "react";
import { Edit, Trash2, Filter } from "lucide-react";

export default function TodoTable({ todos, onAddClick, onRowClick, onDelete, onEdit }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
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
              <th className="py-2">Due Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, idx) => (
              <tr
                key={idx}
                className="border-b last:border-0 cursor-pointer"
                onClick={() => onRowClick(todo)}
              >
                <td className="py-3">
                  <p className="font-medium">{todo.title}</p>
                  <p className="text-xs text-gray-500">{todo.desc}</p>
                </td>
                <td className="py-3 text-sm text-gray-700">
                  {todo.date} <br /> {todo.time}
                </td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    todo.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {todo.status}
                  </span>
                </td>
                <td className="py-3 flex gap-2">
                  <button
                    className="hover:bg-gray-100 px-2 py-1 rounded-md"
                    onClick={(e) => { e.stopPropagation(); onEdit(todo); }}
                  >
                    <Edit className="w-4 h-4 text-purple-500" />
                  </button>
                  <button
                    className="hover:bg-gray-100 px-2 py-1 rounded-md"
                    onClick={(e) => { e.stopPropagation(); onDelete(todo._id); }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
