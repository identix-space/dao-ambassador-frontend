import React, {useState, createContext, useContext, useEffect} from 'react';
import Web3 from 'web3';

import {Error, WalletProviderProps, WalletData, initialWalletData} from './types';

import {gnosisSafe, hooks} from '../utils/gnosisSafe';

const {
  useChainId,
  useAccounts,
  useIsActive,
  useProvider,
  useENSNames
} = hooks;

declare global {
  interface Window {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     ethereum: any;
  }
}


const web3 = new Web3(Web3.givenProvider);
export const GnosisContext = createContext<WalletData>(initialWalletData);

const isInstalled = () => {
  return !!window.ethereum;
};


export const GnosisProvider: React.FC<WalletProviderProps> = ({children}) => {
  const chainId = useChainId();
  const accounts = useAccounts();

  const [account, setAccount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [wallet, setWallet] = useState<string | null>('');

  const connect = async () => {
    if (!isInstalled()) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    gnosisSafe.connectEagerly();

    if (accounts) {
      setAccount(accounts[0]);
      sessionStorage.setItem('wallet', 'gnosisSafe');
      sessionStorage.setItem('account', accounts[0]);
    }

  };
  const disconnect = async () => {
    window.location.reload();
  };


  const sendTransaction = () => {
    let pending = false;

    if (pending) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentSafeAddress = provider?.provider.safe.safeAddress;
    pending = true;
    const signer = provider?.getSigner(0);
    signer?.sendTransaction({to: currentSafeAddress, value: '123'}).then((hash) => {
      console.log(hash);
    }).finally(() => {
      pending = false;
    }).catch((err: Error) => {
      console.error(err);
    });

  };

  const getBalance = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentSafeAddress = provider?.provider.safe.safeAddress;
    const resHex = await gnosisSafe.sdk?.eth.getBalance([
      currentSafeAddress
    ]);

    const res = parseInt(resHex!, 16) / 1e18;

    // eslint-disable-next-line no-alert
    alert(res);
  };

  const signData = async () => {
    const signer = provider?.getSigner(0);
    const signed = await signer?.signMessage('hello');
    console.log(signed);
  };

  useEffect(() => {
    if (accounts) {
      setAccount(accounts[0]);
      sessionStorage.setItem('account', accounts[0]);
    }
  }, [accounts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWallet(sessionStorage.getItem('wallet'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (wallet === 'gnosisSafe') {
      connect();
    }
  }, [wallet]);

  const values: WalletData = {
    account,
    chainId,
    isActive,
    error,
    connect,
    getBalance,
    signData,
    sendTransaction,
    disconnect
  };

  return (
    <GnosisContext.Provider value={{...values}}>
      {children}
    </GnosisContext.Provider>
  );
};

export default function useGnosis(): WalletData {
  const context = useContext(GnosisContext);

  if (!context) {
    throw new Error('useGnosis hook must be used with a GnosisProvider component');
  }

  return context;
}
