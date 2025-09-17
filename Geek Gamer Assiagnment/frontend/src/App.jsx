import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import TodoDashboard from "./Pages/User/TodoDashboard";
import UserManagement from "./UserManagement"; // Admin page
import ProtectedRoute from "./Routes/ProtectedRoute";
import SuperUserDashboard from "./Pages/Admin/SuperUserDashboard";
import DashboardPage from "./Pages/Admin/DashboardPage";
import UsersPage from "./Pages/Admin/UserPage";


const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
  

         <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/dashboard" element={<TodoDashboard />} />
         </Route>

          <Route path="/superuser" element={<SuperUserDashboard />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
       
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
