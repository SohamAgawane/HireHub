import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ui/ProjectCard";
import { useAuth } from "../context/AuthContext";
import BidModal from "../components/projects/BidModal";
import axios from "axios";

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const handleBidClick = (project) => {
    setSelectedProject(project);
    setIsBidModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-16 flex flex-col items-center">
      {/* Centered Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl sm:text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Projects
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl text-base">
          Discover freelance opportunities and bid on projects that match your skills.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {projects.length === 0 ? (
          <p className="text-center text-gray-500 italic col-span-full">No projects found.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onBidClick={handleBidClick}
            />
          ))
        )}
      </div>

      {/* Bid Modal */}
      {isBidModalOpen && selectedProject && (
        <BidModal
          project={selectedProject}
          onClose={() => setIsBidModalOpen(false)}
          onBidSuccess={fetchProjects}
        />
      )}
    </div>
  );
}
