import { Button, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';

async function getMetamaskAccount() {
  /* eslint-disable no-undef */
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  /* eslint-disable no-console */
  console.log(account);
}

export default function ConnectWallet() {
  return (
    <>
      <Flex>
        <Spacer />
        <Button colorScheme="blue" variant="outline" type="submit" onClick={getMetamaskAccount}>
          Connect Wallet
        </Button>
      </Flex>
    </>
  );
}
