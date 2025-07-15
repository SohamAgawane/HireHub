import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="w-full px-6 py-4 bg-white text-gray-800 shadow-sm border-b border-gray-200 flex justify-between items-center">
      <NavLink
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        HireHub
      </NavLink>

      <div className="flex items-center gap-6">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `relative group text-sm font-medium ${
                isActive ? "text-indigo-600" : "text-gray-600"
              }`
            }
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
