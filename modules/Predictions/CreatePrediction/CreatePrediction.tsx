import { Button, Input, Loading, Modal, Text } from "@nextui-org/react";
import { IAsyncStatus, IUseAsyncActions, useAsync, useUnmountEffect } from "@react-hookz/web";
import { usePredictionStore } from "modules/Main/stores";
import { useCreatePredStore } from "modules/Predictions/stores";
import { useCallback, useState } from "react";
import type { Input as TInput, PredictResponse } from "utils/types";

/*
 I would create a reusable Dialog component on a real project given that CreatePrediction and Input uploader share almost all the code as is except the body and actions
 */
export const CreatePrediction = ({ input }: { input: TInput }) => {
  const { toggle, setData } = useCreatePredStore(state => ({ toggle: state.toggle, setData: state.setData }));

  return (
    <Button
      color="secondary"
      size="xs"
      onPress={() => {
        setData({ currentInput: input })
        toggle()
      }}
    >
      PREDICT
    </Button>
  );
}

export function PredictionModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { toggle, setData } = useCreatePredStore(state => ({ toggle: state.toggle, setData: state.setData }));
  const { isOpen, currentInput } = useCreatePredStore(state => ({ isOpen: state.isOpen, currentInput: state.data.currentInput }));

  const [{ status }, actions] = useSubmit();

  const addPredictions = usePredictionStore(state => state.addPredictions);
  const predictionList = usePredictionStore(state => state.predictionList);
  const submitHandler = useCallback(async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (currentInput) {
      const data = await actions.execute({ title, description, input: currentInput })
      addPredictions((data?.predict.error || !data) ? [] : [data])
    }
  }, [title, description, actions, currentInput, addPredictions]);



  useUnmountEffect(() => setData({ currentInput: null }))


  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={isOpen}
      onClose={toggle}
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
              <Button type="button" size="sm" auto flat color="error" onClick={toggle}>
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
  input: Pick<TInput, 'id' | 'name'>;
}

function useSubmit(): [{
  status: IAsyncStatus;
  error: Error | undefined;
  result: PredictResponse | undefined;
}, IUseAsyncActions<PredictResponse | undefined, [PredictionPayload]>] {
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
        // todo: TOAST to user
        console.log(e);
      }
    },
  );

  return [state, actions];
}