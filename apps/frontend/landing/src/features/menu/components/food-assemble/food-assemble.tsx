'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type FoodAssembleProps = {
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
  className?: string;
};

/** Dish still by default; plays assemble video while hovered / activated. */
export const FoodAssemble = ({ imageSrc, imageAlt, videoSrc, className }: FoodAssembleProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduceMotion(media.matches);
    };
    sync();
    media.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
    };
  }, []);

  const startVideo = () => {
    if (!videoSrc || reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    void video.play().catch(() => {
      setPlaying(false);
    });
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  const shellClassName =
    className ??
    'relative aspect-square w-full overflow-hidden bg-muted/40 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

  if (!videoSrc) {
    return (
      <div className={shellClassName}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 576px"
          priority
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`${imageAlt}. Play assemble preview`}
      aria-pressed={playing}
      className={`${shellClassName} cursor-pointer border-0 p-0 text-left`}
      onMouseEnter={startVideo}
      onMouseLeave={stopVideo}
      onFocus={startVideo}
      onBlur={stopVideo}
      onTouchStart={startVideo}
      onTouchEnd={stopVideo}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        className={[
          'object-cover transition-opacity duration-300 motion-reduce:transition-none',
          playing ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
        sizes="(max-width: 1024px) 100vw, 576px"
        priority
      />

      <video
        ref={videoRef}
        className={[
          'pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none',
          playing ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
      />
    </button>
  );
};
