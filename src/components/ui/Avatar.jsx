import React from "react";

const FALLBACK =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Default avatar"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f9a8d4"/><stop offset="100%" stop-color="#fb7185"/></linearGradient></defs><rect width="256" height="256" rx="128" fill="url(#g)"/><circle cx="128" cy="106" r="44" fill="#fff" opacity="0.95"/><path d="M56 208c14-36 44-56 72-56s58 20 72 56" fill="#fff" opacity="0.95"/></svg>',
  );
const IMAGE_CACHE_PREFIX = "socialize:image-cache:";

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
  xl: "w-32 h-32",
};

function readCachedVersion(src) {
  try {
    return window.localStorage.getItem(IMAGE_CACHE_PREFIX + src) || "";
  } catch {
    return "";
  }
}

export function rememberFreshImage(src) {
  if (!src) return;

  try {
    window.localStorage.setItem(IMAGE_CACHE_PREFIX + src, String(Date.now()));
  } catch {
    // Ignore storage failures; the image will still render without cache busting.
  }
}

export function resolveImageSrc(src) {
  if (!src) return FALLBACK;

  const cachedVersion = readCachedVersion(src);
  if (!cachedVersion) return src;

  try {
    const url = new URL(src, window.location.origin);
    url.searchParams.set("v", cachedVersion);
    return url.toString();
  } catch {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}v=${encodeURIComponent(cachedVersion)}`;
  }
}

export function Avatar({
  src,
  name = "User",
  size = "md",
  online = false,
  className = "",
}) {
  const imgCls = "object-cover rounded-full " + (sizeMap[size] || sizeMap.md);
  const outerCls = "relative inline-block" + (className ? " " + className : "");

  return (
    <div className={outerCls}>
      <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-0.5 rounded-full">
        <img
          src={resolveImageSrc(src)}
          alt={name}
          onError={(e) => {
            e.target.src = FALLBACK;
          }}
          className={imgCls}
        />
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full block" />
      )}
    </div>
  );
}
