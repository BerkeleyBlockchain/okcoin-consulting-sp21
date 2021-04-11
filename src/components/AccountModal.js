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
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function AccountModal({ address, onboard }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const walletState = onboard.getState();
  const shortAddress = `${address?.substr(0, 6)}...${address?.substr(address.length - 4)}`;

  return (
    <>
      <Button size="md" colorScheme="blue" variant="solid" fontFamily="Poppins" onClick={onOpen}>
        {shortAddress}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={20}>
          <ModalHeader fontFamily="Poppins" fontWeight="700">
            Account Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderColor="grey.200" borderWidth={1} borderRadius={20} padding={6}>
              <Text fontSize="sm" fontFamily="Poppins" fontWeight="500">
                Connected Wallet: {`${walletState.wallet.name}`}
              </Text>
              <Text fontSize="1.6em" fontFamily="Poppins" fontWeight="500">
                {shortAddress}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              fontFamily="Poppins"
              colorScheme="blue"
              onClick={() => {
                onClose();
                onboard.walletSelect();
              }}
            >
              Change Wallet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
