import React from "react";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui";

function genderEmoji(g) {
  if (g === "male") return "♂️";
  if (g === "female") return "♀️";
  return "⚧️";
}

export default function ProfileView({ onEdit }) {
  const { user } = useAuth();
  if (!user) return null;

  const skills = Array.isArray(user.Skills) ? user.Skills : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="glass rounded-3xl p-8 shadow-2xl shadow-pink-100">
        {/* Avatar + identity */}
        <div className="flex flex-col items-center mb-6">
          <div className="ring-4 ring-pink-300 ring-offset-4 rounded-full shadow-2xl shadow-pink-200 mb-4">
            <Avatar src={user.photoUrl || user.profilePhoto} alt={user.FirstName} size="xl" />
          </div>

          <h2 className="text-3xl font-black text-gradient mb-1">
            {user.FirstName} {user.LastName}
          </h2>

          {user.Gender && (
            <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium capitalize mb-1">
              {genderEmoji(user.Gender)} {user.Gender}
            </span>
          )}

          <p className="text-gray-400 text-sm">{user.EmailId}</p>
        </div>

        {/* About */}
        {user.About && (
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              About
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {user.About}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map(function (skill) {
                return (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm border border-pink-200 font-medium"
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Edit button */}
        <Button variant="secondary" onClick={onEdit} className="w-full">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </motion.div>
  );
}
