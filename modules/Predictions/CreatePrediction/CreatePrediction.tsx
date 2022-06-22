import { Button, Input, Loading, Modal, Text } from "@nextui-org/react";
import { useAsync, useUnmountEffect } from "@react-hookz/web";
import { useHomeTabState } from "modules/Main/HomeTabs";
import { usePredictionStore } from "modules/Main/stores";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import type { TIInput, PredictResponse } from "utils/types";

import create from "zustand"

type ModalState<Data = null> = { isOpen: boolean; open: () => void; close: () => void; data: Data; setData: (d: Data) => void; }

/**
 * This store is actually not necessary and should belong in local state, however, there was a bug with
 * the modal in the UI library I'm using when we try to type in a field inside the modal, which
 * required the modal JSX to be placed outside the component
 * 
 * In a real project, I would have a "ModalManager" at the "root" of the application which has a list of ReactNodes
 * that we can push to, so as to be able to dynamically render any modal from any part of the app;
 * so a situation like this wouldn't arise there to begin with.
 * */
export const useCreatePredStore = create<ModalState<{ currentInput: TIInput | null }>>((set) => ({
  isOpen: false,
  close: () => {
    set(state => ({ ...state, isOpen: false }))
  },
  open: () => {
    set(state => ({ ...state, isOpen: true }))
  },
  data: { currentInput: null },
  setData: (data) => set(state => ({ ...state, data })),
}));

/*
 I would create a reusable Dialog component on a real project given that CreatePrediction and Input uploader share almost all the code as is except the body and actions
 */
export const CreatePrediction = ({ input }: { input: TIInput }) => {
  const { open, setData } = useCreatePredStore(state => ({ open: state.open, setData: state.setData }));

  return (
    <Button
      color="secondary"
      size="xs"
      onPress={() => {
        setData({ currentInput: input })
        open()
      }}
    >
      PREDICT
    </Button>
  );
}

export function PredictionModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { close, setData } = useCreatePredStore(state => ({ close: state.close, setData: state.setData }));
  const { isOpen, currentInput } = useCreatePredStore(state => ({ isOpen: state.isOpen, currentInput: state.data.currentInput }));

  const [{ status }, actions] = useSubmit();
  const homeTabState = useHomeTabState();
  const addPredictions = usePredictionStore(state => state.addPredictions);

  const submitHandler = useCallback(async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (currentInput) {
      const data = await actions.execute({ title, description, input: currentInput })
      const hasErrored = data.predict.error;
      toast[hasErrored ? 'error' : 'success'](data.predict.description as string);
      addPredictions((data.predict.error || !data) ? [] : [data])

      if (!data.predict.error) {
        homeTabState.setSelectedId('predictions')
      }

      close()
    }
  }, [title, description, actions, currentInput, addPredictions, homeTabState, close]);

  useUnmountEffect(() => setData({ currentInput: null }))

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={isOpen}
      onClose={close}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Run Prediction
        </Text>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Title"
            required
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Description"
            required
            onChange={(evt) => setDescription(evt.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          {
            status === "loading" ? <Loading /> : <>
              <Button type="button" size="sm" auto flat color="error" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" auto size="sm">
                Done
              </Button>
            </>
          }
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export type PredictionPayload = {
  title: string;
  description: string;
  input: Pick<TIInput, 'id' | 'name'>;
}

function useSubmit() {
  const [state, actions] = useAsync(
    async ({
      title,
      description,
      input,
    }: PredictionPayload) => {
      try {
        const response = await fetch('/api/predict', {
          method: 'POST', body: JSON.stringify({
            input: { id: input.id, name: input.name }, title, description
          })
        });
        const json: PredictResponse = await response.json();
        return json;
      } catch (e) {
        return ({
          predict: {
            error: true,
            description: 'Something went wrong, please contact support.',
          }
        } as PredictResponse);
      }
    },
  );

  return [state, actions] as [typeof state, typeof actions];
}