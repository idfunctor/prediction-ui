import { css } from "@emotion/css"
import { Table, Row, Col, Tooltip, User, Text, Button } from "@nextui-org/react"
import { IconButton } from "components/IconButton/IconButton"
import { PencilIcon } from "components/Icons/PencilIcon"
import { TrashIcon } from "components/Icons/TrashIcon"
import { useInputStore } from "modules/Main/stores"
import { CreatePrediction } from "modules/Predictions/CreatePrediction"
import { formatBytes } from "utils/date"
import { Input } from "utils/types"

const actions = css`
  button, div[role="button"] {
    margin-right: 0.8rem;
  }
`;

export type InputTableKeys = 'name' | 'size' | 'time' | 'actions';

export const renderCell = (input: Input, columnKey: InputTableKeys) => {
  switch (columnKey) {
    case "name":
      return (
        <Text b size={14} css={{ tt: "capitalize" }}>
          {input.name}
        </Text>
      )
    case "size":
      return (
        <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
          {formatBytes(input.size)}
        </Text>
      )
    case "time":
      return (
        <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
          {new Date(input.createdAt).toLocaleString()}
        </Text>
      )

    case "actions":
      return (
        <Row className={actions} align="center" justify="flex-end">
          <CreatePrediction input={input} />
          <DeleteInput input={input} />
        </Row>
      )
    default:
      return null
  }
}

// would move this to its own component like "TableActionButton" that takes any icon if time permitted
function DeleteInput({ input }: { input: Input }) {
  const deleteInput = useInputStore(s => s.deleteInput);

  return (
    <Tooltip
      content="Delete Input"
      color="error"
      onClick={() => deleteInput(input.id)}
    >
      <IconButton>
        <TrashIcon size={20} fill="#FF0080" />
      </IconButton>
    </Tooltip>
  );
}