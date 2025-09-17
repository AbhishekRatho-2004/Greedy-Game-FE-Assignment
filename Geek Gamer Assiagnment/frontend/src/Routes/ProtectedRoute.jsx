import { Outlet } from "react-router-dom";

 const ProtectedRoute = ({ allowedRoles }) => {
  // const token = getCookie("token") || getCookie("admin_token");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(token)

  if (!token || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // render child routes
};

export default ProtectedRoute;