/**
 * get best fit
 * @param {element} image
 * @param {Konva.Layer} stage
 * @param {number} zoom
 */
type Dims = { width: number | undefined; height: number | undefined };
export const calcScale = (imageDims?: Dims, stageDims?: Dims, zoom = 1): number => {
  if (!imageDims?.height || !stageDims?.height || !imageDims?.width || !stageDims?.width) {
    return 1;
  }

  const layerWidth = stageDims.width;
  const layerHeight = stageDims.height;
  const scaleFactorX = layerWidth / imageDims.width;
  const scaleFactorY = layerHeight / imageDims.height;
  const willScaledObjExceedHeight = imageDims.height * scaleFactorX > layerHeight;

  if (willScaledObjExceedHeight) {
    return scaleFactorY * zoom;
  }

  return scaleFactorX * zoom;
};
