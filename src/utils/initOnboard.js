import Onboard from 'bnc-onboard';

const networkId =
  process.env.REACT_APP_ENV === 'production'
    ? parseInt(process.env.REACT_APP_ONBOARD_NETWORKID_PROD, 10)
    : parseInt(process.env.REACT_APP_ONBOARD_NETWORKID_DEV, 10);

const dappId = process.env.REACT_APP_ONBOARD_DAPPID;

export default function initOnboard(subscriptions, tokenBalanceCheck) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    // darkMode: true,
    subscriptions,
    walletCheck: tokenBalanceCheck,
  });
}
