import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import Web3 from 'web3';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import ExchangesTable from '../components/ExchangesTable';
import MyWallet from '../components/MyWallet';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import { tabIndexAtom } from '../utils/atoms';
import initOnboard from '../utils/initOnboard';

export default function DashboardView() {
  const [tabIndex] = useAtom(tabIndexAtom);

  const [, setAddress] = useState(null);
  const [, setNetwork] = useState(null);
  const [, setBalance] = useState(null);

  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useState(null);

  useEffect(() => {
    const ob = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: setBalance,
      wallet: (w) => {
        if (w.provider) {
          setWallet(w);
          window.localStorage.setItem('selectedWallet', w.name);
        } else {
          setWallet({});
        }
      },
    });

    setOnboard(ob);
  }, []);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet');

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

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
              <SwapForm web3={new Web3(wallet.provider)} wallet={wallet} onboard={onboard} />
            </Box>
          </Container>
        </GridItem>
      </Grid>
    </Box>
  );
}
