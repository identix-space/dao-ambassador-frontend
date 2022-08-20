/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Json: any;
};

export type Account = Node & {
  __typename?: 'Account';
  collections?: Maybe<Array<SbtCollection>>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['Int'];
  roles: Array<AccountRole>;
  sessions?: Maybe<Array<AccountSession>>;
  souls?: Maybe<Array<Soul>>;
  status: AccountStatus;
  updatedAt: Scalars['Date'];
};


export type AccountCollectionsArgs = {
  onlyMine: Scalars['Boolean'];
};

export enum AccountRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type AccountSession = Node & {
  __typename?: 'AccountSession';
  account: Account;
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  expiresAt: Scalars['Date'];
  id: Scalars['Int'];
  ipAddr: Scalars['String'];
  updatedAt: Scalars['Date'];
  userAgent?: Maybe<UserAgent>;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED'
}

export type AuthResult = {
  __typename?: 'AuthResult';
  account: Account;
  token: Scalars['String'];
};

export type CostComplexity = {
  max?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Int']>;
};

export type GenerateEmailCodeResult = {
  __typename?: 'GenerateEmailCodeResult';
  expiresAt: Scalars['Date'];
  result: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateAccount: Scalars['Boolean'];
  addEventCollectionCreate: Scalars['Boolean'];
  addEventSoulCreate: Scalars['Boolean'];
  addEventTokenCreate: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  echo: Scalars['String'];
  generateEmailCode: GenerateEmailCodeResult;
  generateOtc: Scalars['String'];
  login: AuthResult;
  logout: Scalars['Boolean'];
  register: AuthResult;
  resetPassword: Scalars['Boolean'];
  verifyOtc: AuthResult;
};


export type MutationActivateAccountArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddEventCollectionCreateArgs = {
  collectionName: Scalars['String'];
  collectionSymbol: Scalars['String'];
  contractAddress: Scalars['String'];
  txHash: Scalars['String'];
};


export type MutationAddEventSoulCreateArgs = {
  soulAddress: Scalars['String'];
  txHash: Scalars['String'];
};


