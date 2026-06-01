import React from 'react';

const variantClasses = {
  primary:
    'bg-gradient-to-r from-pink-500 to-rose-500 text-white ' +
    'hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-200',
  secondary: 'bg-white text-pink-500 border-2 border-pink-300 hover:bg-pink-50',
  ghost: 'bg-transparent text-pink-500 hover:bg-pink-50',
  danger: 'bg-white text-red-500 border-2 border-red-200 hover:bg-red-50',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl ' +
    'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 ' +
    'focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  const cls =
    base +
    ' ' +
    (variantClasses[variant] || variantClasses.primary) +
    ' ' +
    (sizeClasses[size] || sizeClasses.md) +
    (className ? ' ' + className : '');

  return (
    <button className={cls} disabled={disabled || loading} {...props}>
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
