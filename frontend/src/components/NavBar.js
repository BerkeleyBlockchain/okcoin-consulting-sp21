import { Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';

export default function NavBar({ setTabIndex }) {
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
