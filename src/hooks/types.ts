import React from 'react';

export type Account = string[];
export type connectWallet = (chain: number, accounts: Account) => void;
export interface WalletProviderProps {
  children: React.ReactNode;
}

export interface WalletData {
  account: string | null;
  chainId: number | undefined;
  error: string;
  isActive: boolean;
  connect: () => void;
  disconnect: () => void;
  sendTransaction: () => void;
  getBalance: () => void;
  signData: () => void;

  test(): void;
}

export interface Error {
  code: number;
  message: string;
}

export const initialWalletData: WalletData = {
  account: '',
  chainId: 0,
  error: '',
  isActive: false,
  connect: () => {
    return;
  },
  disconnect: () => {
    return;
  },
  sendTransaction: () => {
    return;
  },
  getBalance: () => {
    return;
  },
  signData: () => {
    return;
  },
  test() {
    return;
  }
};
