import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const BASE =
  'w-full px-4 py-3 pr-12 bg-pink-50 border border-pink-200 rounded-xl text-gray-800 ' +
  'placeholder-gray-400 text-sm transition-all focus:outline-none focus:ring-2 ' +
  'focus:ring-pink-400 focus:border-transparent';

export const PasswordInput = forwardRef(function PasswordInput(
  { label, hint, className = '', ...props },
  ref
) {
  const [show, setShow] = useState(false);
  const cls = BASE + (className ? ' ' + className : '');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={show ? 'text' : 'password'}
          className={cls}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors focus:outline-none"
          tabIndex={-1}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
});
