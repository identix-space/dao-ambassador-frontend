import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {LocalStorageWrapper, persistCache} from 'apollo3-cache-persist';
import {setContext} from '@apollo/client/link/context';

const cache = new InMemoryCache();

if (process.env.NEXT_PUBLIC_PERSIST_CACHE === 'true' && typeof window !== 'undefined') {
  persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage)
  }).then(() => {
    // Continue setting up Apollo Client as usual.
  });
}

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL
});
const authLink = setContext((_, {headers}) => {
  const address = localStorage.getItem('account');
  console.log('ApolloClient address:', address);
  if (address) {
    return {
      headers: {
        ...headers,
        address: `${address}`
      }
    };
  } else {
    return {
      headers: {
        ...headers
      }
    };
  }
});


export const getApolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: process.env.NEXT_PUBLIC_DEBUG === 'true'
});
