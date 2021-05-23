/* eslint-disable no-unused-vars */
import { Box, Container } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import { addressAtom, balanceAtom, onboardAtom } from '../utils/atoms';
import initOnboard from '../utils/initOnboard';

export default function DashboardView() {
  const [address, setAddress] = useAtom(addressAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [, setNetwork] = useState(null);

  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useAtom(onboardAtom);

  const web3 = new Web3(wallet.provider);

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
      <NavBar web3={web3} />
      <Container mt="10vh">
        <SwapForm web3={web3} />
      </Container>
    </Box>
  );
}
