import React from "react";

const FALLBACK = "https://i.pravatar.cc/300";
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
