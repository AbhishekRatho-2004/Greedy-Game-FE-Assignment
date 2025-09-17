import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationDrawer({ isOpen, onClose }) {
  const [todos, setTodos] = useState([]);

  const userId = localStorage.getItem("userId");
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  const markAsSeen = async (todoId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/notifications/seen/${todoId}/${userId}`
      );
      setTodos((prev) => prev.filter((t) => t._id !== todoId));
    } catch (err) {
      console.error("Error marking todo as seen", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTodos();
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg border-l transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >

      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">All Notifications</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          ✕
        </button>
      </div>

 
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        {todos.length === 0 ? (
          <p className="text-gray-500">No new notifications 🎉</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="p-4 border rounded-lg shadow-sm bg-white flex flex-col"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{todo.title}</h3>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    Upcoming
                  </span>
                </div>
                {todo.description && (
                  <p className="text-gray-600 text-sm mb-1">
                    {todo.description}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {new Date(todo.dueDate).toLocaleString()}
                </p>
                <button
                  onClick={() => markAsSeen(todo._id)}
                  className="mt-2 text-sm text-green-600 hover:underline self-end"
                >
                  Mark as Seen
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
