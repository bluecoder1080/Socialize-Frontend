import React, { forwardRef } from 'react';

const BASE =
  'w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl text-gray-800 ' +
  'placeholder-gray-400 text-sm transition-all focus:outline-none focus:ring-2 ' +
  'focus:ring-pink-400 focus:border-transparent';

export const Input = forwardRef(function Input(
  { label, hint, error, className = '', ...props },
  ref
) {
  const cls =
    BASE +
    (error ? ' border-red-300 focus:ring-red-400' : '') +
    (className ? ' ' + className : '');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input ref={ref} className={cls} {...props} />
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

export const TextArea = forwardRef(function TextArea(
  { label, hint, className = '', ...props },
  ref
) {
  const cls =
    BASE + ' resize-none' + (className ? ' ' + className : '');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea ref={ref} className={cls} {...props} />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, hint, children, className = '', ...props },
  ref
) {
  const cls =
    BASE + ' appearance-none cursor-pointer' + (className ? ' ' + className : '');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select ref={ref} className={cls} {...props}>
        {children}
      </select>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
});
