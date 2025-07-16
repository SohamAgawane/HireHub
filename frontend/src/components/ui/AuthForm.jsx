import React from "react";

export default function AuthForm({ title, onSubmit, children, error }) {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-indigo-50">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl space-y-4 transform transition-all duration-500"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">{title}</h2>
        {error && (
          <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>
        )}
        {children}
      </form>
    </div>
  );
}
