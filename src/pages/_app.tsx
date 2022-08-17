import {getApolloClient} from '../utils/ApolloClient';
import {ApolloProvider} from '@apollo/client';
import React, {ReactNode} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {WalletProvider} from '../hooks/useWallet';

export default function MyApp({Component, pageProps}: AppProps): ReactNode {
  return (
    <WalletProvider>
      <ApolloProvider client={getApolloClient}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  );
}
