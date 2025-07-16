// src/pages/PostProject.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectCard from "../components/ui/ProjectCard";

export default function PostProject() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);

    const isEmployer = user?.role === "employer";

    useEffect(() => {
        if (isEmployer) {
            fetchEmployerProjects();
        }
    }, [user]);

    const fetchEmployerProjects = async () => {
        try {
            const res = await axios.get("/api/projects/my", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log("Fetched employer projects:", res.data); // Debug log

            if (Array.isArray(res.data)) {
                setProjects(res.data);
            } else {
                setProjects([]); // prevent crash
                console.error("Expected array but got:", res.data);
            }
        } catch (err) {
            console.error("Error fetching employer projects", err);
            setProjects([]); // prevent crash
        }
    };

    const handleCreateOrUpdate = async (formData) => {
        setLoading(true);
        try {
            const isEditing = !!editData;

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };

            if (isEditing) {
                await axios.put(`/api/projects/${editData._id}`, formData, config);
            } else {
                await axios.post("/api/projects", formData, config);
            }

            await fetchEmployerProjects();
            setShowForm(false); // Close modal
            setEditData(null);
        } catch (err) {
            console.error("Project submission failed", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await axios.delete(`/api/projects/${id}`);
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.error("Failed to delete project", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-10">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Post Projects
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        View, manage, and create your freelance projects. See who has placed bids.
                    </p>
                </div>

                {/* Create Project Button */}
                <div className="text-right">
                    <button
                        onClick={() => {
                            setEditData(null);
                            setShowForm(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium shadow-sm transition"
                    >
                        + Create New Project
                    </button>
                </div>

                {/* Modal: Create/Edit Form */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-xl mx-auto border border-indigo-100 dark:border-gray-700">
                            <ProjectForm
                                initialValues={editData}
                                onSubmit={handleCreateOrUpdate}
                                onClose={() => {
                                    setShowForm(false);
                                    setEditData(null);
                                }}
                                isSubmitting={loading}
                                useFileUpload
                            />
                        </div>
                    </div>
                )}

                {/* Posted Projects Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {projects.length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center italic">
                            You haven’t posted any projects yet.
                        </p>
                    ) : (
                        projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                onEdit={() => {
                                    setEditData(project);
                                    setShowForm(true);
                                }}
                                onDelete={() => handleDelete(project._id)}
                                showBids
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
