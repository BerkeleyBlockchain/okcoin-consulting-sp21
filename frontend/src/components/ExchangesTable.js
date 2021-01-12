import { Box, Container, Image, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useAtom } from 'jotai';
import { midpricesAtom } from '../utils/atoms';

function ExchangesTable() {
  const [midprices] = useAtom(midpricesAtom);

  return (
    <Container maxW="xl">
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Exchange</Th>
            <Th isNumeric>Rate</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Box d="flex" alignItems="center">
                <Image maxW="32px" src="/static/kyber.png" alt="kyber-logo" mr={2} />
                Kyber
              </Box>
            </Td>
            <Td isNumeric>{midprices.kyber}</Td>
          </Tr>
          <Tr>
            <Td>
              <Box d="flex" alignItems="center">
                <Image maxW="32px" src="/static/uniswap.png" alt="uniswap-logo" mr={2} />
                Uniswap
              </Box>
            </Td>
            <Td isNumeric>{midprices.uniswap}</Td>
          </Tr>
          <Tr>
            <Td>
              <Box d="flex" alignItems="center">
                <Image maxW="20px" src="/static/0x.jpg" alt="0x-logo" mr={2} />
                0x
              </Box>
            </Td>
            <Td isNumeric>{midprices.zeroX}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
}

export default ExchangesTable;
