import React from "react";

const variantClasses = {
  primary: "button-accent font-mono-ui",
  secondary: "button-ghost font-mono-ui",
  ghost:
    "bg-transparent text-[#f5f0e8] border border-transparent hover:text-[#e8ff3b]",
  danger: "bg-[#ff4f1a] text-[#0f0f0d] border border-[#ff4f1a] font-mono-ui",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-xs",
  lg: "px-6 py-3 text-sm",
  xl: "px-8 py-4 text-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-[4px] " +
    "transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#e8ff3b] " +
    "disabled:opacity-60 disabled:cursor-not-allowed";
  const cls =
    base +
    " " +
    (variantClasses[variant] || variantClasses.primary) +
    " " +
    (sizeClasses[size] || sizeClasses.md) +
    (className ? " " + className : "");

  return (
    <button className={cls} disabled={disabled || loading} {...props}>
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
