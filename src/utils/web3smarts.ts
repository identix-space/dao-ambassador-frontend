import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {soulBoundAbi} from './deploySmartContract';
import {randomNumber} from './misc';

const web3 = new Web3(Web3.givenProvider);

export const mintSbt = async (contractAddress: string, addressTo: string, metadataId: number) => {
  const currentAccounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(soulBoundAbi as unknown as AbiItem, contractAddress);
  const id = BigInt(randomNumber());
  console.log({id});
  const backUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  const uri = backUrl ? `${backUrl.split('graphql')[0]}metadata/${metadataId}` : `https://sbt-api.identix.space/graphql${metadataId}`;
  const mintResult = await contract.methods.safeMint(addressTo, id, uri).send({from: currentAccounts[0], gas: 4500000, gasPrice: '30000000000'});
  console.log(mintResult);
  return mintResult;
};
