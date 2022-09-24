import { useEffect } from 'react';
import { useBlockchain } from '../core/hooks';

export const useApp = () => {
  const { blockchainMethods } = useBlockchain();

  useEffect(() => {
    blockchainMethods.connect();
  }, []);
};
