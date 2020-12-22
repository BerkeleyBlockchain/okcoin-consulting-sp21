import { useEffect, useState } from 'react';
import * as ethers from 'ethers';

export default function useGas() {
  const [gas, setGas] = useState(0);

  // Get Ethereum provider
  const provider = new ethers.providers.InfuraProvider('mainnet', {
    projectId: '72bad8d7710242c193209a2e7ddc19bc',
  });

  useEffect(() => {
    const getGasPrice = async () => {
      const gasPrice = await provider.getGasPrice();
      const gweiDecimals = ethers.utils.formatUnits(gasPrice, 'gwei');
      setGas(gweiDecimals);
    };
    getGasPrice();
  }, []);

  return gas;
}
