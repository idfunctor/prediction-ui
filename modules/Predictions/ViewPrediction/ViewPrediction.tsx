import { Button, Card, Loading, Modal, Text } from "@nextui-org/react";
import { useInputStore } from "modules/Main/stores";
import { useState } from "react";
import type { TIInput, TIPrediction } from "utils/types";
import dynamic from "next/dynamic";
import { PredictionCanvasProps } from "../PredictionCanvas";

const PredictionCanvas = dynamic<PredictionCanvasProps>(
  import('../PredictionCanvas').then((x) => x.PredictionCanvas),
  { ssr: false },
);

export const ViewPrediction = ({ prediction }: { prediction: TIPrediction }) => {
  const [visible, setVisible] = useState(false)
  const inputData = useInputStore(state => state.inputList.find(i => i.id === prediction.input.id))
  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)

  return (
    <>
      <Button
        color="secondary"
        size="xs"
        onPress={() => {
          openModal()
        }}
      >
        VIEW
      </Button>
      <CanvasModal isOpen={visible} close={closeModal} input={inputData} prediction={prediction} />
    </>
  );
}

export function CanvasModal({
  isOpen, close, input, prediction
}: {
  close: () => void;
  isOpen: boolean;
  input: TIInput | undefined;
  prediction: TIPrediction;
}) {
  console.log({ isOpen, close, input, prediction })
  if (!isOpen) {
    return null
  }
  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={isOpen}
      onClose={close}
      fullScreen
    >
      <Modal.Body>
        {
          !input &&
          <Card variant="flat">
            <Card.Body>
              <Text>Something went wrong, please re-run prediction.</Text>
            </Card.Body>
          </Card>
        }
        {
          input &&
          <>
            <PredictionCanvas prediction={prediction} input={input} />
          </>
        }
      </Modal.Body>
      <Modal.Footer>
        {
          status === "loading" ? <Loading /> : <>
            <Button type="button" size="sm" auto flat onClick={close}>
              Go Back
            </Button>
          </>
        }
      </Modal.Footer>
    </Modal>
  )
}
