import { Box, Image, Td, Tr } from '@chakra-ui/react';
import { React } from 'react';

const ExchangesColumn = (props) => {
  const { exchangeName, midprice, photo, alt } = props;
  // var exchangeNameChange = exchangeName.substring(0, 1).toUpperCase();

  return (
    <Tr>
      <Td>
        <Box d="flex" alignItems="center">
          <Image maxW="32px" src={photo} alt={alt} mr={2} />
          {exchangeName}
        </Box>
      </Td>
      <Td isNumeric>{midprice}</Td>
    </Tr>
  );
};

export default ExchangesColumn;
