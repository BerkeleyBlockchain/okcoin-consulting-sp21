export default {
  success: {
    title: 'Swap Success',
    description: 'Your swap was successfully executed',
    status: 'success',
    duration: 9000,
    isClosable: true,
  },
  error: {
    title: 'Swap Error',
    description: 'There was an error while executing your swap, check the console',
    status: 'error',
    duration: 9000,
    isClosable: true,
  },
  networkMismatch: {
    title: 'Network Mismatch Error',
    description: `Your wallet network does not match the DEX network, please change the network on your wallet configuration.`,
    status: 'error',
    duration: 9000,
    isClosable: true,
  },
};
