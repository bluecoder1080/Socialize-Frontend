import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { resolveImageSrc } from '../ui/Avatar';

const FALLBACK = 'https://i.pravatar.cc/400';

function getGenderEmoji(gender) {
  if (!gender) return '';
  switch (gender.toLowerCase()) {
    case 'male':   return '♂️';
    case 'female': return '♀️';
    default:       return '⚧️';
  }
}

export function FeedCard({ user, onLike, onPass }) {
  const x            = useMotionValue(0);
  const rotate       = useTransform(x, [-200, 200], [-25, 25]);
  const likeOpacity  = useTransform(x, [30, 130], [0, 1]);
  const nopeOpacity  = useTransform(x, [-130, -30], [1, 0]);

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
        className="absolute top-6 left-6 z-20 border-4 border-emerald-400 text-emerald-400 text-xl font-black px-4 py-1.5 rounded-2xl -rotate-12 pointer-events-none"
      >
        ♥ LIKE
      </motion.div>

      {/* NOPE stamp */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-6 right-6 z-20 border-4 border-red-400 text-red-400 text-xl font-black px-4 py-1.5 rounded-2xl rotate-12 pointer-events-none"
      >
        ✕ NOPE
      </motion.div>

      {/* Card body */}
      <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl shadow-pink-200">
        <img
          src={resolveImageSrc(user.profilePhoto || user.photoUrl || FALLBACK)}
          alt={user.firstName || 'User'}
          onError={(e) => { e.target.src = FALLBACK; }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-black leading-tight">
            {user.firstName} {user.lastName}
          </h2>

          {user.gender && (
            <p className="text-sm text-gray-200 mt-0.5 mb-2">
              {getGenderEmoji(user.gender)} {user.gender}
            </p>
          )}

          {user.about && (
            <p className="text-sm text-gray-200 mb-3 line-clamp-2 leading-relaxed">
              {user.about}
            </p>
          )}

          {user.skills && user.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {user.skills.slice(0, 5).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium"
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
