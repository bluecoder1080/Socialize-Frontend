import React from "react";

const FALLBACK =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Default avatar"><rect width="256" height="256" rx="12" fill="#1a1a17"/><path d="M76 192c12-30 36-48 52-48s40 18 52 48" fill="none" stroke="#e8ff3b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="128" cy="104" r="30" fill="none" stroke="#e8ff3b" stroke-width="10"/></svg>',
  );
const IMAGE_CACHE_PREFIX = "socialize:image-cache:";

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
  xl: "w-28 h-28",
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
      <div className="bg-[#2a2a24] p-0.5 rounded-[4px]">
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
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#e8ff3b] border border-[#0f0f0d] rounded-[2px] block" />
      )}
    </div>
  );
}
