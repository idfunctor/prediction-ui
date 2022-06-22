import Konva from 'konva';
import React, { useRef, useEffect, useState } from 'react';

const APPROX_WIDTH_GAP = 2;
const APPROX_HEIGHT_GAP = 4;

export interface UseShapeTextProps {
  label: string;
  isSelected: boolean;
  textRef: React.MutableRefObject<Konva.Text | null>;
  labelStyle: {
    fontSize: number;
    padding: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  scale: number;
}

export function useShapeText({
  label,
  isSelected,
  textRef,
  labelStyle: { fontSize: labelFontSize, padding: labelPadding },
  dimensions: { width: maxWidth, height: maxHeight },
  scale,
}: UseShapeTextProps): [string, number[]] {
  const [textRectSize, setTextRectSize] = useState([1, 1]);
  const [labelText, setLabelText] = useState(label);
  const oneTextLetterWidthRef = useRef(0);

  const textRectParams = {
    height: labelPadding * 1.5 + labelFontSize,
  };

  useEffect(() => {
    if (label && textRef.current && 'getTextWidth' in textRef.current) {
      if (labelText === label) {
        oneTextLetterWidthRef.current = textRef.current.getTextWidth() / label.length;
      }

      const possibleLetterCount = Math.floor(((maxWidth - labelPadding * 2 - APPROX_WIDTH_GAP) * scale) / oneTextLetterWidthRef.current);
      const cutLen = Math.min(label.length, possibleLetterCount);
      setLabelText(label);

      let width = labelPadding * APPROX_WIDTH_GAP + cutLen * oneTextLetterWidthRef.current;
      width = cutLen < label.length ? maxWidth * scale : width;
      const height = Math.min(textRectParams.height, maxHeight - APPROX_HEIGHT_GAP);
      setTextRectSize([width, height]);
    }
  }, [label, textRef, setTextRectSize, setLabelText, isSelected, maxWidth, maxHeight, labelPadding, labelText, scale, textRectParams.height]);
  return [labelText, textRectSize];
}
