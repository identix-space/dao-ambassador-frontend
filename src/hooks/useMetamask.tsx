import React, {useState, createContext, useContext, useEffect} from 'react';
import Web3 from 'web3';

import {switchNetworkIfRequired} from '../utils/switchNetwork';
import {config} from '../config';
import {Account, Error, WalletProviderProps, WalletData, connectWallet, initialWalletData} from './types';
import {redirect} from '../utils/misc';

declare global {
  interface Window {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     ethereum: any;
  }
}
const web3 = new Web3(Web3.givenProvider);
export const MetamaskContext = createContext<WalletData>(initialWalletData);

const isInstalled = () => {
  return !!window.ethereum;
};

const isChainIdCorrect = async () => {
  const chainId = Number(await window.ethereum.chainId);

  return chainId === config.chainId;
};
const isWalletConnected = async () => {
  const isConnected = await window.ethereum.request({method: 'eth_accounts'});

  return isConnected.length > 0;
};

export const MetamaskProvider: React.FC<WalletProviderProps> = ({children}) => {
  const [account, setAccount] = useState<string | null>('');
  const [error, setError] = useState<string>('');
  const [chainId, setChainId] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [wallet, setWallet] = useState<string | null>('');

  const connectWallet = async (cb: connectWallet) => {
    if (!isInstalled()) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    if (!(await isWalletConnected())) {
      setError('Connect your wallet');
    }
    await window.ethereum.request({method: 'eth_requestAccounts'});
    if (!(await isChainIdCorrect())) {
      setError('Select testnet');
      try {
        await switchNetworkIfRequired(config.chainId);
      } catch (err) {
        console.error(err);
        return;
      }
    }

    const accounts = await web3.eth.getAccounts();

    const chain = config.chainId;

    cb?.(chain, accounts);
  };

  const connect = async () => {
    await connectWallet((chain: number, accounts: Account) => {
      sessionStorage.setItem('wallet', 'metamask');
      sessionStorage.setItem('account', accounts[0]);

      setAccount(accounts[0]);
      setChainId(chain);
    });
  };

  const sendTransaction = () => {
    let pending = false;

    if (pending) {
      return;
    }

    const transactionParameters = {
      from: account,
      to: '0x3B53b00062Fbbc605930683A64E3D0Bbc6e89233',
      value: '112121'
    };
    pending = true;
    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    }).finally(() => {
      pending = false;
    }).catch((err: Error) => {
      console.error(err);
    });

  };

  const getBalance = async () => {
    if (!account) {
      return;
    }
    const balance = await web3.eth.getBalance(account);

    // eslint-disable-next-line no-alert
    alert(web3.utils.fromWei(balance));
  };
  const signData = async (data: string, acc: string): Promise<string | null> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const signature = await web3.eth.personal.sign(data, acc);
    if (signature) {
      return signature;
    }
    return null;
  };
  const handleAccountsChanged = (accounts: Account) => {
    if (accounts.length > 0) {
      localStorage.setItem('account', accounts[0]);
      setAccount(accounts[0]);

      window.location.reload();
    } else {
      disconnect();
    }
  };

  const refreshData = () => {
    sessionStorage.removeItem('account');
    setChainId(1);
    setIsActive(false);

    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', disconnect);
    window.ethereum.removeListener('disconnect', disconnect);
  };
  const disconnect = () => {
    refreshData();
    redirect('/login');
    // window.location.reload();
  };

  const checkRightChainIdOnChange = async () => {
    if (!(await isChainIdCorrect())) {
      disconnect();
    }
  };

  useEffect(() => {
    setAccount(sessionStorage.getItem('account'));
    setIsActive(Boolean(sessionStorage.getItem('wallet')));
  }, []);
  useEffect(() => {
    const wallet = sessionStorage.getItem('wallet');
    if (!window.ethereum || !wallet) {
      return;
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', checkRightChainIdOnChange);
    window.ethereum.on('disconnect', disconnect);
  }, [disconnect]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWallet(sessionStorage.getItem('wallet'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (wallet === 'metamask') {
      connect();
    }
  }, [wallet]);

  const values: WalletData = {
    account,
    isActive,
    chainId,
    error,
    connect,
    sendTransaction,
    getBalance,
    signData,
    disconnect,
    test: async () => {
      console.log('test metamask');
    }
  };

  return (
    <MetamaskContext.Provider value={{...values}}>
      {children}
    </MetamaskContext.Provider>
  );
};

export default function useMetamask(): WalletData {
  const context = useContext(MetamaskContext);

  if (!context) {
    throw new Error('useMetaMask hook must be used with a MetaMaskProvider component');
  }

  return context;
}
