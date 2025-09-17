import React from "react";

export default function DashboardStats({ all = 0, upcoming = 0, completed = 0 }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-white rounded-lg shadow text-center">
        <p className="text-gray-500 text-sm">All Todos</p>
        <p className="text-xl font-bold">{all}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow text-center">
        <p className="text-gray-500 text-sm">Upcoming</p>
        <p className="text-xl font-bold">{upcoming}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow text-center">
        <p className="text-gray-500 text-sm">Completed</p>
        <p className="text-xl font-bold">{completed}</p>
      </div>
    </div>
  );
}
