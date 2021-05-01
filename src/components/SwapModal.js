/* eslint-disable */
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useClipboard,
    Text,
    Flex,
  } from '@chakra-ui/react';
  import SwapInfo from './SwapForm/SwapInfo'
  import React from 'react';
  
  export default function SwapModal({address, onboard, errors, isOpen, onClose, setSwapConfirmed, watchAmountIn, watchTokenIn, watchTokenOut, price, defaults, exchanges, gasPrice, estimatedGas, getPicture}) {
    const walletState = onboard.getState();
    const { onCopy } = useClipboard(address);
  
    return (
      <>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent borderRadius={20}>
            <ModalHeader fontFamily="Poppins" fontWeight="700">
              Confirm Swap
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box borderColor="grey.200" borderWidth={1} borderRadius={20} padding={6}>
                <Flex direction="row" justify="space-between">
                    <Flex direction="row" justify="space-around" align="center">
                        <img src={getPicture(watchTokenIn.value)} defaultsource={getPicture(watchTokenIn.value)} alt={watchTokenIn.value} />
                        <Text fontSize="1.6em" fontFamily="Poppins" fontWeight="500">
                        {watchAmountIn}
                        </Text>
                    </Flex>
                    <Text fontSize="1.6em" fontFamily="Poppins" fontWeight="500">
                        {watchTokenIn.value}
                    </Text>
                </Flex>
                <Flex direction="row" justify="space-between">
                    <Flex direction="row" justify="space-around" align="center">
                        <img src={getPicture(watchTokenOut.value)} defaultsource={getPicture(watchTokenOut.value)} alt={watchTokenOut.value} />
                        <Text fontSize="1.6em" fontFamily="Poppins" fontWeight="500">
                        {price}
                        </Text>
                    </Flex>
                    <Text fontSize="1.6em" fontFamily="Poppins" fontWeight="500">
                        {watchTokenOut.value}
                    </Text>
                </Flex>
                <SwapInfo 
                    watchTokenIn={watchTokenIn}
                    watchTokenOut={watchTokenOut}
                    price={price}
                    defaults={defaults}
                    exchanges={exchanges}
                    gasPrice={gasPrice}
                    estimatedGas={estimatedGas}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
            <Button
                w="100%"
                h="60px"
                _hover={{ backgroundColor: '#194BB6' }}
                backgroundColor="#205FEC"
                color="white"
                size="lg"
                type="submit"
                mt={6}
                mb={10}
                fontFamily="Poppins"
                fontWeight="600"
                onClick={() => {
                    onClose()
                    setSwapConfirmed(true);
                }}
              >
                {errors.amountIn ? 'Input Amount required' : 'Confirm Swap'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  