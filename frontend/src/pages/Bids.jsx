// src/pages/Bids.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function Bids() {
    const [bids, setBids] = useState([]);
    const [editingBidId, setEditingBidId] = useState(null);
    const [editedBidAmount, setEditedBidAmount] = useState("");
    const [editedProposal, setEditedProposal] = useState("");

    useEffect(() => {
        fetchMyBids();
    }, []);

    const fetchMyBids = async () => {
        try {
            const res = await API.get("/bids/my");
            setBids(res.data);
        } catch (err) {
            console.error("Error fetching bids:", err);
        }
    };

    const handleWithdraw = async (bidId) => {
        try {
            await API.delete(`/bids/${bidId}`);
            fetchMyBids();
        } catch (err) {
            console.error("Failed to withdraw bid:", err);
        }
    };

    const handleEditClick = (bid) => {
        setEditingBidId(bid._id);
        setEditedBidAmount(bid.bidAmount);
        setEditedProposal(bid.proposal);
    };

    const handleEditSubmit = async (bidId) => {
        try {
            await API.put(`/bids/${bidId}`, {
                bidAmount: Number(editedBidAmount),
                proposal: editedProposal,
            });
            setEditingBidId(null);
            fetchMyBids();
        } catch (err) {
            console.error("Failed to update bid:", err);
        }
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-white via-indigo-50 to-purple-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    My Bids
                </h1>

                {bids.length === 0 ? (
                    <p className="text-gray-500 text-center italic">
                        You haven’t placed any bids yet.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {bids.map((bid) => (
                            <div
                                key={bid._id}
                                className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex flex-col"
                            >
                                {/* Project Image */}
                                {bid.project?.imageUrl && (
                                    <img
                                        src={
                                            bid.project.imageUrl.startsWith("http")
                                                ? bid.project.imageUrl
                                                : `http://localhost:5050${bid.project.imageUrl}`
                                        }
                                        alt={bid.project.title}
                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                )}

                                {/* Title and Status */}
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 line-clamp-1">
                                        {bid.project?.title}
                                    </h3>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${bid.status === "accepted"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                : bid.status === "rejected"
                                                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                            }`}
                                    >
                                        {bid.status}
                                    </span>
                                </div>

                                {/* Tags */}
                                {bid.project?.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-1 mb-2">
                                        {bid.project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white text-xs px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Proposal + Amount */}
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">{bid.proposal}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    <strong>Bid Amount:</strong> ₹{bid.bidAmount}
                                </p>

                                {/* Edit & Withdraw */}
                                <div className="flex justify-end gap-4 mt-3">
                                    <button
                                        onClick={() => handleEditClick(bid)}
                                        className="text-xs text-indigo-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleWithdraw(bid._id)}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}
