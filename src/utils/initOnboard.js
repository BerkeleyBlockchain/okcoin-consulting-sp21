import Onboard from 'bnc-onboard';

const networkId = 1;
const dappId = 'e91fc253-2191-4ac1-986f-37b96bb7462a';

export default function initOnboard(subscriptions) {
  return Onboard({
    dappId,
    hideBranding: false,
    networkId,
    // darkMode: true,
    subscriptions,
  });
}
