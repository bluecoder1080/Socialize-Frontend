import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { resolveImageSrc } from "../ui/Avatar";

const FALLBACK = "https://i.pravatar.cc/400";

function getGenderEmoji(gender) {
  if (!gender) return "";
  switch (gender.toLowerCase()) {
    case "male":
      return "♂️";
    case "female":
      return "♀️";
    default:
      return "⚧️";
  }
}

export function FeedCard({ user, onLike, onPass }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const likeOpacity = useTransform(x, [30, 130], [0, 1]);
  const nopeOpacity = useTransform(x, [-130, -30], [1, 0]);
  const firstName = user?.FirstName || user?.firstName || "User";
  const lastName = user?.LastName || user?.lastName || "";
  const gender = user?.Gender || user?.gender;
  const about = user?.About || user?.about;
  const skills = Array.isArray(user?.Skills)
    ? user.Skills
    : Array.isArray(user?.skills)
      ? user.skills
      : [];

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      onLike && onLike();
    } else if (info.offset.x < -100) {
      onPass && onPass();
    }
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
    >
      {/* LIKE stamp */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-4 left-4 z-20 border border-[#e8ff3b] bg-[#0f0f0d]/90 text-[#e8ff3b] text-[10px] font-mono-ui px-3 py-1 rounded-[4px] -rotate-12 pointer-events-none"
      >
        LIKE
      </motion.div>

      {/* NOPE stamp */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-4 right-4 z-20 border border-[#ff4f1a] bg-[#0f0f0d]/90 text-[#ff4f1a] text-[10px] font-mono-ui px-3 py-1 rounded-[4px] rotate-12 pointer-events-none"
      >
        NOPE
      </motion.div>

      {/* Card body */}
      <div className="relative h-full rounded-[4px] overflow-hidden border border-[#2a2a24] bg-[#1a1a17]">
        <img
          src={resolveImageSrc(user.profilePhoto || user.photoUrl || FALLBACK)}
          alt={firstName}
          onError={(e) => {
            e.target.src = FALLBACK;
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0d]/95 via-[#0f0f0d]/35 to-transparent" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-[#f5f0e8]">
          <h2 className="text-3xl font-black leading-tight font-mono-ui">
            {firstName} {lastName}
          </h2>

          {gender && (
            <p className="text-xs text-[#bcb7ad] mt-0.5 mb-2 font-mono-ui uppercase tracking-[0.24em]">
              {getGenderEmoji(gender)} {gender}
            </p>
          )}

          {about && (
            <p className="text-sm text-[#f5f0e8]/90 mb-3 line-clamp-2 leading-relaxed">
              {about}
            </p>
          )}

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 5).map((skill, i) => (
                <span
                  key={i}
                  className="badge-square bg-[#1a1a17] text-[#e8ff3b]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
