import { Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';

export default function NavBar({ setTabIndex }) {
  return (
    <Tabs onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
    </Tabs>
  );
}
