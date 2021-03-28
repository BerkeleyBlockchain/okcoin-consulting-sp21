/* eslint-disable */
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import Onboard from 'bnc-onboard';
import Web3 from 'web3';

import ExchangesTable from '../components/ExchangesTable';
import MyWallet from '../components/MyWallet';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import { tabIndexAtom } from '../utils/atoms';

export default function DashboardView() {
  let web3;
  //const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [tabIndex] = useAtom(tabIndexAtom);

  const onboard = Onboard({
    dappId: 'd6aa46ce-1375-4ead-aa93-3cf905fc6dcc', // [String] The API key created by step one above
    networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
    subscriptions: {
      wallet: (wallet) => {
        web3 = new Web3(wallet.provider);
      },
    },
  });

  async function login() {
    try {
      let selected = await onboard.walletSelect();
      if (!selected) {
        return;
      }
      let ready = await onboard.walletCheck();
      setUserAuthenticated(true);
    } catch {
      console.log(`Failed to load web3, accounts, or contract`);
      console.error(error);
    }
  }

  return (
    <Box bgColor="#F7F9FC" minWidth={tabIndex === 1 ? '1550px' : '1000px'}>
      <Grid templateColumns="repeat(7, 1fr)">
        <GridItem shadow="lg" minHeight="100vh" colSpan={4} ml={8} bgColor="white">
          <Box shadow="md" mb={4}>
            <NavBar />
          </Box>
          <Box p={4}>
            {tabIndex === 0 ? <ExchangesTable /> : null}
            {tabIndex === 1 ? <MyWallet /> : null}
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <Container minWidth={500}>
            <Box bgColor="white" mt="100px">
              <SwapForm
                web3={web3}
                userAuthenticated={userAuthenticated}
                pressConnectWallet={login}
              />
            </Box>
          </Container>
        </GridItem>
      </Grid>
    </Box>
  );
}
