import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { signup } from "../../Apis/Auth";

export default function AddUserDrawer({ onClose, refreshUsers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("admin_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const res = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    , token);
      alert("User registered successfully!");
      refreshUsers(); 
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="w-96 bg-white shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Role Switch */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Admin</span>
            <Switch
              checked={formData.role === "admin"}
              onChange={(val) =>
                setFormData({ ...formData, role: val ? "admin" : "user" })
              }
              className={`${
                formData.role === "admin" ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  formData.role === "admin"
                    ? "translate-x-6"
                    : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
