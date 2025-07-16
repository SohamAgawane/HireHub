import React from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/api";

export default function ProjectCard({ project, onEdit, onDelete, showBids = false, onBidClick }) {
  const { user } = useAuth();
  const { title, description, budget, tags, imageUrl, bids = [], _id: projectId } = project;

  const handleStatusUpdate = async (bidId, status) => {
    try {
      await API.put(`/bids/${bidId}/status`, { status });
      alert(`Bid ${status}`);
      window.location.reload(); // Refresh to show updated status
    } catch (err) {
      console.error("Error updating bid:", err);
      alert("Failed to update bid status");
    }
  };

  return (
    <div className="indigo-50 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl.startsWith("http") ? imageUrl : `http://localhost:5050${imageUrl}`}
          alt={title}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-700 mt-1 flex-grow line-clamp-3">{description}</p>

      {/* Budget */}
      <div className="text-sm text-gray-700 dark:text-gray-700 mt-2">
        <strong>Budget:</strong> ₹{budget}
      </div>

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bids for Employer */}
      {showBids && bids.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Bids Received:</h4>
          <ul className="space-y-3 max-h-40 overflow-y-auto pr-1">
            {bids.map((bid) => (
              <li key={bid._id} className="text-xs text-gray-700 dark:text-gray-300 border rounded px-2 py-2 space-y-1">
                <div>
                  <strong>{bid.freelancer?.name || "Freelancer"}:</strong> {bid.proposal}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Bid: ₹{bid.bidAmount}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${bid.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : bid.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {bid.status}
                  </span>
                </div>

                {bid.status === "pending" && user?.role === "employer" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleStatusUpdate(bid._id, "accepted")}
                      className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(bid._id, "rejected")}
                      className="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bid Button (Freelancer) */}
      {user && !showBids && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onBidClick(project)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Bid
          </button>
        </div>
      )}

      {/* Edit/Delete Buttons */}
      {(user?.role === "employer") && (onEdit || onDelete) && (
        <div className="flex justify-end gap-4 mt-4">
          {onEdit && (
            <button onClick={onEdit} className="text-sm text-indigo-600 hover:underline">Edit</button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="text-sm text-red-500 hover:underline">Delete</button>
          )}
        </div>
      )}
    </div>
  );
}
