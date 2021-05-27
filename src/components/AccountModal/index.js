import { CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React from 'react';
import { onboardAtom } from '../../utils/atoms';

export default function AccountModal() {
  const [onboard] = useAtom(onboardAtom);
  const onboardState = onboard?.getState();
  const address = onboardState?.address;
  const walletName = onboardState?.wallet.name;

  const { onCopy } = useClipboard(address);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="md"
        colorScheme={useColorModeValue('blue', 'gray')}
        variant="solid"
        onClick={onOpen}
      >
        {address?.substr(0, 6)}...{address?.substr(address.length - 4)}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={20} bg={useColorModeValue('#eee', '#333333')}>
          <ModalHeader fontWeight="700">Account Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderColor="black" borderWidth={1} borderRadius={20} padding={6}>
              <Text fontSize="sm" fontWeight="500">
                Connected Wallet: {`${walletName}`}
              </Text>
              <Text fontSize="1.6em" fontWeight="500">
                {address?.substr(0, 8)}...{address?.substr(address.length - 6)}
              </Text>
              <Button fontSize="sm" variant="link" onClick={onCopy}>
                <CopyIcon mr={1} /> Copy Address
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              bgGradient="linear(to-l, #FF0080,#7928CA)"
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
