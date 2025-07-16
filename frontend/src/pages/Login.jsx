import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5050/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-600">Welcome Back</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="input-field"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input-field"
          required
        />

        <button type="submit" className="btn-primary w-full text-lg">Login</button>

        <div className="text-center">
          <p className="text-sm text-gray-500 my-2">OR</p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded-md"
          >
            Continue with Google
          </button>
        </div>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-indigo-600 underline font-medium">Register</a>
        </p>
      </form>
    </div>
  );
}
