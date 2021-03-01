import { Box, Image, Td, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useState, React } from 'react';
import { midpricesAtom } from '../utils/atoms';

function ExchangesTable() {
  // if the midprice is 0 then the price is not found
  /* eslint-disable no-unused-vars */
  /* eslint-disable prettier/prettier */
  /* eslint-disable react/self-closing-comp */
  const [midprices] = useAtom(midpricesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    console.log(midprices)
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
        {loading ? (
          <div> Loading </div>
        ) : (
          Object.keys(midprices).map((exchange) =>
            midprices[exchange] !== 0 ? (
            <Tr>
              <Td>
                <Box d="flex" alignItems="center">
                  <Image maxW="32px" src={`/static/${exchange}.png`} alt={`${exchange}-logo`} mr={2} />
                  {exchange}
                </Box>
              </Td>
              <Td isNumeric>{midprices[exchange]}</Td>
            </Tr>
            ) : (
              <div></div>
            )
          )
        )}
      </Tbody>
    </Table>
  );
}

export default ExchangesTable;
