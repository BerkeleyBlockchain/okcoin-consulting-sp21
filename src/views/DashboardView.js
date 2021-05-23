/* eslint-disable no-unused-vars */
import { Box, Container } from '@chakra-ui/react';
import Web3 from 'web3';
import React, { useEffect, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import initOnboard from '../utils/initOnboard';
import { web3Atom, onboardAtom, balanceAtom, addressAtom } from '../utils/atoms';

export default function DashboardView() {
  const [address, setAddress] = useAtom(addressAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [, setNetwork] = useState(null);

  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useAtom(onboardAtom);

  const [, setWeb3] = useAtom(web3Atom);

  const web3 = new Web3(wallet.provider);

  useCallback(() => {
    setWeb3(web3);
  }, [web3]);

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
      <NavBar address={address} balance={balance} onboard={onboard} web3={web3} />
      <Container mt="10vh">
        <SwapForm />
      </Container>
    </Box>
  );
}
