import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {soulBoundAbi} from './deploySmartContract';
import {randomNumber} from './misc';
import {gnosisSafe} from './gnosisSafe';


export const mintSbt = async (contractAddress: string, addressTo: string, metadataId: number) => {
  if (localStorage.getItem('isGnosisAvailable') === 'true') {
    await gnosisSafe.connectEagerly();
  }
  const web3 = new Web3(gnosisSafe.provider ? gnosisSafe.provider : Web3.givenProvider);
  const currentAccounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(soulBoundAbi as unknown as AbiItem, contractAddress);
  const id = BigInt(randomNumber());
  const backUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  const uri = backUrl ? `${backUrl.split('graphql')[0]}metadata/${metadataId}` : `https://sbt-api.identix.space/graphql${metadataId}`;
  const mintResult = await contract.methods.safeMint(addressTo, id, uri).send({from: currentAccounts[0], gas: 4500000, gasPrice: '30000000000'});
  console.log(mintResult);
  return mintResult;
};

export interface IVerify {
  issueAddress: string,
  proxyAddress: string,
  tokenId: number,
  ownerOfAddress: string
}

export interface IReturnVerify {
  isOwner: boolean,
  isOwnerOf: boolean
}

export const verify = async ({issueAddress, proxyAddress, tokenId, ownerOfAddress}: IVerify): Promise<IReturnVerify> => {
  const web3 = new Web3(Web3.givenProvider);
  const currentAccounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(soulBoundAbi as unknown as AbiItem, proxyAddress);
  const id = BigInt(tokenId);
  const tokenData = await contract.methods.ownerOf(id).call({from: currentAccounts[0]});
  const ownerData = await contract.methods.collectionOwner().call({from: currentAccounts[0]});
  console.log({tokenData});
  console.log({ownerData});
  return {isOwner: issueAddress === ownerData, isOwnerOf: ownerOfAddress === tokenData};
};

export const collectionOwner = async (address: string): Promise<string> => {
  const web3 = new Web3(Web3.givenProvider);
  const currentAccounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(soulBoundAbi as unknown as AbiItem, address);
  return await contract.methods.collectionOwner().call({from: currentAccounts[0]});
};
