
import { Card, Table } from '@nextui-org/react';
import { usePredictionStore } from 'modules/Main/stores';

import { InputTableKeys, renderCell } from './helpers';

const columns = [
  { name: "TITLE", uid: "name" },
  { name: "DESCRIPTION", uid: "size" },
  { name: "TIME", uid: "time" },
  { name: "ACTIONS", uid: "actions" },
];

export const PredictionListTable: React.FC = () => {
  const predList = usePredictionStore(state => state.predictionList)

  if (!predList.length) {
    return <Card variant="flat" style={{ padding: '2rem 4rem' }}> Please create predictions from the Images tab to view them here. </Card>
  }

  return (
    <div>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={predList}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey as InputTableKeys)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
