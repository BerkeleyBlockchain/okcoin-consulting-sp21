import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import initOnboard from '../utils/initOnboard';

export default function DashboardView() {
  const [address, setAddress] = useState(null);
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
    <Box bgColor="white" height="100vh" width="100%">
      <NavBar address={address} />
      <Grid templateColumns="repeat(7, 1fr)">
        <GridItem colSpan={12}>
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
