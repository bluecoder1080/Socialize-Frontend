import React from "react";

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
};

export function Spinner({ size = "md", text, className = "" }) {
  const spinCls =
    "rounded-full border-[#e8ff3b] border-t-transparent animate-spin " +
    (sizeMap[size] || sizeMap.md);
  const wrapCls =
    "flex flex-col items-center gap-3" + (className ? " " + className : "");

  return (
    <div className={wrapCls}>
      <div className={spinCls} />
      {text && <p className="text-sm text-[#6b6b5e] font-mono-ui">{text}</p>}
    </div>
  );
}

export function FullPageSpinner({ text }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#0f0f0d]">
      <Spinner size="lg" text={text} />
    </div>
  );
}
