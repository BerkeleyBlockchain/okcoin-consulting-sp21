import { Image, Td, Table, Tbody, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useState, React } from 'react';
import { pricesAtom } from '../utils/atoms';
import Exchanges from '../constants/exchanges';

function ExchangesTable() {
  // if the midprice is 0 then the price is not found
  const [prices] = useAtom(pricesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });

  return (
    <Table variant="simple" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Exchange</Th>
          <Th isNumeric>Rate</Th>
        </Tr>
      </Thead>
      <Tbody>
        {loading
          ? null
          : Object.keys(prices).map((exchange) =>
              prices[exchange] !== null ? (
                <Tr>
                  <Td>
                    <Text>
                      <Image
                        display="inline"
                        maxW="32px"
                        src={Exchanges.data[exchange].iconSVG}
                        alt={`${exchange}-logo`}
                        mr={2}
                      />
                      {Exchanges.data[exchange].name}
                    </Text>
                  </Td>
                  <Td isNumeric>{prices[exchange]}</Td>
                </Tr>
              ) : null
            )}
      </Tbody>
    </Table>
  );
}

export default ExchangesTable;
