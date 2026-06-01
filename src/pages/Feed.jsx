import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFeed } from "../hooks/useFeed";
import { FeedCard } from "../components/feed/FeedCard";
import { FeedActionButtons } from "../components/feed/FeedActionButtons";
import { FullPageSpinner } from "../components/ui/Spinner";

const FALLBACK = "https://i.pravatar.cc/400";

export default function Feed() {
  const { users, loading, handleAction, exitX } = useFeed();
  const top = users[0];
  const next = users[1];

  if (loading) return <FullPageSpinner text="Finding amazing people... 💕" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-12">
      <div className="max-w-md mx-auto px-4 pt-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-gradient mb-1">
            Discover People
          </h1>
          <p className="text-gray-400 text-sm">
            {users.length > 0
              ? users.length + " people left to explore"
              : "No more profiles"}
          </p>
        </div>

        {/* Card stack */}
        <div className="relative h-[520px] mb-8">
          {/* Back card preview */}
          {next && (
            <div
              className="absolute inset-4 top-6 rounded-3xl overflow-hidden opacity-60"
              style={{ transform: "scale(0.93)" }}
            >
              <img
                src={next.photoUrl || FALLBACK}
                alt={next.FirstName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          )}

          {/* Front card with swipe exit */}
          <AnimatePresence>
            {top ? (
              <motion.div
                key={top._id}
                className="absolute inset-0"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  x: exitX.current,
                  opacity: 0,
                  rotate: exitX.current > 0 ? 30 : -30,
                  transition: { duration: 0.3 },
                }}
              >
                <FeedCard
                  user={top}
                  onLike={function () {
                    handleAction(top._id, "interested");
                  }}
                  onPass={function () {
                    handleAction(top._id, "ignored");
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 glass rounded-3xl flex flex-col items-center justify-center gap-4 text-center px-6"
              >
                <span className="text-7xl">🌟</span>
                <h3 className="text-xl font-bold text-gray-700">
                  All caught up!
                </h3>
                <p className="text-gray-400 text-sm">
                  Check back later for more amazing people
                </p>
                <Link
                  to="/connections"
                  className="mt-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-pink-200 hover:scale-105 transition-all text-sm"
                >
                  View Connections 💕
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        {top && (
          <FeedActionButtons
            onLike={function () {
              handleAction(top._id, "interested");
            }}
            onPass={function () {
              handleAction(top._id, "ignored");
            }}
          />
        )}
      </div>
    </div>
  );
}
