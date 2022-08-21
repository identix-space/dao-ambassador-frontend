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
  login: AuthResult;
  logout: Scalars['Boolean'];
  metadataCreate: Scalars['Int'];
  register: AuthResult;
  resetPassword: Scalars['Boolean'];
};


export type MutationActivateAccountArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddEventCollectionCreateArgs = {
  collectionName: Scalars['String'];
  collectionSymbol: Scalars['String'];
  contractAddress: Scalars['String'];
};


export type MutationAddEventSoulCreateArgs = {
  soulAddress: Scalars['String'];
};


export type MutationAddEventTokenCreateArgs = {
  collectionContractAddress: Scalars['String'];
  description: Scalars['String'];
  metadataId: Scalars['Int'];
  soulAddress: Scalars['String'];
  tokenId: Scalars['String'];
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


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  sessionIds?: InputMaybe<Array<Scalars['Int']>>;
};


export type MutationMetadataCreateArgs = {
  metadata: Scalars['Json'];
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

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { __typename?: 'Query', whoami: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, status: AccountStatus, roles: Array<AccountRole>, souls?: Array<{ __typename?: 'Soul', id: number, createdAt: any, updatedAt: any, address: string, owner: { __typename?: 'Account', sessions?: Array<{ __typename?: 'AccountSession', address?: string | null }> | null }, relatedTokens?: Array<{ __typename?: 'SbtToken', id: number, createdAt: any, updatedAt: any, idInCollection: string, metadata: any, collection: { __typename?: 'SbtCollection', name: string }, creator: { __typename?: 'Account', sessions?: Array<{ __typename?: 'AccountSession', address?: string | null }> | null }, targetSoul: { __typename?: 'Soul', id: number, address: string, owner: { __typename?: 'Account', sessions?: Array<{ __typename?: 'AccountSession', address?: string | null }> | null } } }> | null }> | null } };

export type MetadataCreateMutationVariables = Exact<{
  metadata: Scalars['Json'];
}>;


export type MetadataCreateMutation = { __typename?: 'Mutation', metadataCreate: number };

export type AddEventTokenCreateMutationVariables = Exact<{
  collectionContractAddress: Scalars['String'];
  tokenId: Scalars['String'];
  description: Scalars['String'];
  soulAddress: Scalars['String'];
  metadataId: Scalars['Int'];
}>;


export type AddEventTokenCreateMutation = { __typename?: 'Mutation', addEventTokenCreate: boolean };

export type AddEventSoulCreateMutationVariables = Exact<{
  soulAddress: Scalars['String'];
}>;


export type AddEventSoulCreateMutation = { __typename?: 'Mutation', addEventSoulCreate: boolean };

export type AddEventCollectionCreateMutationVariables = Exact<{
  contractAddress: Scalars['String'];
  collectionName: Scalars['String'];
  collectionSymbol: Scalars['String'];
}>;


export type AddEventCollectionCreateMutation = { __typename?: 'Mutation', addEventCollectionCreate: boolean };

export type MyCollectionsQueryVariables = Exact<{
  onlyMine: Scalars['Boolean'];
}>;


export type MyCollectionsQuery = { __typename?: 'Query', whoami: { __typename?: 'Account', collections?: Array<{ __typename?: 'SbtCollection', address: string, tokens?: Array<{ __typename?: 'SbtToken', id: number, createdAt: any, updatedAt: any, idInCollection: string, metadata: any, collection: { __typename?: 'SbtCollection', name: string }, targetSoul: { __typename?: 'Soul', address: string } }> | null }> | null } };


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
export const MetadataCreateDocument = gql`
    mutation MetadataCreate($metadata: Json!) {
  metadataCreate(metadata: $metadata)
}
    `;
export type MetadataCreateMutationFn = Apollo.MutationFunction<MetadataCreateMutation, MetadataCreateMutationVariables>;

/**
 * __useMetadataCreateMutation__
 *
 * To run a mutation, you first call `useMetadataCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataCreateMutation, { data, loading, error }] = useMetadataCreateMutation({
 *   variables: {
 *      metadata: // value for 'metadata'
 *   },
 * });
 */
export function useMetadataCreateMutation(baseOptions?: Apollo.MutationHookOptions<MetadataCreateMutation, MetadataCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MetadataCreateMutation, MetadataCreateMutationVariables>(MetadataCreateDocument, options);
      }
export type MetadataCreateMutationHookResult = ReturnType<typeof useMetadataCreateMutation>;
export type MetadataCreateMutationResult = Apollo.MutationResult<MetadataCreateMutation>;
export type MetadataCreateMutationOptions = Apollo.BaseMutationOptions<MetadataCreateMutation, MetadataCreateMutationVariables>;
export const AddEventTokenCreateDocument = gql`
    mutation AddEventTokenCreate($collectionContractAddress: String!, $tokenId: String!, $description: String!, $soulAddress: String!, $metadataId: Int!) {
  addEventTokenCreate(
    collectionContractAddress: $collectionContractAddress
    tokenId: $tokenId
    description: $description
    soulAddress: $soulAddress
    metadataId: $metadataId
  )
}
    `;
export type AddEventTokenCreateMutationFn = Apollo.MutationFunction<AddEventTokenCreateMutation, AddEventTokenCreateMutationVariables>;

