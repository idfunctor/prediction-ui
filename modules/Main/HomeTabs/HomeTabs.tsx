import { Button, Input, Modal, Row, Text } from "@nextui-org/react"
import { Tab } from "components/Tab/Tab"

import { InputListTable } from "modules/Inputs/InputListTable"
import { UploadDialog } from "modules/Inputs/UploadDialog/UploadDialog"
import { PredictionModal } from "modules/Predictions/CreatePrediction"
import { PredictionsListTable } from "modules/Predictions/PredictionsListTable"


export const HomeTabs = () => {
  return (
    <>
      <Tab
        actions={<UploadDialog />}
        label="prediction"
        tabs={[{
          id: 'input-grid',
          title: 'Images',
          content: <>
            <InputListTable />
          </>
        }, {
          id: 'predict-table',
          title: 'Predictions',
          content: <PredictionsListTable />
        }]}
      />
      <PredictionModal />
    </>
  )
}