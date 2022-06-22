import { Tab as AriaTab, TabList, TabPanel, TabStateReturn, useTabState } from "reakit/Tab";
import { Wrapper } from './style';
import router from 'next/router';

type TabItem = {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode | string | null,
}

export function Tab({ tabs, label, children, actions = null, tabStateReturn: tabState, onTabClick }: React.PropsWithChildren<{
  tabs: TabItem[];
  /* label of the tab group for a11y */
  label: string;
  actions?: React.ReactNode;
  tabStateReturn: TabStateReturn;
  onTabClick?: () => void;
}>) {
  return (
    <div className={Wrapper}>
      <div className="header">
        <TabList {...tabState} className="tab-list" aria-label={label}>
          {tabs.map(tab => (
            <AriaTab {...tabState} key={tab.id} className="tab" id={tab.id} onClick={onTabClick}>
              {tab.title}
            </AriaTab>
          ))}
        </TabList>
        <div className="actions">
          {actions}
        </div>
      </div>
      {tabs.map(tab => (
        <TabPanel key={tab.id} {...tabState} tabId={tab.id}>
          {tab.content}
        </TabPanel>
      ))}
      {children}
    </div>
  );
}
