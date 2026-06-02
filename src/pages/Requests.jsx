import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Bell } from "lucide-react";
import { useRequests } from "../hooks/useRequests";
import { FullPageSpinner, EmptyState, Avatar } from "../components/ui";

export default function Requests() {
  const { requests, loading, reviewRequest } = useRequests();

  if (loading) return <FullPageSpinner text="loading requests..." />;

  const pendingCount = requests.length;

  return (
    <div className="min-h-screen bg-ui pb-12 text-[#f5f0e8]">
      <div className="mx-auto max-w-lg px-4 pt-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] border border-ui bg-[#1a1a17]">
            <Bell className="h-5 w-5 text-[#e8ff3b]" />
          </div>
          <div className="flex-1">
            <p className="ui-kicker text-[#6b6b5e]">[ requests ]</p>
            <h1 className="mt-2 font-mono-display text-2xl uppercase tracking-[-0.04em]">
              Connection requests
            </h1>
            <p className="mt-1 text-sm text-[#6b6b5e]">
              {pendingCount} pending
            </p>
          </div>
          {pendingCount > 0 && (
            <span className="badge-square bg-[#e8ff3b] text-[#0f0f0d] border-[#e8ff3b]">
              {pendingCount}
            </span>
          )}
        </div>

        {/* Empty state */}
        {requests.length === 0 && (
          <EmptyState
            emoji="[ ]"
            title="No pending requests"
            description="When someone likes you, the request will appear here."
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
                  className="surface flex items-center gap-4 p-4"
                >
                  <Avatar
                    src={sender.photoUrl || sender.profilePhoto}
                    alt={sender.FirstName}
                    size="md"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-bold text-[#f5f0e8]">
                      {sender.FirstName} {sender.LastName}
                    </p>
                    {sender.Gender && (
                      <span className="badge-square mt-1 bg-[#1a1a17] text-[#e8ff3b]">
                        {sender.Gender}
                      </span>
                    )}
                    {sender.About && (
                      <p className="mt-1 truncate text-xs text-[#6b6b5e]">
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
                      className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-ui bg-[#1a1a17] text-[#6b6b5e] transition-colors hover:text-[#ff4f1a]"
                      title="Decline"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {/* Accept */}
                    <button
                      onClick={function () {
                        reviewRequest(req._id, "accepted");
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#e8ff3b] bg-[#e8ff3b] text-[#0f0f0d] transition-transform hover:scale-105"
                      title="Accept"
                    >
                      <Heart className="w-4 h-4" />
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
