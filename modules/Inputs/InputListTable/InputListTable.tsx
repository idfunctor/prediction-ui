import { Table } from '@nextui-org/react';
import { useInputStore } from 'modules/Main/stores';

import { InputTableKeys, renderCell } from './helpers';

const columns = [
  { name: "NAME", uid: "name" },
  { name: "SIZE", uid: "size" },
  { name: "TIME", uid: "time" },
  { name: "ACTIONS", uid: "actions" },
];

export const InputListTable: React.FC = () => {
  const inputList = useInputStore(state => state.inputList);

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
        <Table.Body items={inputList}>
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
  );
}
