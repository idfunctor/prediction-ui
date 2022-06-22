import { Image as KImage } from 'konva/lib/shapes/Image';
import { MutableRefObject, useRef } from 'react';
import { Image } from 'react-konva';
import { useKonvaMedia } from './useKonvaMedia';

export function useMedia(
  url: string,
  type: 'image',
  crossOrigin: 'use-credentials' | 'anonymous' | undefined,
): [JSX.Element, MutableRefObject<KImage>, HTMLImageElement | HTMLVideoElement] {
  const mediaRef = useRef<KImage>(null);
  const [konvaMedia] = useKonvaMedia(url, type, crossOrigin);
  const MediaComponent = <Image ref={mediaRef} image={konvaMedia} alt="" />;

  return [MediaComponent, mediaRef as MutableRefObject<KImage>, konvaMedia as HTMLImageElement | HTMLVideoElement];
}
