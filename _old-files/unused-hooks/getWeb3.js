/* eslint-disable no-console */
import Web3 from 'web3';

// eslint-disable-next-line consistent-return
const getWeb3 = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      return web3;
    } catch (error) {
      console.log('THERE IS AN ERROR');
      console.error(error);
    }
  }
  const error = new Error('No MetaMask instance was found.');
  console.error(error);
};

export default getWeb3;

/*
 *   // // check if ther user is already logged into metamask
  //  getWeb3().then(web3 => {
  //   web3.eth.getAccounts(function(err, accounts){
  //     if (err != null) console.error("An error occurred: "+err);
  //     else if (accounts.length == 0) {
  //       console.log("User is not logged in to MetaMask")
  //     } else {
  //       setUserAuthenticated(true)
  //       console.log("User is logged in to MetaMask")
  //     };
  //   });
  //  })
 */
