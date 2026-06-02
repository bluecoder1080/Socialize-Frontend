import React from "react";
import { motion } from "framer-motion";

export function EmptyState({ emoji, title, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {emoji && <div className="text-4xl mb-4 select-none">{emoji}</div>}
      {title && (
        <h3 className="text-xl font-mono-ui text-[#f5f0e8] mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-[#6b6b5e] max-w-sm leading-relaxed">{description}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </motion.div>
  );
}
