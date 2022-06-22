import { Button, Input, Modal, Row, Text } from "@nextui-org/react"
import { Tab } from "components/Tab/Tab"

import { InputListTable } from "modules/Inputs/InputListTable"
import { UploadDialog } from "modules/Inputs/UploadDialog/UploadDialog"
import { PredictionModal } from "modules/Predictions/CreatePrediction"
import { PredictionsListTable } from "modules/Predictions/PredictionsListTable"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { TabStateReturn, useTabState } from "reakit"

const HomeTabStateCtx = createContext<TabStateReturn>(undefined as unknown as TabStateReturn);
export const useHomeTabState = () => useContext(HomeTabStateCtx);

export const HomeTabs = () => {
  const tabState = useTabState({ selectedId: 'images' });
  const router = useRouter();

  return (
    <HomeTabStateCtx.Provider value={tabState}>
      <Tab
        onTabClick={() => router.push({
          pathname: '/',
          query: { active: tabState.currentId },
        })}
        tabStateReturn={tabState}
        actions={<UploadDialog />}
        label="prediction"
        tabs={[{
          id: 'images',
          title: 'Images',
          content: <>
            <InputListTable />
          </>
        }, {
          id: 'predictions',
          title: 'Predictions',
          content: <PredictionsListTable />
        }]}
      />
      <PredictionModal />
    </HomeTabStateCtx.Provider>
  )
}