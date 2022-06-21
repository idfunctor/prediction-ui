import { Button, Row } from "@nextui-org/react"
import { Tab } from "components/Tab/Tab"

import { InputListTable } from "modules/Inputs/InputListTable"
import { UploadDialog } from "modules/Inputs/UploadDialog/UploadDialog"
import { PredictionsListTable } from "modules/Predictions/PredictionsListTable"


export const HomeTabs = () => {
  return (
      <Tab
        actions={<UploadDialog />}
        label="prediction"
        tabs={[{
          id: 'grid',
          title: 'Inputs',
          content: <InputListTable />
        }, {
          id: 'predict-table',
          title: 'Predictions',
          content: <PredictionsListTable />
        }]}
      />
  )
}