export type MutationAddEventTokenCreateArgs = {
  collectionContractAddress: Scalars['String'];
  description: Scalars['String'];
  metadata: Scalars['Json'];
  soulAddress: Scalars['String'];
  tokenId: Scalars['String'];
  txHash: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationEchoArgs = {
  text: Scalars['String'];
};


export type MutationGenerateEmailCodeArgs = {
  email: Scalars['String'];
};


export type MutationGenerateOtcArgs = {
  address: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  sessionIds?: InputMaybe<Array<Scalars['Int']>>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  emailCode: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationVerifyOtcArgs = {
  address: Scalars['String'];
  code: Scalars['String'];
  signature: Scalars['String'];
};

export type Node = {
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  currentSession: AccountSession;
  debug?: Maybe<Scalars['Json']>;
  error?: Maybe<Scalars['Int']>;
  token: SbtToken;
  whoami: Account;
};


export type QueryDebugArgs = {
  showAdditionalInfo: Scalars['Boolean'];
};


export type QueryTokenArgs = {
  collectionAddress: Scalars['String'];
  tokenId: Scalars['String'];
};

export type SbtCollection = {
  __typename?: 'SbtCollection';
  address: Scalars['String'];
  createdAt: Scalars['Date'];
  creator: Account;
  id: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  tokens?: Maybe<Array<SbtToken>>;
  updatedAt: Scalars['Date'];
};

export type SbtToken = {
  __typename?: 'SbtToken';
  collection: SbtCollection;
  createdAt: Scalars['Date'];
  creator: Account;
  id: Scalars['Int'];
  idInCollection: Scalars['String'];
  metadata: Scalars['Json'];
  targetSoul: Soul;
  updatedAt: Scalars['Date'];
};

export type Soul = {
  __typename?: 'Soul';
  address: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  owner: Account;
  relatedTokens?: Maybe<Array<SbtToken>>;
  updatedAt: Scalars['Date'];
};

export type UserAgent = {
  __typename?: 'UserAgent';
  browser?: Maybe<UserAgentBrowser>;
  cpu?: Maybe<UserAgentCpu>;
  engine?: Maybe<UserAgentEngine>;
  os?: Maybe<UserAgentOs>;
  ua?: Maybe<Scalars['String']>;
};

export type UserAgentBrowser = {
  __typename?: 'UserAgentBrowser';
  major?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UserAgentCpu = {
  __typename?: 'UserAgentCpu';
  architecture?: Maybe<Scalars['String']>;
};

export type UserAgentEngine = {
  __typename?: 'UserAgentEngine';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UserAgentOs = {
  __typename?: 'UserAgentOs';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type GenerateOtcMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type GenerateOtcMutation = { __typename?: 'Mutation', generateOtc: string };

export type VerifyOtcMutationVariables = Exact<{
  address: Scalars['String'];
  code: Scalars['String'];
  signature: Scalars['String'];
}>;


export type VerifyOtcMutation = { __typename?: 'Mutation', verifyOtc: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number } } };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { __typename?: 'Query', whoami: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, status: AccountStatus, roles: Array<AccountRole>, souls?: Array<{ __typename?: 'Soul', id: number, createdAt: any, updatedAt: any, address: string, owner: { __typename?: 'Account', sessions?: Array<{ __typename?: 'AccountSession', address?: string | null }> | null }, relatedTokens?: Array<{ __typename?: 'SbtToken', id: number, createdAt: any, updatedAt: any, idInCollection: string, metadata: any, collection: { __typename?: 'SbtCollection', name: string }, creator: { __typename?: 'Account', sessions?: Array<{ __typename?: 'AccountSession', address?: string | null }> | null }, targetSoul: { __typename?: 'Soul', id: number, address: string, owner: { __typename?: 'Account', sessions?: Array<{ __typename?: 'AccountSession', address?: string | null }> | null } } }> | null }> | null } };


export const GenerateOtcDocument = gql`
    mutation GenerateOtc($address: String!) {
  generateOtc(address: $address)
}
    `;
export type GenerateOtcMutationFn = Apollo.MutationFunction<GenerateOtcMutation, GenerateOtcMutationVariables>;

/**
 * __useGenerateOtcMutation__
 *
 * To run a mutation, you first call `useGenerateOtcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOtcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOtcMutation, { data, loading, error }] = useGenerateOtcMutation({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGenerateOtcMutation(baseOptions?: Apollo.MutationHookOptions<GenerateOtcMutation, GenerateOtcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateOtcMutation, GenerateOtcMutationVariables>(GenerateOtcDocument, options);
      }
export type GenerateOtcMutationHookResult = ReturnType<typeof useGenerateOtcMutation>;
export type GenerateOtcMutationResult = Apollo.MutationResult<GenerateOtcMutation>;
export type GenerateOtcMutationOptions = Apollo.BaseMutationOptions<GenerateOtcMutation, GenerateOtcMutationVariables>;
export const VerifyOtcDocument = gql`
    mutation VerifyOtc($address: String!, $code: String!, $signature: String!) {
  verifyOtc(address: $address, code: $code, signature: $signature) {
    account {
      id
    }
    token
  }
}
    `;
export type VerifyOtcMutationFn = Apollo.MutationFunction<VerifyOtcMutation, VerifyOtcMutationVariables>;

/**
 * __useVerifyOtcMutation__
 *
 * To run a mutation, you first call `useVerifyOtcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtcMutation, { data, loading, error }] = useVerifyOtcMutation({
 *   variables: {
 *      address: // value for 'address'
 *      code: // value for 'code'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useVerifyOtcMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtcMutation, VerifyOtcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtcMutation, VerifyOtcMutationVariables>(VerifyOtcDocument, options);
      }
export type VerifyOtcMutationHookResult = ReturnType<typeof useVerifyOtcMutation>;
export type VerifyOtcMutationResult = Apollo.MutationResult<VerifyOtcMutation>;
export type VerifyOtcMutationOptions = Apollo.BaseMutationOptions<VerifyOtcMutation, VerifyOtcMutationVariables>;
export const WhoamiDocument = gql`
    query whoami {
  whoami {
    id
    createdAt
    updatedAt
    status
    roles
    souls {
      id
      createdAt
      updatedAt
      address
      owner {
        sessions {
          address
        }
      }
      relatedTokens {
        id
        createdAt
        updatedAt
        collection {
          name
        }
        idInCollection
        creator {
          sessions {
            address
          }
        }
        targetSoul {
          id
          address
          owner {
            sessions {
              address
            }
          }
        }
        metadata
      }
    }
  }
}
    `;

/**
 * __useWhoamiQuery__
 *
 * To run a query within a React component, call `useWhoamiQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoamiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoamiQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoamiQuery(baseOptions?: Apollo.QueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
      }
export function useWhoamiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
        }
export type WhoamiQueryHookResult = ReturnType<typeof useWhoamiQuery>;
export type WhoamiLazyQueryHookResult = ReturnType<typeof useWhoamiLazyQuery>;
export type WhoamiQueryResult = Apollo.QueryResult<WhoamiQuery, WhoamiQueryVariables>;
