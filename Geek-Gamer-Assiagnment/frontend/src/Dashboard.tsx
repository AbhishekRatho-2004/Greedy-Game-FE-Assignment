import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: fetch user info from backend
    fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      credentials: "include", // send JWT cookie
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, </p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
