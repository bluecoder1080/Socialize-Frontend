import React from "react";
import { X, Heart } from "lucide-react";

export function FeedActionButtons({ onLike, onPass }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-6">
        {/* Pass button */}
        <button
          onClick={onPass}
          className="group w-14 h-14 bg-[#1a1a17] rounded-[4px] border border-[#2a2a24] hover:border-[#ff4f1a] hover:text-[#ff4f1a] transition-all duration-200 flex items-center justify-center"
          aria-label="Pass"
        >
          <X
            size={20}
            className="text-[#6b6b5e] group-hover:text-[#ff4f1a] transition-colors"
          />
        </button>

        {/* Like button */}
        <button
          onClick={onLike}
          className="w-14 h-14 bg-[#e8ff3b] rounded-[4px] border border-[#e8ff3b] hover:scale-105 transition-all duration-200 flex items-center justify-center"
          aria-label="Like"
        >
          <Heart size={20} className="text-[#0f0f0d]" />
        </button>
      </div>

      <p className="text-[#6b6b5e] text-[10px] uppercase tracking-[0.28em] select-none font-mono-ui">
        drag left to pass · drag right to like
      </p>
    </div>
  );
}
