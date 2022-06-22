import { css } from "@emotion/css"
import { Row, Tooltip, Text } from "@nextui-org/react"
import { IconButton } from "components/IconButton/IconButton"
import { TrashIcon } from "components/Icons/TrashIcon"
import { usePredictionStore } from "modules/Main/stores"
import { TIPrediction } from "utils/types"
import { ViewPrediction } from "../ViewPrediction"

const actions = css`
  button, div[role="button"] {
    margin-right: 0.8rem;
  }
`;

export type InputTableKeys = 'name' | 'size' | 'time' | 'actions';

export const renderCell = (prediction: TIPrediction, columnKey: InputTableKeys) => {
  switch (columnKey) {
    case "name":
      return (
        <Text b size={14} css={{ tt: "capitalize" }}>
          {prediction.title}
        </Text>
      )
    case "size":
      return (
        <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
          {prediction.description}
        </Text>
      )
    case "time":
      return (
        <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
          {new Date(prediction.createdAt).toLocaleString()}
        </Text>
      )

    case "actions":
      return (
        <Row className={actions} align="center" justify="flex-end">
          <ViewPrediction prediction={prediction} />
          <DeletePrediction prediction={prediction} />
        </Row>
      )
    default:
      return null
  }
}

// would move this to its own component like "TableActionButton" that takes any icon if time permitted
function DeletePrediction({ prediction }: { prediction: TIPrediction }) {
  const deletePred = usePredictionStore(s => s.deletePrediction);

  return (
    <Tooltip
      content="Delete Prediction"
      color="error"
      onClick={() => deletePred(prediction.id)}
    >
      <IconButton>
        <TrashIcon size={20} fill="#FF0080" />
      </IconButton>
    </Tooltip>
  );
}