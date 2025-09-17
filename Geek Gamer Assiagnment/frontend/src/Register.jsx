import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { signup } from "./Apis/Auth";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    try {
      const res = await signup(name, email, password);
      console.log(res);

      alert("Signup successful 🎉 Please login now.");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again!");
      console.error(err);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex h-screen">
    
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Library"
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <h1 className="text-2xl font-bold text-center">GREEDYGAME</h1>
          <h2 className="mt-6 text-2xl font-semibold text-center">
            You are one click away from less busy work
          </h2>
          <p className="text-gray-500 text-center mb-6">
            To get started, please sign up
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

        
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 w-full border rounded-lg py-2 hover:bg-gray-50"
          >
            <FaGoogle className="text-red-500" />
            <span>Sign Up with Google</span>
          </button>

         
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-2 text-gray-400">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

       
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

      
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <EyeOffIcon
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                />
              )}
            </div>
          </div>

        
          <button
            onClick={handleRegister}
            className="w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
