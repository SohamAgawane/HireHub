import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/projects");
    } catch (err) {
      console.error("Registration error:", err.response || err.message || err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleLogin = () => {
    const role = form.role || "freelancer";
    window.location.href = `http://localhost:5050/api/auth/google?role=${role}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-600">Create an Account</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="input-field"
          required
        />
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
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input-field"
        >
          <option value="freelancer">Freelancer</option>
          <option value="employer">Employer</option>
        </select>

        <button type="submit" className="btn-primary w-full text-lg">Sign Up</button>

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
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 underline font-medium">Login</a>
        </p>
      </form>
    </div>
  );
}
