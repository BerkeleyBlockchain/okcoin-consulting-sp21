import { Button, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';

async function getMetamaskAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(account);
}

export default function ConnectWallet() {

  return (
    <>
      <Flex>
        <Spacer />
        <Button
          colorScheme="blue"
          variant="outline"
          colorScheme="teal"
          type="submit"
          onClick={getMetamaskAccount}
        >
          Connect Wallet
        </Button>
      </Flex>
    </>
  );
}
