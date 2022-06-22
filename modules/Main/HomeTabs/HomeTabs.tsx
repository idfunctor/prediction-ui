import { Button, Input, Modal, Row, Text } from "@nextui-org/react"
import { Tab } from "components/Tab/Tab"

import { InputListTable } from "modules/Inputs/InputListTable"
import { UploadDialog } from "modules/Inputs/UploadDialog/UploadDialog"
import { PredictionModal } from "modules/Predictions/CreatePrediction"
import { PredictionListTable } from "modules/Predictions/PredictionListTable"
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
          content: <PredictionListTable />
        }]}
      />
      {/**
       * Modal JSX placed here due to a bug in the UI library where input fields inside of modals have an issue with key capturing if the modal is in a table,
       * I didn't want to change the UI elements at the last moment given that this is just a test project, in a real project this wouldn't
       * happen due to using UI primitives like reakit or react-aria and building my own UI components on top of them.
       */}
      <PredictionModal />
    </HomeTabStateCtx.Provider>
  )
}