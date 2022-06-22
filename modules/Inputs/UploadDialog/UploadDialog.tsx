import { Button, Input, Modal, Text } from "@nextui-org/react";
import { PencilIcon } from "components/Icons/PencilIcon";
import { useState } from "react";
import { InputUploader } from "./InputUploader";

export function UploadDialog() {
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <>
      <Button size="md" icon={<PencilIcon size={18} fill="#fff" />} onClick={openModal}> Manage Images </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Upload Images
          </Text>
        </Modal.Header>
        <Modal.Body>
          <InputUploader />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button> */}
          <Button auto size="sm" onClick={closeModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

