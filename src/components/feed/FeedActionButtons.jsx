import React from 'react';
import { X, Heart } from 'lucide-react';

export function FeedActionButtons({ onLike, onPass }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-8">
        {/* Pass button */}
        <button
          onClick={onPass}
          className="group w-16 h-16 bg-white rounded-full shadow-xl border border-gray-100 hover:scale-110 hover:border-red-200 transition-all duration-200 flex items-center justify-center"
          aria-label="Pass"
        >
          <X size={24} className="text-gray-300 group-hover:text-red-400 transition-colors" />
        </button>

        {/* Like button */}
        <button
          onClick={onLike}
          className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full shadow-2xl shadow-pink-300 hover:scale-110 transition-all duration-200 flex items-center justify-center"
          aria-label="Like"
        >
          <Heart size={30} className="fill-white text-white" />
        </button>
      </div>

      <p className="text-gray-300 text-xs select-none">
        💡 Drag left to pass · drag right to like
      </p>
    </div>
  );
}
