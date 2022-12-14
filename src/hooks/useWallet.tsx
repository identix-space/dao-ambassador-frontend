/* eslint-disable brace-style */
import React, {useState, createContext, useContext} from 'react';

import {WalletProviderProps, WalletData, initialWalletData} from './types';
import {MetamaskContext, MetamaskProvider} from './useMetamask';
import {GnosisProvider, GnosisContext} from './useGnosis';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {redirect} from '../utils/misc';

const publicPaths = ['/login', '/welcome'];

const isWindow = typeof window !== 'undefined';
const wallet = isWindow && localStorage.getItem('wallet');

export const WalletContext = wallet === 'metamask' ? MetamaskContext : wallet === 'gnosisSafe' ? GnosisContext : createContext<WalletData>(initialWalletData);


export const WalletProvider: React.FC<WalletProviderProps> = ({children}) => {
  const [wallets, setWallets] = useState<string | null>('');
  const router = useRouter();
  const pathIsPublic = publicPaths.includes(router.pathname);
  const {contextGnosis} = useWallet();
  // eslint-disable-next-line complexity
  useEffect(() => {
    const adr = localStorage.getItem('account');
    const wallet = localStorage.getItem('wallet');
    if (!pathIsPublic && !adr) {
      redirect('/welcome');
      localStorage.removeItem('account');
    } else if (pathIsPublic && adr && wallet !== 'gnosisSafe') {
      redirect('/collections');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWallets(localStorage.getItem('wallet'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const isGnosis = localStorage.getItem('isGnosisAvailable');
      if (isGnosis === 'true') {
        await contextGnosis.connect();
        console.log('qwer');
        console.log(contextGnosis.account);
      }
    })();
  }, [router]);

  if (wallets === 'metamask') {
    return (
      <MetamaskProvider>
        {children}
      </MetamaskProvider>
    );
  }
  if (wallets === 'gnosisSafe') {
    return (
      <GnosisProvider>
        {children}
      </GnosisProvider>
    );
  }
  return (
    <GnosisProvider>
      <MetamaskProvider>
        {children}
      </MetamaskProvider>
    </GnosisProvider>
  );

};

export const ModalWallet = () => {
  const {contextMetamask, contextGnosis} = useWallet();
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsModal(!isModal)}>Open Modal</button>
      {isModal && (
        <div>
          <button onClick={() => { contextGnosis.connect(); window.location.reload(); }}>Connect GnosisSafe</button>
          <button onClick={() => { contextMetamask.connect(); }}>Connect Metamask</button>
        </div>
      )}
    </>
  );
};

export default function useWallet() {
  const contextMetamask = useContext(MetamaskContext);
  const contextGnosis = useContext(GnosisContext);
  const context = useContext(WalletContext);

  if (!contextMetamask || !contextGnosis || !contextMetamask) {
    throw new Error('useWallet hook must be used with a WalletProvider component');
  }

  return {contextMetamask, contextGnosis, context};
}
