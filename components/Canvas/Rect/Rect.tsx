import Konva from 'konva';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { useRef } from 'react';
import { Text, Rect as Rectangle } from 'react-konva';
import { useShapeText } from 'utils/konva/useShapeText';

export const LABEL_FONT_SIZE = 15;
export const LABEL_PADDING = 5;

type Dims = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RectangleLabelProps {
  label: string;
  color: string;
  parentDims: Dims;
  labelScale: number;
}

export const RectLabel: React.FC<RectangleLabelProps> = ({ label, color, labelScale, parentDims }) => {
  const { width, x, y  } = parentDims;
  const textRef = useRef<Konva.Text | null>(null);
  const rectRef = useRef<Konva.Rect>(null);
  const [labelText, textRectSize] = useShapeText({
    label,
    isSelected: true,
    textRef,
    labelStyle: {
      fontSize: LABEL_FONT_SIZE,
      padding: LABEL_PADDING,
    },
    dimensions: {
      width,
      height: 30,
    },
    scale: labelScale,
  });


  const rectProps = {
    x: x + width - (textRectSize[0] / labelScale),
    y: y - textRectSize[1] / labelScale + (textRectSize[1] / labelScale),
    width: textRectSize[0] / labelScale,
    height: textRectSize[1] / labelScale,
  };

  return (
    <>
      <Rectangle
        ref={rectRef}
        {...rectProps}
        fill={color}
        cornerRadius={[5, 5, 0, 0]}
      />
      <Text
        ref={textRef}
        x={rectProps.x}
        y={rectProps.y}
        align="left"
        fontFamily="Inter"
        fill="#fff"
        text={labelText}
        fontSize={LABEL_FONT_SIZE}
        padding={LABEL_PADDING}
        scaleX={1 / labelScale}
        scaleY={1 / labelScale}
      />
    </>
  );
};

export interface RectProps extends RectConfig {
  text?: string;
  color: string;
  labelScale: number;
}

/**
 * PLEASE don't add any random props to this component. It already extends from ALL properties that
 * react-konva Rect allows. So you can use this as if it's Rect from react-konva and give any
 * konva specific properties on the parent; wherever you call this component.
 *
 * */
export const Rect: React.FC<RectProps & Dims> = ({ text, color, labelScale, ...konvaProps }) => (
  <>
    {Boolean(text) && (
      <RectLabel
        label={`${text}`}
        color={color}
        labelScale={labelScale}
        parentDims={{ width: konvaProps.width, height: konvaProps.height, x: konvaProps.x, y: konvaProps.y  }}
      />
    )}
    <Rectangle stroke={color} {...konvaProps} />
  </>
);
