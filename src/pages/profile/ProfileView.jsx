import React from "react";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui";

function genderLabel(gender) {
  if (gender === "male") return "male";
  if (gender === "female") return "female";
  return gender || "unspecified";
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
      <div className="surface-soft p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 rounded-[4px] border border-ui p-0.5">
            <Avatar
              src={user.photoUrl || user.profilePhoto}
              alt={user.FirstName}
              size="xl"
            />
          </div>

          <h2 className="font-mono-display text-3xl uppercase tracking-[-0.04em] text-[#f5f0e8]">
            {user.FirstName} {user.LastName}
          </h2>

          {user.Gender && (
            <span className="badge-square mt-2 bg-[#1a1a17] text-[#e8ff3b]">
              {genderLabel(user.Gender)}
            </span>
          )}

          <p className="mt-3 text-sm text-[#6b6b5e]">{user.EmailId}</p>
        </div>

        {user.About && (
          <div className="mb-6">
            <p className="ui-kicker mb-2 text-[#6b6b5e]">About</p>
            <p className="text-sm leading-7 text-[#d8d3c6]">{user.About}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-8">
            <p className="ui-kicker mb-2 text-[#6b6b5e]">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="badge-square bg-[#1a1a17] text-[#e8ff3b]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button variant="secondary" onClick={onEdit} className="w-full">
          <Edit3 className="mr-2 h-4 w-4" />
          Edit profile
        </Button>
      </div>
    </motion.div>
  );
}
