'use client';

import type { Media as MediaType } from '@/payload-types';

import { type Ref, useRef } from 'react';

import { getClientSideURL } from '@/lib/get-url';

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

  return (
    <div className="animate-pulse bg-muted-foreground">
      <video
        autoPlay
        className={videoClassName}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={src} />
      </video>
    </div>
  );
};
