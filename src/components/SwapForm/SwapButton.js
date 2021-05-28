import { Button } from '@chakra-ui/react';
import React from 'react';

export default function SwapButton({
  disabled,
  isLoading,
  loadingText,
  buttonText,
  onClick,
  type,
}) {
  return (
    <Button
      w="100%"
      h="60px"
      bgGradient="linear(to-l, #FF0080,#7928CA)"
      _hover={{ backgroundColor: '#7928CA' }}
      backgroundColor="gray"
      color="white"
      size="lg"
      mt={6}
      mb={10}
      fontFamily="Poppins"
      fontWeight="600"
      disabled={disabled}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
      type={type}
    >
      {buttonText}
    </Button>
  );
}
