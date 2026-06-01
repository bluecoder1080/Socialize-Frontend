import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Bell } from "lucide-react";
import { useRequests } from "../hooks/useRequests";
import { FullPageSpinner, EmptyState, Avatar } from "../components/ui";

export default function Requests() {
  const { requests, loading, reviewRequest } = useRequests();

  if (loading) return <FullPageSpinner text="Loading requests... 💌" />;

  const pendingCount = requests.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-12">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200 flex-shrink-0">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-800">
              Connection Requests
            </h1>
            <p className="text-gray-400 text-sm">{pendingCount} pending</p>
          </div>
          {pendingCount > 0 && (
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md shadow-pink-200">
              {pendingCount}
            </span>
          )}
        </div>

        {/* Empty state */}
        {requests.length === 0 && (
          <EmptyState
            emoji="💌"
            title="No pending requests"
            description="When someone likes you, they'll appear here!"
          />
        )}

        {/* Request list */}
        <div className="space-y-3">
          <AnimatePresence>
            {requests.map(function (req) {
              const sender = req.fromUserId || req.sender || {};
              return (
                <motion.div
                  key={req._id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: -20,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4"
                >
                  <Avatar
                    src={sender.photoUrl || sender.profilePhoto}
                    alt={sender.FirstName}
                    size="md"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">
                      {sender.FirstName} {sender.LastName}
                    </p>
                    {sender.Gender && (
                      <span className="inline-block text-xs text-pink-500 capitalize bg-pink-50 px-2 py-0.5 rounded-full mt-0.5">
                        {sender.Gender}
                      </span>
                    )}
                    {sender.About && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {sender.About}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Reject */}
                    <button
                      onClick={function () {
                        reviewRequest(req._id, "rejected");
                      }}
                      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-rose-500 hover:shadow-lg transition-all"
                      title="Decline"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {/* Accept */}
                    <button
                      onClick={function () {
                        reviewRequest(req._id, "accepted");
                      }}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-200 flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all"
                      title="Accept"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
