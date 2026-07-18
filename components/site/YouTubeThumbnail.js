"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FALLBACK = "/site/youtube-fallback.svg";

export default function YouTubeThumbnail({ src, title, className, eager = false }) {
  const [source, setSource] = useState(src || FALLBACK);
  useEffect(() => setSource(src || FALLBACK), [src]);
  const loadingProps = eager ? { preload: true } : { loading: "lazy" };
  return <Image src={source} alt={title} fill {...loadingProps} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" className={className} onError={() => setSource(FALLBACK)} />;
}
