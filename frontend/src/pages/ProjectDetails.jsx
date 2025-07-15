import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
    const { id } = useParams();

    // Temporary dummy data (replace with API call later)
    const project = {
        title: "Build a Modern Portfolio Website",
        description:
            "Looking for a skilled frontend developer to build a responsive, animated portfolio with React and Tailwind.",
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        budget: "$300 - $500",
        postedBy: "soham.agawane",
    };

    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                {project.title}
            </h1>
            <p className="text-gray-600 mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="text-gray-700 mb-2">
                <span className="font-semibold">Budget:</span> {project.budget}
            </div>
            <div className="text-gray-700">
                <span className="font-semibold">Posted by:</span> {project.postedBy}
            </div>
        </div>
    );
}
