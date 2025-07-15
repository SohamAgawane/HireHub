import React from "react";
import ProjectCard from "../components/ui/ProjectCard";
import { featuredProjects } from "../constants"; // temporary dummy data

export default function Projects() {
  return (
    <div className="bg-gradient-to-b from-white via-indigo-50 to-white py-24 px-6 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Explore Projects
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover exciting freelance opportunities and find the perfect match for your skills and experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
