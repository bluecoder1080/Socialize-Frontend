import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useConnections } from "../hooks/useConnections";
import { FullPageSpinner, EmptyState, Avatar } from "../components/ui";

export default function Connections() {
  const { connections, loading } = useConnections();

  if (loading) return <FullPageSpinner text="Loading connections... 💕" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-12">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200 flex-shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800">
              My Connections
            </h1>
            <p className="text-gray-400 text-sm">
              {connections.length} connections
            </p>
          </div>
        </div>

        {/* Empty state */}
        {connections.length === 0 && (
          <EmptyState
            emoji="💔"
            title="No connections yet"
            description="Start swiping to find your perfect match!"
          >
            <Link
              to="/feed"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-pink-200 hover:scale-105 transition-all text-sm mt-4"
            >
              Start Swiping 💕
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
                  className="glass rounded-2xl p-4 text-center"
                >
                  <div className="mx-auto mb-3 flex justify-center">
                    <Avatar
                      src={conn.photoUrl}
                      alt={conn.FirstName}
                      size="lg"
                      online={true}
                    />
                  </div>
                  <p className="font-bold text-sm text-gray-800 truncate">
                    {conn.FirstName} {conn.LastName}
                  </p>
                  <p className="text-pink-500 text-xs mt-0.5">Connected 💕</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
