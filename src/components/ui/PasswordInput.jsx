import React, { useState, forwardRef } from "react";

const BASE = "w-full field-line pr-24 text-sm";

export const PasswordInput = forwardRef(function PasswordInput(
  { label, hint, className = "", ...props },
  ref,
) {
  const [show, setShow] = useState(false);
  const cls = BASE + (className ? " " + className : "");

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="kicker">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className={cls}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-0 bottom-3 text-[10px] uppercase tracking-[0.28em] text-[#e8ff3b]"
        >
          [{show ? "hide" : "show"}]
        </button>
      </div>
      {hint && (
        <p className="text-[11px] font-mono-ui text-[#6b6b5e]">{hint}</p>
      )}
    </div>
  );
});
