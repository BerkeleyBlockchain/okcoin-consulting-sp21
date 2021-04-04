import {
  Container,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { VictoryContainer, VictoryPie } from 'victory';
// eslint-disable-next-line import/extensions
import CoinCard from './CoinCard';

const chartData = [
  { x: 'BCH', y: 3.5 },
  { x: 'LTC', y: 4.345 },
  { x: 'ETH', y: 3.85 },
];

const tableData = [
  { sender: 'Bitcoin', signer: 'Bancor', value: 56.73, date: 'Dec 6/5:50 PM' },
  { sender: 'Balancer', signer: 'ETH', value: 2.62, date: 'Nov 2/2:00 PM' },
  { sender: 'Balancer', signer: 'ETH', value: 6.62, date: 'Noc 25/1:30 PM' },
  { sender: 'Balancer', signer: 'ETH', value: 32.71, date: 'Aug 1/5:50 PM' },
];

export default function MyWallet() {
  return (
    <Container maxW="4xl">
      <SimpleGrid columns={2} spacing={5} mb={5}>
        <Box borderColor="grey.200" borderWidth={1} borderRadius={8} p={6}>
          <Text>$563.04</Text>
          <Text opacity={0.7} textColor="grey">
            Current Balance
          </Text>
          <Input placeholder="search your tokens" my={6} />
          <HStack spacing={3} justify="center">
            <CoinCard />
            <CoinCard />
            <CoinCard />
          </HStack>
        </Box>
        <Box borderColor="grey.200" borderWidth={1} borderRadius={8} p={6}>
          <Text textAlign="center">Top Available Tokens</Text>
          <VictoryPie
            data={chartData}
            colorScale={['darkblue', 'DodgerBlue', 'aquamarine']}
            padAngle={6}
            innerRadius={100}
            radius={90}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            height={300}
            containerComponent={<VictoryContainer responsive={false} />}
          />
        </Box>
      </SimpleGrid>
      <Box borderColor="grey.200" borderWidth={1} borderRadius={8} padding={6}>
        <Flex align="center">
          <Text>Swap History</Text>
          <ButtonGroup size="sm" isAttached variant="outline" ml={6}>
            <Button>All</Button>
            <Button>Oldest</Button>
            <Button>Recent</Button>
          </ButtonGroup>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Sender Token</Th>
              <Th>Signer Token</Th>
              <Th isNumeric>Value</Th>
              <Th>Date/Time</Th>
              <Th>Detail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map(({ sender, signer, value, date }) => {
              return (
                <Tr key={date}>
                  <Td>{sender}</Td>
                  <Td>{signer}</Td>
                  <Td isNumeric>${value}</Td>
                  <Td>{date}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}
