/* eslint-disable */
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { Component } from 'react';
import getWeb3 from './hooks/getWeb3';
import NavBar from './components/NavBar';
import SwapForm from './components/SwapForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { web3: null, account: null };
  }

  async componentDidMount() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const account = await web3.eth.getAccounts()[0];

      // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3 and account values
      this.setState({ web3, account });

      console.log(this.state.web3);
      console.log(this.state.accounts);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }

  render() {
    if (!this.state.web3) {
      /* Run if Web3 wallet is not connected */
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const config = {
      useSystemColorMode: false,
      initialColorMode: 'light',
      fonts: {
        heading: 'Open Sans',
        body: 'Raleway'
      }
    };

    const customTheme = extendTheme({ config });

    return (
      <ChakraProvider resetCSS theme={customTheme}>
        <Box bg="gray.200" h="100vh">
          <NavBar />
          <SwapForm />
        </Box>
      </ChakraProvider>
    );
  }
}

export default App;
