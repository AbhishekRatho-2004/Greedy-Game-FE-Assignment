import React from "react";
import moment from "moment";

export default function PreviewTodoDrawer({ todo, onClose }) {
  if (!todo) return null;

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l z-50 transition-all">

      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Todo Preview</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Title</p>
          <p className="text-lg font-semibold">{todo.title}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-gray-700">{todo.description || todo.desc}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p>{moment(todo.dueDate || todo.date).format("DD/MM/YYYY")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Due Time</p>
            <p>{todo.dueTime || todo.time}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`px-2 py-1 text-xs rounded ${
              todo.status === "completed"
                ? "bg-green-100 text-green-700"
                : todo.status === "in-progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {todo.status}
          </span>
        </div>

        {todo.personId && (
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="text-gray-700">{todo.personId.name}</p>
            <p className="text-xs text-gray-400">{todo.personId.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
