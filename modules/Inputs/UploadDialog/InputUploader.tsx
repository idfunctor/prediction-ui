import { Button } from "@nextui-org/react";
import { useInputStore } from "modules/Main/stores";
import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { generateId } from 'utils/general';
import { uploadedItemList, clearButtonWrapper, dropzone } from "./styles";


export function InputUploader() {
  const inputList = useInputStore(state => state.inputList);
  const { addInputs, clearInputs } = useInputStore(({ addInputs, clearInputs }) => ({ addInputs, clearInputs }))
  const [uploaderValue, setUploaderValue] = useState<ImageListType>([])

  const changeHandler = (inputs: ImageListType) => setUploaderValue(inputs)

  // sync store with uploader state
  useEffect(() => {
    if (uploaderValue.length) {
      addInputs(uploaderValue.filter(
        // filter out any invalid files
        // (in a real project I'd show an error toast to the user if 0 valid files)
        (i) => Boolean(i.dataURL) && Boolean(i.file) && Boolean(i.file?.size)
      ).map(item => ({
        id: generateId(),
        src: item.dataURL as string,
        name: item.file?.name as string,
        size: item.file?.size as number,
        createdAt: new Date().toISOString(),
      })))
    }
  }, [uploaderValue, addInputs, clearInputs]);


  return (
    <ImageUploading
      multiple
      value={uploaderValue}
      onChange={changeHandler}
    >
      {({
        onImageUpload,
        imageList,
        isDragging,
        dragProps,
        onImageRemoveAll,
      }) => (
        <div className="upload__image-wrapper">
          <button
            className={dropzone}
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            <span>
              Click or Drop Here to Add Images
            </span>
          </button>
          <UploadedItems items={imageList} />
          <div className={clearButtonWrapper}>
            {Boolean(inputList.length) && <Button color="error" size="xs" onClick={() => { clearInputs(); onImageRemoveAll(); }}>Delete All Images</Button>}
          </div>
        </div>
      )}
    </ImageUploading>
  )
}

function UploadedItems({ items }: { items: ImageListType }) {
  return <div className={uploadedItemList}>{items.map((item, idx) => <div key={`${idx} + ${item.file?.name}`}><img src={item.dataURL} alt="uploaded image" /></div>)}</div>
}
