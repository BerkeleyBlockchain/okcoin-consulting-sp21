/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Box, Button, Container, Grid, GridItem } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ExchangesTable from '../components/ExchangesTable';
import MyWallet from '../components/MyWallet';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import { tabIndexAtom } from '../utils/atoms';
import initOnboard from '../utils/initOnboard';

export default function DashboardView() {
  const [tabIndex] = useAtom(tabIndexAtom);
  const [address, setAddress] = useState(null);
  console.log('🚀 ~ file: DashboardView.js ~ line 17 ~ DashboardView ~ address', address);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState({});

  const [onboard, setOnboard] = useState(null);

  let provider;

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setNetwork,
      balance: setBalance,
      wallet: (wallet) => {
        if (wallet.provider) {
          console.log('WALLET: ', wallet);
          setWallet(wallet);

          const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);

          provider = ethersProvider;
          console.log('🚀 ~ file: DashboardView.js ~ line 39 ~ useEffect ~ provider', provider);

          window.localStorage.setItem('selectedWallet', wallet.name);
        } else {
          provider = null;
          setWallet({});
        }
      },
    });

    setOnboard(onboard);
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
              <SwapForm web3={null} wallet={wallet} onboard={onboard} />
            </Box>
          </Container>
        </GridItem>
      </Grid>
    </Box>
  );
}
