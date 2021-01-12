import { Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';
import { useAtom } from 'jotai';
import { tabIndexAtom } from '../utils/atoms';

export default function NavBar() {
  const [, setTabIndex] = useAtom(tabIndexAtom);
  return (
    <Tabs onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Exchanges</Tab>
        <Tab>Price Graphs</Tab>
        <Tab>My Wallet</Tab>
      </TabList>
    </Tabs>
  );
}
