import { forwardRef } from 'react';
import { Group } from 'react-konva';
import type Konva from 'konva';

const getCenter = ({ width = 0, height = 0 }: { width: number; height: number }): { x: number; y: number } => ({
  x: width / 2,
  y: height / 2,
});

const DEFAULT_DIMS = { width: 640, height: 480 };

/**
 * Konva Group that centers its children
 */
// eslint-disable-next-line react/display-name
export const CenteredGroup = forwardRef<
  Konva.Group,
  React.PropsWithChildren<{
    containerDimensions: { width: number; height: number };
    contentDimensions: { width: number; height: number };
    scale: number;
  }>
>(({ containerDimensions = DEFAULT_DIMS, contentDimensions = DEFAULT_DIMS, children, scale }, ref) => {
  const coords = getCenter(containerDimensions);
  const offset = getCenter(contentDimensions);
  return (
    <Group
      ref={ref}
      id="media-group"
      scaleX={scale}
      scaleY={scale}
      x={coords.x}
      y={coords.y}
      offsetX={offset.x}
      offsetY={offset.y}
    >
      {children}
    </Group>
  );
});
