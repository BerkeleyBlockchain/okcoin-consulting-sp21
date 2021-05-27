import { Box, Container } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import Eth from 'web3-eth';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import { addressAtom, balanceAtom, networkAtom, onboardAtom } from '../utils/atoms';
import initOnboard from '../utils/initOnboard';

export default function DashboardView() {
  const [, setAddress] = useAtom(addressAtom);
  const [, setBalance] = useAtom(balanceAtom);
  const [, setNetwork] = useAtom(networkAtom);

  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useAtom(onboardAtom);

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
    <Box height="100vh" width="100%">
      <NavBar />
      <Container mt="10vh">
        <SwapForm web3={new Eth(wallet.provider)} />
      </Container>
    </Box>
  );
}
