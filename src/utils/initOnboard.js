import Onboard from 'bnc-onboard';

const networkId = 4;
const rpcUrl = 'https://rinkeby.infura.io/v3/cea9deb6467748b0b81b920b005c10c1';
const apiUrl = process.env.REACT_APP_API_URL;
const dappId = '12153f55-f29e-4f11-aa07-90f10da5d778';

export default function initOnboard(subscriptions) {
  const onboard = Onboard;
  return onboard({
    dappId,
    hideBranding: false,
    networkId,
    apiUrl,
    // darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'trezor',
          appUrl: 'https://reactdemo.blocknative.com',
          email: 'aaron@blocknative.com',
          rpcUrl,
        },
        {
          walletName: 'ledger',
          rpcUrl,
        },
        { walletName: 'authereum', disableNotifications: true },
        {
          walletName: 'lattice',
          appName: 'Onboard Demo',
          rpcUrl,
        },
        { walletName: 'coinbase' },
        { walletName: 'status' },
        { walletName: 'walletLink', rpcUrl },
        {
          walletName: 'portis',
          apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b',
        },
        { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
        { walletName: 'torus' },
        { walletName: 'trust', rpcUrl },
        {
          walletName: 'walletConnect',
          infuraKey: 'cea9deb6467748b0b81b920b005c10c1',
        },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl },
        { walletName: 'wallet.io', rpcUrl },
        { walletName: 'huobiwallet', rpcUrl },
        { walletName: 'hyperpay' },
        { walletName: 'atoken' },
        { walletName: 'liquality' },
        { walletName: 'frame' },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' },
    ],
  });
}
