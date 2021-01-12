import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

export default function FullPageSpinner({ error }) {
  console.log('🚀 ~ file: FullPageErrorFallback.js ~ line 5 ~ FullPageSpinner ~ error', error);
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
