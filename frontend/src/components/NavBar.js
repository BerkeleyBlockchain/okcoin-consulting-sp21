import { Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';

export default function NavBar({ setTabIndex }) {
  return (
    <Tabs onChange={(index) => setTabIndex(index)}>
      <TabList>
<<<<<<< HEAD
<<<<<<< HEAD
        <Tab>Exchanges</Tab>
        <Tab>Price Graphs</Tab>
        <Tab>My Wallet</Tab>
=======
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
>>>>>>> 7b6cf30 (add tabs)
=======
        <Tab>Exchanges</Tab>
        <Tab>Price Graphs</Tab>
        <Tab>My Wallet</Tab>
>>>>>>> a9fa563 (add mywallet view)
      </TabList>
    </Tabs>
  );
}
