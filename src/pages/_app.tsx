import {getApolloClient} from '../utils/ApolloClient';
import {ApolloProvider} from '@apollo/client';
import React, {ReactNode} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import MainLayout from '../layout/MainLayout';
import '../styles/globals.scss';
import '../styles/fonts.scss';
import {WalletProvider} from '../hooks/useWallet';

export default function MyApp({Component, pageProps}: AppProps): ReactNode {
  return (
    <WalletProvider>
      <ApolloProvider client={getApolloClient}>
        <MainLayout>
          <Head>
            <link rel="manifest" href="/manifest.json"/>
            <link
              rel="preload"
              href="/fonts/Gilroy-Bold.ttf"
              as="font"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/Gilroy-Medium.ttf"
              as="font"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/Gilroy-Semibold.ttf"
              as="font"
              crossOrigin="anonymous"
            />
          </Head>
          <Component {...pageProps} />
        </MainLayout>
      </ApolloProvider>
    </WalletProvider>
  );
}