/**
 * __useAddEventTokenCreateMutation__
 *
 * To run a mutation, you first call `useAddEventTokenCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEventTokenCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEventTokenCreateMutation, { data, loading, error }] = useAddEventTokenCreateMutation({
 *   variables: {
 *      collectionContractAddress: // value for 'collectionContractAddress'
 *      tokenId: // value for 'tokenId'
 *      description: // value for 'description'
 *      soulAddress: // value for 'soulAddress'
 *      metadataId: // value for 'metadataId'
 *   },
 * });
 */
export function useAddEventTokenCreateMutation(baseOptions?: Apollo.MutationHookOptions<AddEventTokenCreateMutation, AddEventTokenCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEventTokenCreateMutation, AddEventTokenCreateMutationVariables>(AddEventTokenCreateDocument, options);
      }
export type AddEventTokenCreateMutationHookResult = ReturnType<typeof useAddEventTokenCreateMutation>;
export type AddEventTokenCreateMutationResult = Apollo.MutationResult<AddEventTokenCreateMutation>;
export type AddEventTokenCreateMutationOptions = Apollo.BaseMutationOptions<AddEventTokenCreateMutation, AddEventTokenCreateMutationVariables>;
export const AddEventSoulCreateDocument = gql`
    mutation AddEventSoulCreate($soulAddress: String!) {
  addEventSoulCreate(soulAddress: $soulAddress)
}
    `;
export type AddEventSoulCreateMutationFn = Apollo.MutationFunction<AddEventSoulCreateMutation, AddEventSoulCreateMutationVariables>;

/**
 * __useAddEventSoulCreateMutation__
 *
 * To run a mutation, you first call `useAddEventSoulCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEventSoulCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEventSoulCreateMutation, { data, loading, error }] = useAddEventSoulCreateMutation({
 *   variables: {
 *      soulAddress: // value for 'soulAddress'
 *   },
 * });
 */
export function useAddEventSoulCreateMutation(baseOptions?: Apollo.MutationHookOptions<AddEventSoulCreateMutation, AddEventSoulCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEventSoulCreateMutation, AddEventSoulCreateMutationVariables>(AddEventSoulCreateDocument, options);
      }
export type AddEventSoulCreateMutationHookResult = ReturnType<typeof useAddEventSoulCreateMutation>;
export type AddEventSoulCreateMutationResult = Apollo.MutationResult<AddEventSoulCreateMutation>;
export type AddEventSoulCreateMutationOptions = Apollo.BaseMutationOptions<AddEventSoulCreateMutation, AddEventSoulCreateMutationVariables>;
export const AddEventCollectionCreateDocument = gql`
    mutation AddEventCollectionCreate($contractAddress: String!, $collectionName: String!, $collectionSymbol: String!) {
  addEventCollectionCreate(
    contractAddress: $contractAddress
    collectionName: $collectionName
    collectionSymbol: $collectionSymbol
  )
}
    `;
export type AddEventCollectionCreateMutationFn = Apollo.MutationFunction<AddEventCollectionCreateMutation, AddEventCollectionCreateMutationVariables>;

/**
 * __useAddEventCollectionCreateMutation__
 *
 * To run a mutation, you first call `useAddEventCollectionCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEventCollectionCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEventCollectionCreateMutation, { data, loading, error }] = useAddEventCollectionCreateMutation({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      collectionName: // value for 'collectionName'
 *      collectionSymbol: // value for 'collectionSymbol'
 *   },
 * });
 */
export function useAddEventCollectionCreateMutation(baseOptions?: Apollo.MutationHookOptions<AddEventCollectionCreateMutation, AddEventCollectionCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEventCollectionCreateMutation, AddEventCollectionCreateMutationVariables>(AddEventCollectionCreateDocument, options);
      }
export type AddEventCollectionCreateMutationHookResult = ReturnType<typeof useAddEventCollectionCreateMutation>;
export type AddEventCollectionCreateMutationResult = Apollo.MutationResult<AddEventCollectionCreateMutation>;
export type AddEventCollectionCreateMutationOptions = Apollo.BaseMutationOptions<AddEventCollectionCreateMutation, AddEventCollectionCreateMutationVariables>;
export const MyCollectionsDocument = gql`
    query myCollections($onlyMine: Boolean!) {
  whoami {
    collections(onlyMine: $onlyMine) {
      address
      tokens {
        id
        createdAt
        updatedAt
        idInCollection
        collection {
          name
        }
        targetSoul {
          address
        }
        metadata
      }
    }
  }
}
    `;

/**
 * __useMyCollectionsQuery__
 *
 * To run a query within a React component, call `useMyCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCollectionsQuery({
 *   variables: {
 *      onlyMine: // value for 'onlyMine'
 *   },
 * });
 */
export function useMyCollectionsQuery(baseOptions: Apollo.QueryHookOptions<MyCollectionsQuery, MyCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCollectionsQuery, MyCollectionsQueryVariables>(MyCollectionsDocument, options);
      }
export function useMyCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCollectionsQuery, MyCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCollectionsQuery, MyCollectionsQueryVariables>(MyCollectionsDocument, options);
        }
export type MyCollectionsQueryHookResult = ReturnType<typeof useMyCollectionsQuery>;
export type MyCollectionsLazyQueryHookResult = ReturnType<typeof useMyCollectionsLazyQuery>;
export type MyCollectionsQueryResult = Apollo.QueryResult<MyCollectionsQuery, MyCollectionsQueryVariables>;