/*
 on a real project I would store types in their respective modules
*/

export interface TIInput {
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
  createdAt: string;
}

export interface Predict {
  description: string;
  error?: boolean;
  predictions?: (PredictionEntity)[] | null;
}
export interface PredictionEntity {
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

export interface TIPrediction extends PredictResponse {}
