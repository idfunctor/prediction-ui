import { Tab as AriaTab, TabList, TabPanel, useTabState } from "ariakit/tab";
import { Wrapper } from './style';

type TabItem = {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode | string | null,
}

export function Tab({ tabs, label, defaultSelectedId, children, actions = null }: React.PropsWithChildren<{
  tabs: TabItem[],
  /* label of the tab group for a11y */
  label: string,
  defaultSelectedId?: string
  actions?: React.ReactNode,
}>) {
  const tabState = useTabState({ defaultSelectedId });
  return (
    <div className={Wrapper}>
      <div className="header">
        <TabList state={tabState} className="tab-list" aria-label={label}>
          {tabs.map(tab => (
            <AriaTab key={tab.id} className="tab" id={tab.id}>
              {tab.title}
            </AriaTab>
          ))}
        </TabList>
        <div className="actions">
          {actions}
        </div>
      </div>
      {tabs.map(tab => (
        <TabPanel key={tab.id} state={tabState} tabId={tab.id}>
          {tab.content}
        </TabPanel>
      ))}
      {children}
    </div>
  );
}
