import { useState, useEffect } from 'react';

interface KonvaMedia {
  media: HTMLImageElement | HTMLVideoElement | undefined;
  status: 'loading' | 'loaded' | 'failed';
}

const initialState: KonvaMedia = { media: undefined, status: 'loading' };

/**
 * (https://github.com/konvajs/use-image)
 * */
export function useKonvaMedia(
  url: string,
  type: 'image' | 'video',
  crossOrigin: 'use-credentials' | 'anonymous' | undefined,
): [KonvaMedia['media'], KonvaMedia['status']] {
  const [media, setMedia] = useState(initialState.media);
  const [status, setStatus] = useState(initialState.status);
  useEffect(() => {

    let mediaEl: HTMLImageElement | HTMLVideoElement;

    if (type === 'video') {
      mediaEl = document.createElement('video') as HTMLVideoElement;
      mediaEl.muted = true;
    } else {
      mediaEl = document.createElement('img') as HTMLImageElement;
    }

    const onLoad = (): void => {
      if (mediaEl) {
        if (mediaEl instanceof HTMLVideoElement) {
          mediaEl.width = mediaEl.videoWidth;
          mediaEl.height = mediaEl.videoHeight;
          mediaEl.currentTime = 0;
        }
        setMedia(mediaEl);
        setStatus('loaded');
      }
    };
    const onError = (): void => {
      setMedia(initialState.media);
      setStatus('failed');
    };

    mediaEl.addEventListener('load', onLoad);
    mediaEl.addEventListener('loadeddata', onLoad);
    mediaEl.addEventListener('error', onError);

    if (crossOrigin) {
      mediaEl.crossOrigin = crossOrigin;
    }

    mediaEl.src = url;

    return () => {
      mediaEl.removeEventListener('load', onLoad);
      mediaEl.removeEventListener('loadeddata', onLoad);
      mediaEl.removeEventListener('error', onError);
      setMedia(initialState.media);
      setStatus(initialState.status);
    };
  }, [url, crossOrigin, type]);

  return [media, status];
}
