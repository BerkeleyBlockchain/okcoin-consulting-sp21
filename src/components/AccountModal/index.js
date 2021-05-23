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
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React from 'react';
import { addressAtom, onboardAtom } from '../../utils/atoms';

export default function AccountModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address] = useAtom(addressAtom);
  const [onboard] = useAtom(onboardAtom);
  const { onCopy } = useClipboard(address);
  const onboardState = onboard?.getState();

  return (
    <>
      <Button size="md" colorScheme="blue" variant="solid" onClick={onOpen}>
        {address?.substr(0, 6)}...{address?.substr(address.length - 4)}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={20}>
          <ModalHeader fontWeight="700">Account Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderColor="grey.200" borderWidth={1} borderRadius={20} padding={6}>
              <Text fontSize="sm" fontWeight="500">
                Connected Wallet: {`${onboardState?.wallet.name}`}
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
