import { TIInput, TIPrediction } from 'utils/types'
import create from 'zustand';

export const useInputStore = create<{
  inputList: TIInput[];
  addInputs: (inputs: TIInput[]) => void;
  clearInputs: () => void;
  deleteInput: (id: string) => void;
}>((set) => ({
  inputList: [],
  addInputs: (inputs: TIInput[]) => set((state) => ({ inputList: state.inputList.concat(inputs) })),
  clearInputs: () => set(() => ({ inputList: [] })),
  deleteInput: (id: string) => set((state) => ({ inputList: state.inputList.filter(i => i.id !== id) })),
}))

export const usePredictionStore = create<{
  predictionList: TIPrediction[],
  addPredictions: (inputs: TIPrediction[]) => void;
  deletePrediction: (id: string) => void;
}>((set) => ({
  predictionList: [],
  deletePrediction: (id: string) => set((state) => ({ predictionList: state.predictionList.filter(i => i.id !== id) })),
  addPredictions: (predictions: TIPrediction[]) => set((state) => ({ predictionList: state.predictionList.concat(predictions) })),
}))
