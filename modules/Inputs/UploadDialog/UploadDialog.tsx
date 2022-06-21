import { Button, Modal, Text } from "@nextui-org/react";
import { PencilIcon } from "components/Icons/PencilIcon";
import { useState } from "react";
import { InputUploader } from "./InputUploader";

export function UploadDialog() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <Button size="md" icon={<PencilIcon size={18} fill="#fff" />} onClick={handler}> Manage Inputs </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Upload Inputs
          </Text>
        </Modal.Header>
        <Modal.Body>
          <InputUploader />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button> */}
          <Button auto size="sm" onClick={closeHandler}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

