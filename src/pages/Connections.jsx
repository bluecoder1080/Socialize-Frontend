import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useConnections } from "../hooks/useConnections";
import { FullPageSpinner, EmptyState, Avatar } from "../components/ui";

export default function Connections() {
  const { connections, loading } = useConnections();

  if (loading) return <FullPageSpinner text="loading connections..." />;

  return (
    <div className="min-h-screen bg-ui pb-12 text-[#f5f0e8]">
      <div className="mx-auto max-w-2xl px-4 pt-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] border border-ui bg-[#1a1a17]">
            <Users className="h-5 w-5 text-[#e8ff3b]" />
          </div>
          <div>
            <p className="ui-kicker text-[#6b6b5e]">[ connections ]</p>
            <h1 className="mt-2 font-mono-display text-2xl uppercase tracking-[-0.04em]">
              My connections
            </h1>
            <p className="mt-1 text-sm text-[#6b6b5e]">
              {connections.length} connections
            </p>
          </div>
        </div>

        {/* Empty state */}
        {connections.length === 0 && (
          <EmptyState
            emoji="[_]"
            title="No connections yet"
            description="Start browsing to find people who want to build with you."
          >
            <Link
              to="/feed"
              className="button-accent mt-4 inline-flex items-center gap-2 px-6 py-3 font-mono-ui text-[10px] uppercase tracking-[0.28em]"
            >
              Start Browsing
            </Link>
          </EmptyState>
        )}

        {/* Connections grid */}
        {connections.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {connections.map(function (conn, i) {
              return (
                <motion.div
                  key={conn._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="surface p-4 text-center"
                >
                  <div className="mx-auto mb-3 flex justify-center">
                    <Avatar
                      src={conn.photoUrl || conn.profilePhoto}
                      alt={conn.FirstName}
                      size="lg"
                      online={true}
                    />
                  </div>
                  <p className="font-bold text-sm text-gray-800 truncate">
                    {conn.FirstName} {conn.LastName}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[#e8ff3b]">
                    connected
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
