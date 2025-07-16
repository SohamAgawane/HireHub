import React, { useEffect, useState } from "react";
import InputField from "../common/InputField";

const defaultValues = {
    title: "",
    description: "",
    budget: "",
    tags: "",
};

export default function ProjectForm({
    initialValues = null,
    onSubmit,
    onClose,
    isSubmitting,
}) {
    const [formData, setFormData] = useState(defaultValues);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (initialValues) {
            setFormData({
                title: initialValues.title || "",
                description: initialValues.description || "",
                budget: initialValues.budget || "",
                tags: initialValues.tags?.join(", ") || "",
            });
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("budget", formData.budget);
        data.append("tags", formData.tags);
        if (imageFile) {
            data.append("image", imageFile); // this name must match multer field
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-center mb-4">
                {initialValues ? "Edit Project" : "Create Project"}
            </h2>

            <InputField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Project description"
                    rows={4}
                    required
                    className="w-full p-3 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
            </div>

            <InputField
                label="Budget (₹)"
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter budget"
                required
            />

            <InputField
                label="Tags (comma-separated)"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. react, frontend"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Upload Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {isSubmitting
                        ? "Submitting..."
                        : initialValues
                            ? "Update Project"
                            : "Create Project"}
                </button>
            </div>
        </form>
    );
}
