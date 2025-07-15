import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-indigo-50 to-white text-gray-500 text-sm px-6 py-4 border-t border-indigo-100">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-700">HireHub</span>. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            to="/privacy"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
