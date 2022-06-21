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

export interface Prediction {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}
