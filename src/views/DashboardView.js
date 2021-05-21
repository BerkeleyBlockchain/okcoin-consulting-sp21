import { Box, Container } from '@chakra-ui/react';
import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { tabIndexAtom } from '../utils/atoms';
import NavBar from '../components/NavBar';
import SwapForm from '../components/SwapForm';
import initOnboard from '../utils/initOnboard';
import DocsView from './DocsView';

export default function DashboardView() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [, setNetwork] = useState(null);
  const [tabIndex] = useAtom(tabIndexAtom);
  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useState(null);

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
      <NavBar address={address} balance={balance} onboard={onboard} web3={web3} />
      {tabIndex === 0 ? (
        <Container mt="10vh">
          <SwapForm
            onboardState={onboard ? onboard.getState() : null}
            web3={web3}
            wallet={wallet}
            onboard={onboard}
          />
        </Container>
      ) : null}
      {tabIndex === 1 ? (
        <Container maxW="8xl">
          <DocsView />
        </Container>
      ) : null}
    </Box>
  );
}
