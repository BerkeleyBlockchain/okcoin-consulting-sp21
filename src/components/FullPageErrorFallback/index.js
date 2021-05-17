import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

export default function FullPageErrorFallback({ error }) {
  return (
    <>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Uh oh... There&apos;s a problem. Try refreshing the app.</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    </>
  );
}
