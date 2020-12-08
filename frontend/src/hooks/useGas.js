import { useEffect, useState } from 'react';
import * as ethers from 'ethers';

export default function useGas() {
  const [gas, setGas] = useState(0);
  const provider = ethers.getDefaultProvider('ropsten', {
    infura: 'https://ropsten.infura.io/v3/b2e13b0a648e4c67b4a36951f5b1ed62',
  });

  useEffect(() => {
    const getGasPrice = async () => {
      const gasPrice = await provider.getGasPrice();
      setGas(gasPrice);
    };
    getGasPrice();
  }, []);

  return gas;
}
