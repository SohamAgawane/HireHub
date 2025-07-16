import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function BlogDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await API.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                setError("Blog not found");
            }
        };

        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this blog?")) {
            try {
                await API.delete(`/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                navigate("/blogs");
            } catch (err) {
                alert("Failed to delete blog");
            }
        }
    };

    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-4xl mx-auto space-y-4 bg-white rounded-xl shadow p-8 border">
                <h1 className="text-4xl font-extrabold text-gray-900">{blog.title}</h1>
                <p className="text-sm text-gray-500">
                    By {blog.author?.name || "Unknown"} •{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>

                {blog.imageUrl && (
                    <img
                        src={blog.imageUrl}
                        alt="Blog visual"
                        className="w-full h-64 object-cover rounded-lg my-6"
                    />
                )}

                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                    {blog.content}
                </p>

                {user?.email === import.meta.env.VITE_ADMIN_EMAIL && (
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            className="text-sm px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
                            onClick={() => alert("TODO: Open update blog modal")}
                        >
                            Edit
                        </button>
                        <button
                            className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
