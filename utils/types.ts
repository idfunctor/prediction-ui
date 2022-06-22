/*
 on a real project I would store types in their respective modules
*/

export interface Input {
  id: string;
  src: string;
  name: string;
  size: number;
  createdAt: string;
}

export interface PredictResponse {
  input: { id: string; name: string }
  predict: Predict;
  id: string;
  title: string;
  description: string;
}

export interface Predict {
  description: string;
  error?: boolean;
  predictions?: (PredictionsEntity)[] | null;
}
export interface PredictionsEntity {
  bbox: Bbox;
  label: string;
  score: string;
}
export interface Bbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface Prediction extends PredictResponse {}
