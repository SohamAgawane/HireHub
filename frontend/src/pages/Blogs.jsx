import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import BlogCard from "../components/blogs/BlogCard";
import CreateBlogModal from "../components/blogs/CreateBlogModal";

export default function Blogs() {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;

    // Fetch all blogs
    const fetchBlogs = async () => {
        try {
            const res = await API.get("/blogs");
            setBlogs(res.data);
        } catch (err) {
            setError("Failed to load blogs");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Add new blog to list or update existing one
    const handleBlogCreated = (newBlog) => {
        setBlogs((prevBlogs) => [newBlog, ...prevBlogs]); // ✅ safe way
        setShowModal(false); // close modal
    };

    // Handle Blog Deletion
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await API.delete(`/blogs/${id}`);
            setBlogs((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    // Handle Blog Edit
    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setShowModal(true); // Open modal for editing
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Blogs
                    </h1>
                    {isAdmin && (
                        <button
                            onClick={() => {
                                setEditingBlog(null); // Ensure no pre-filled data when creating a new blog
                                setShowModal(true); // Open modal for creating
                            }}
                            className="btn-primary self-center sm:self-auto"
                        >
                            + Create Blog
                        </button>
                    )}
                </div>

                {/* Error Handling */}
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                {/* Grid to display blogs */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            onEdit={isAdmin ? handleEdit : undefined}
                            onDelete={isAdmin ? handleDelete : undefined}
                        />
                    ))}
                </div>

                {/* Modal for Creating or Editing Blog */}
                {isAdmin && showModal && (
                    <CreateBlogModal
                        initialData={editingBlog} // prefill data if editing
                        onClose={() => {
                            setShowModal(false);
                            setEditingBlog(null); // Reset editing state
                        }}
                        onCreated={(updatedBlog) => {
                            setBlogs((prevBlogs) =>
                                editingBlog
                                    ? prevBlogs.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
                                    : [updatedBlog, ...prevBlogs]
                            );
                            setShowModal(false); // Close modal after creation or update
                            setEditingBlog(null); // Reset editing state
                        }}
                    />
                )}
            </div>
        </div>
    );
}
