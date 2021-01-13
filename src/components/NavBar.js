import { Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';
import { useAtom } from 'jotai';
import { tabIndexAtom } from '../utils/atoms';

export default function NavBar() {
  const [, setTabIndex] = useAtom(tabIndexAtom);
  return (
    <Tabs size="lg" onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab ml={10} pt={4} pb={4}>
          Exchanges
        </Tab>
        <Tab ml={4} mr={10} pt={4} pb={4}>
          My Wallet
        </Tab>
      </TabList>
    </Tabs>
  );
}
