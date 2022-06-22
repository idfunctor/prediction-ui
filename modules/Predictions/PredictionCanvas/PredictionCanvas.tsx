import { Rect } from "components/Canvas/Rect"
import { Renderer } from "components/Canvas/Renderer"
import { generateId } from "utils/general"
import { stringToColor } from "@davidcmeier/string-to-color"
import { PredictionEntity, TIInput, TIPrediction } from "utils/types"
import { css } from "@emotion/css"
import { useMeasure } from "@react-hookz/web"
import { darken, rgba } from "polished"

const fullSize = css`
  width: 100%;
  height: 100%;
`;

export interface PredictionCanvasProps { prediction: TIPrediction, input: TIInput };

export const PredictionCanvas = ({ prediction, input }: PredictionCanvasProps) => {
  const [measurements, ref] = useMeasure<HTMLDivElement>();

  return <div className={fullSize} ref={ref}>
    {measurements && <Renderer src={input.src} size={{ width: measurements?.width, height: measurements?.height }}>
      {(_, scale) => <RegionList scale={scale} prediction={prediction} />}
    </Renderer>}
  </div>
}



function RegionList({ scale, prediction }: { scale: number; prediction: TIPrediction; }) {
  const list = prediction.predict.predictions;
  if (!list) return null
  return (
    <>
      {convertViewItemsToRectConfig(list).map(({ key, ...item }) => (
        <Rect key={key} labelScale={scale} {...item} />
      ))}
    </>
  )
}

interface RectConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  fill: string;
  key: string;
  text?: string;
}

function convertViewItemsToRectConfig(list: PredictionEntity[]): RectConfig[] {
  return list
    .map((item) => {
      if ('bbox' in item) {
        const { bbox, label, score } = item;
        const color = darken(0.2, stringToColor(label));
        return {
          x: bbox.x1,
          y: bbox.y1,
          width: bbox.x2 - bbox.x1,
          height: bbox.y2 - bbox.y1,
          color,
          key: generateId(),
          fill: rgba(color, 0.125),
          text: `${label} (${(Number(score) * 100).toFixed(0)}%)`,
        };
      }
      return null;
    })
    .filter(Boolean) as RectConfig[]
}