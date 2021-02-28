import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useState, React } from 'react';
import { midpricesAtom } from '../utils/atoms';
import ExchangesColumn from './ExchangesColumn';

function ExchangesTable() {
  // if the midprice is 0 then the price is not found
  /* eslint-disable no-unused-vars */
  /* eslint-disable prettier/prettier */
  /* eslint-disable react/self-closing-comp */
  const [midprices] = useAtom(midpricesAtom);
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
        {loading ? (
          <div> Loading </div>
        ) : (
          Object.keys(midprices).map((exchange, index) =>
            midprices.exchange !== 0 ? (
              <ExchangesColumn exchangeName={exchange} midprice={midprices.exchange} photo={`/static/${exchange}.png`} alt={`${exchange}-logo`}/>
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
