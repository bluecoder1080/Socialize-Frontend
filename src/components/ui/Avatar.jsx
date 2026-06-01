import React from 'react';

const FALLBACK = 'https://i.pravatar.cc/300';

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-20 h-20',
  xl: 'w-32 h-32',
};

export function Avatar({
  src,
  name = 'User',
  size = 'md',
  online = false,
  className = '',
}) {
  const imgCls = 'object-cover rounded-full ' + (sizeMap[size] || sizeMap.md);
  const outerCls = 'relative inline-block' + (className ? ' ' + className : '');

  return (
    <div className={outerCls}>
      <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-0.5 rounded-full">
        <img
          src={src || FALLBACK}
          alt={name}
          onError={(e) => { e.target.src = FALLBACK; }}
          className={imgCls}
        />
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full block" />
      )}
    </div>
  );
}
