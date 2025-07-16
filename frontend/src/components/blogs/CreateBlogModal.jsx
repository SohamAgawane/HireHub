import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/api";

export default function CreateBlogModal({ onClose, onCreated, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    imageUrl: initialData?.imageUrl || "",
  });
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      imageUrl: form.imageUrl.trim() || undefined,
    };

    try {
      let res;
      if (initialData) {
        // PUT request to update an existing blog
        res = await API.put(`/blogs/${initialData._id}`, payload);
      } else {
        // POST request to create a new blog
        res = await API.post("/blogs", payload);
      }

      onCreated(res.data); // Pass new blog or updated blog to parent
      onClose(); // Close modal
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create/update blog");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {initialData ? "Edit Blog" : "Create New Blog"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            className="input-field"
            required
            ref={titleRef}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={handleChange}
            className="input-field"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog content..."
            className="input-field"
            rows="5"
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
