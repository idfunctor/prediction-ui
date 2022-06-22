import { Input } from "utils/types";
import create from "zustand"

type ModalState<Data = null> = { isOpen: boolean; toggle: () => void; data: Data; setData: (d: Data) => void; }

/**
 * in a real project, I would have a Modal manager that can render any React node
 * in a portal as opposed to declaring modals globally and keeping boolean state per modal 
 * */
export const useCreatePredStore = create<ModalState<{ currentInput: Input | null }>>((set) => ({
  isOpen: false,
  toggle: () => set(state => ({ ...state, isOpen: !state.isOpen })),
  data: { currentInput: null },
  setData: (data) => set(state => ({ ...state, data })),
}));
