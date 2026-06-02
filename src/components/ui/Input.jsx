import React, { forwardRef } from "react";

const BASE = "w-full field-line text-sm";

export const Input = forwardRef(function Input(
  { label, hint, error, className = "", ...props },
  ref,
) {
  const cls =
    BASE +
    (error ? " border-[#ff4f1a] focus:border-[#ff4f1a]" : "") +
    (className ? " " + className : "");

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="kicker">{label}</label>}
      <input ref={ref} className={cls} {...props} />
      {hint && !error && (
        <p className="text-[11px] font-mono-ui text-[#6b6b5e]">{hint}</p>
      )}
      {error && (
        <p className="text-[11px] font-mono-ui text-[#6b6b5e]">
          // error: {error}
        </p>
      )}
    </div>
  );
});

export const TextArea = forwardRef(function TextArea(
  { label, hint, className = "", ...props },
  ref,
) {
  const cls =
    BASE + " resize-none min-h-[120px]" + (className ? " " + className : "");

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="kicker">{label}</label>}
      <textarea ref={ref} className={cls} {...props} />
      {hint && (
        <p className="text-[11px] font-mono-ui text-[#6b6b5e]">{hint}</p>
      )}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, hint, children, className = "", ...props },
  ref,
) {
  const cls =
    BASE +
    " appearance-none cursor-pointer pr-6" +
    (className ? " " + className : "");

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="kicker">{label}</label>}
      <select ref={ref} className={cls} {...props}>
        {children}
      </select>
      {hint && (
        <p className="text-[11px] font-mono-ui text-[#6b6b5e]">{hint}</p>
      )}
    </div>
  );
});
