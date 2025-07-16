import React, { useState } from "react";
import API from "../../utils/api";
import { useAuth } from "../../context/AuthContext"; // import auth context to access token

export default function BidModal({ project, onClose, onBidSuccess }) {
  const [proposal, setProposal] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const { user } = useAuth(); // get user from context

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        `/bids/${project._id}`, // ✅ Correct route
        {
          bidAmount: Number(bidAmount),
          proposal,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // ✅ Auth token
          },
        }
      );

      onBidSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error submitting bid:", err.response?.data || err.message || err);
      alert("Failed to submit bid");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Submit Bid for: {project.title}
        </h2>
        <form onSubmit={handleBidSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Your Bid Amount (₹)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            className="input-field"
          />
          <textarea
            rows="4"
            placeholder="Proposal Message"
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            required
            className="input-field"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Submit Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
