import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // or "admin_token"
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("userId", res.data.id);
  }
  return res.data;
};

export const signup = (name, email, password,role) =>
  API
    .post("/auth/register", { name, email, password, role })
    .then((res) => res.data);

export const logout = () =>
  API
    .post("/auth/logout")
    .then((res) => {
        localStorage.removeItem("token");
        return res.data;
  });