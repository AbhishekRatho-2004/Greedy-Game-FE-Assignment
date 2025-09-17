import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export default function AddTodoDrawer({ todo, onClose, refreshTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || localStorage.getItem("admin_token");

  const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log("Fetched users:", res.data.users);
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
      }
    };
  useEffect(()=>{
    fetchUsers();
  },[])

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.desc || todo.description);
      setDueDate(todo.date ? moment(todo.date, "DD/MM/YYYY").format("YYYY-MM-DD") : "");
      setDueTime(todo.time || "");
      setStatus(todo.status.toLowerCase());
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setDueTime("");
      setStatus("pending");
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate || !dueTime) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      title,
      description,
      dueDate,
      dueTime,
      status,
    };

   setLoading(true);
try {
  let res; 
  if (todo && todo._id) {
    
    res = await axios.put(`http://localhost:5000/api/todo/${todo._id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  } else {
    
    res = await axios.post("http://localhost:5000/api/todo", payload, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  }
  console.log(res.data);
  alert("Todo saved successfully ✅");
  onClose();
} catch (err) {
  console.error("Error saving todo:", err.response?.data || err.message);
  alert("Failed to save todo");
} finally {
  setLoading(false);
}
  }

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l z-50 transition-all">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">{todo ? "Edit Todo" : "Add Todo"}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Due Date</label>
            <input
              type="date"
              className="w-full border rounded p-2 mt-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Due Time</label>
            <input
              type="time"
              className="w-full border rounded p-2 mt-1"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>

          {todo &&(
            <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          )}

          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {todo ? "Update Todo" : "+ Create Todo"}
          </button>
        </form>
      </div>
    </div>
  );
}
