import { Input, Prediction } from 'utils/types'
import create from 'zustand';

export const useInputStore = create<{ 
  inputList: Input[];
  addInputs: (inputs: Input[]) => void;
  clearInputs: () => void;
  deleteInput: (id: string) => void;
}>((set) => ({
  inputList: [],
  addInputs: (inputs: Input[]) => set((state) => ({ inputList: state.inputList.concat(inputs) })),
  clearInputs: () => set(() => ({ inputList: [] })),
  deleteInput: (id: string) => set((state) => ({ inputList: state.inputList.filter(i => i.id !== id) })),
}))

export const usePredictionStore = create<{ 
  predictionList: Prediction[],
  addPredictions: (inputs: Prediction[]) => void;
}>((set) => ({
  predictionList: [],
  addPredictions: (predictions: Prediction[]) => set((state) => ({ predictionList: state.predictionList.concat(predictions) })),
}))

