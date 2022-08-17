import {networkParams} from './networkParams';

const toHex = (num: number) => {
  const val = Number(num);
  return `0x${ val.toString(16)}`;
};

export const switchNetworkIfRequired = async (chainId: number) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: toHex(chainId)}]
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkParams[toHex(chainId)]]
        });
      }

      throw switchError;
    }
  }
};
