import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFeed } from "../hooks/useFeed";
import { FeedCard } from "../components/feed/FeedCard";
import { FeedActionButtons } from "../components/feed/FeedActionButtons";
import { FullPageSpinner } from "../components/ui/Spinner";
import { resolveImageSrc } from "../components/ui/Avatar";

const FALLBACK = "https://i.pravatar.cc/400";

export default function Feed() {
  const { users, loading, handleAction, exitX } = useFeed();
  const top = users[0];
  const next = users[1];

  if (loading) return <FullPageSpinner text="locating builders..." />;

  return (
    <div className="min-h-screen bg-ui pb-12 text-[#f5f0e8]">
      <div className="mx-auto max-w-md px-4 pt-8">
        <div className="mb-8">
          <p className="ui-kicker text-[#6b6b5e]">[ discover ]</p>
          <h1 className="mt-3 font-mono-display text-3xl uppercase tracking-[-0.04em]">
            People who want to ship.
          </h1>
          <p className="mt-2 text-sm text-[#6b6b5e]">
            {users.length > 0
              ? `${users.length} profiles left in the stack`
              : "No more profiles"}
          </p>
        </div>

        {/* Card stack */}
        <div className="relative mb-8 h-[520px]">
          {/* Back card preview */}
          {next && (
            <div
              className="absolute inset-4 top-6 overflow-hidden rounded-[4px] border border-ui opacity-60"
              style={{ transform: "scale(0.93)" }}
            >
              <img
                src={resolveImageSrc(
                  next.photoUrl || next.profilePhoto || FALLBACK,
                )}
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
                className="absolute inset-0 surface flex flex-col items-center justify-center gap-4 px-6 text-center"
              >
                <span className="text-5xl text-[#e8ff3b]">&gt;_</span>
                <h3 className="font-mono-display text-xl uppercase tracking-[-0.04em]">
                  All caught up.
                </h3>
                <p className="text-sm text-[#6b6b5e]">
                  Check back later for more builders.
                </p>
                <Link
                  to="/connections"
                  className="button-accent mt-2 px-6 py-3 font-mono-ui text-[10px] uppercase tracking-[0.28em]"
                >
                  View Connections
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
