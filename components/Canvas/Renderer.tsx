import { CenteredGroup } from "components/Canvas/CenteredGroup";
import { useMemo } from "react";
import { Layer, Stage } from "react-konva";
import { calcScale } from "utils/canvas/calcScale";
import { useMedia } from "utils/canvas/useMedia";

export interface CanvasRendererProps {
  src: string;
  size: { width: number | undefined; height: number | undefined };

  /** render function as children to provide media items & scale to shape renderers */
  children: (a: ReturnType<typeof useMedia>, scale: number) => React.ReactElement;
}


export const Renderer: (a: CanvasRendererProps) => JSX.Element | null = ({ src, size: parentSize, children }) => {
  const mediaHookReturn = useMedia(src, 'image', 'anonymous');
  const [MediaComponent, , media] = mediaHookReturn;

  const scale = useMemo(() => calcScale(media, parentSize, 1), [media, parentSize]);

  if (Number.isNaN(scale)) {
    return null;
  }

  return (
    <Stage {...parentSize}>
      <Layer
        id="MEDIA_LAYER"
        dataset={{
          testid: 'canvas-media-layer',
          medialoaded: `${Boolean(media)}`,
        }}
        media={media}
      >
        <CenteredGroup
          scale={scale}
          containerDimensions={{ width: parentSize?.width || 0, height: parentSize?.height || 0 }}
          contentDimensions={{ width: media?.width || 0, height: media?.height || 0 }}
        >
          {MediaComponent}
          {media && children(mediaHookReturn, scale)}
        </CenteredGroup>
      </Layer>
    </Stage>
  );
}