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
  useColorModeValue,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import React from 'react';

export default function AccountModal({ address, onboard }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const walletState = onboard.getState();
  const { onCopy } = useClipboard(address);

  return (
    <>
      <Button
        size="md"
        colorScheme={useColorModeValue('blue', 'gray')}
        variant="solid"
        onClick={onOpen}
      >
        {`${address?.substr(0, 6)}...${address?.substr(address.length - 4)}`}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={20}>
          <ModalHeader fontWeight="700">Account Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderColor="grey.200" borderWidth={1} borderRadius={20} padding={6}>
              <Text fontSize="sm" fontWeight="500">
                Connected Wallet: {`${walletState.wallet.name}`}
              </Text>
              <Text fontSize="1.6em" fontWeight="500">
                {`${address?.substr(0, 8)}...${address?.substr(address.length - 6)}`}
              </Text>
              <Button fontSize="sm" variant="link" onClick={onCopy}>
                <CopyIcon mr={1} /> Copy Address
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={useColorModeValue('blue', 'gray')}
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
