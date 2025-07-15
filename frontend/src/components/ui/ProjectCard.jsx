import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/project/${project._id}`}
      className="group block border border-indigo-100 rounded-2xl p-6 bg-white/90 hover:bg-indigo-50/50 backdrop-blur-sm transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-indigo-300"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700 transition duration-300">
          {project.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full group-hover:bg-indigo-200 transition"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition">
          Budget: {project.budget}
        </div>
      </div>
    </Link>
  );
}
