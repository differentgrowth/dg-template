'use client';

import type { Media as MediaType } from '@/payload-types';

import { type Ref, useRef } from 'react';

import { getClientSideURL } from '@/lib/get-url';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  videoClassName?: string;
  onClick?: () => void;
  onLoad?: () => void;
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaType | string | number; // for Payload media
};

export const MediaVideo = ({ onClick, resource, videoClassName }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!resource || typeof resource !== 'object') {
    return null;
  }

  const src = `${getClientSideURL()}${resource.url}`;
  const poster =
    resource.poster && typeof resource.poster.value === 'object'
      ? `${getClientSideURL()}${resource.poster.value.url}`
      : undefined;

  return (
    <video
      autoPlay
      className={cn(
        'w-full bg-muted-foreground',
        'rounded-sm shadow-sm shadow-success',
        videoClassName
      )}
      controls={false}
      loop
      muted
      onClick={onClick}
      playsInline
      poster={poster}
      ref={videoRef}
    >
      <source src={src} />
    </video>
  );
};
