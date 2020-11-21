import { Button, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';

function Header() {
  return (
    <>
      <Flex>
        <Spacer />
        <Button
          colorScheme="blue"
          variant="outline"
          colorScheme="teal"
          type="submit"
          onClick={() => console.log('Connect Metamask!')}
        >
          Connect Wallet
        </Button>
      </Flex>
    </>
  );
}
export default Header;
