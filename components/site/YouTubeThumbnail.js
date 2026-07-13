"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FALLBACK = "/site/youtube-fallback.svg";

export default function YouTubeThumbnail({ src, title, className }) {
  const [source, setSource] = useState(src || FALLBACK);
  useEffect(() => setSource(src || FALLBACK), [src]);
  return <Image src={source} alt={`Thumbnail for ${title}`} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" className={className} onError={() => setSource(FALLBACK)} />;
}
