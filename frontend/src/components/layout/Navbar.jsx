import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNavLinks = () => {
    const links = [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: "Blogs", path: "/blogs" },
    ];

    if (user?.role === "freelancer") {
      links.push({ name: "My Bids", path: "/my-bids" });
      links.push({ name: "Dashboard", path: "/dashboard" });
    }

    if (user?.role === "employer") {
      links.push({ name: "Post Project", path: "/post-project" });
      links.push({ name: "Dashboard", path: "/dashboard" });
    }

    if (!user) {
      links.push({ name: "Login", path: "/login" });
      links.push({ name: "Register", path: "/register" });
    }

    return links;
  };

  return (
    <nav className="w-full px-6 py-4 bg-white text-gray-800 shadow-sm border-b border-gray-200 flex justify-between items-center">
      <NavLink
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        HireHub
      </NavLink>

      <div className="flex items-center gap-6">
        {getNavLinks().map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `relative group text-sm font-medium ${isActive ? "text-indigo-600" : "text-gray-600"
              }`
            }
          >
            {link.name}
            <span
              className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${link.name === "Logout" ? "bg-red-500" : "bg-indigo-500"
                }`}
            ></span>
          </NavLink>
        ))}

        {user && (
          <>
            <span className="text-sm text-gray-600">Hi, {user.name.split(" ")[0]}</span>
            <button
              onClick={handleLogout}
              className="relative group text-sm font-medium text-red-600"
            >
              Logout
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
