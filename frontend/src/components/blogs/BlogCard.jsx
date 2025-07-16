// src/components/blogs/BlogCard.jsx
import React from "react";

export default function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <div className="rounded-xl shadow-md bg-white border border-gray-200 overflow-hidden flex flex-col justify-between">
      {/* Optional image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
        <p className="text-xs text-right text-gray-400 mt-4">
          By {blog.author?.name || "Unknown"} on{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex justify-end gap-3 px-4 pb-4">
          {onEdit && (
            <button
              onClick={() => onEdit(blog)}
              className="text-sm text-indigo-600 hover:underline"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(blog._id)}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
