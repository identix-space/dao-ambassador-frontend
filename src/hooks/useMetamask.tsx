import React, {useState, createContext, useContext, useEffect} from 'react';
import Web3 from 'web3';

import {switchNetworkIfRequired} from '../utils/switchNetwork';
import {config} from '../config';
import {Account, Error, WalletProviderProps, WalletData, connectWallet, initialWalletData} from './types';
import {AbiItem} from 'web3-utils';

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
  const chainId = Number(await window.ethereum.request({method: 'eth_chainId'}));

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
    if (!(await isChainIdCorrect())) {
      setError('Select testnet');
      try {
        await switchNetworkIfRequired(config.chainId);
      } catch (err) {
        console.error(err);
        return;
      }
    }

    await window.ethereum.request({method: 'eth_requestAccounts'});

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
  const signData = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    web3.eth.personal.sign('message to sign', account);
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
    sessionStorage.removeItem('wallet');
    sessionStorage.removeItem('account');
    setChainId(1);
    setIsActive(false);

    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', disconnect);
    window.ethereum.removeListener('disconnect', disconnect);
  };
  const disconnect = () => {
    refreshData();
    window.location.reload();
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
    window.ethereum.on('chainChanged', disconnect);
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

      const bytecode = {
        linkReferences: {},
        object: '608060405234801561001057600080fd5b506040516104ef3803806104ef8339818101604052602081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b8382019150602082018581111561006957600080fd5b825186600182028301116401000000008211171561008657600080fd5b8083526020830192505050908051906020019080838360005b838110156100ba57808201518184015260208101905061009f565b50505050905090810190601f1680156100e75780820380516001836020036101000a031916815260200191505b5060405250505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000908051906020019061014592919061014c565b50506101e9565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018d57805160ff19168380011785556101bb565b828001600101855582156101bb579182015b828111156101ba57825182559160200191906001019061019f565b5b5090506101c891906101cc565b5090565b5b808211156101e55760008160009055506001016101cd565b5090565b6102f7806101f86000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80634fb2e45d1461004657806373d4a13a146100a05780638da5cb5b14610123575b600080fd5b6100886004803603602081101561005c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610157565b60405180821515815260200191505060405180910390f35b6100a86101fd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100e85780820151818401526020810190506100cd565b50505050905090810190601f1680156101155780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61012b61029b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101b357600080fd5b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050919050565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102935780601f1061026857610100808354040283529160200191610293565b820191906000526020600020905b81548152906001019060200180831161027657829003601f168201915b505050505081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea26469706673582212200643211048402dda46772be17b07d3c15a56275a46f0719365c16aaecb69629c64736f6c634300060c0033',
        opcodes: 'PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH2 0x4EF CODESIZE SUB DUP1 PUSH2 0x4EF DUP4 CODECOPY DUP2 DUP2 ADD PUSH1 0x40 MSTORE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x33 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 MLOAD PUSH1 0x40 MLOAD SWAP4 SWAP3 SWAP2 SWAP1 DUP5 PUSH5 0x100000000 DUP3 GT ISZERO PUSH2 0x53 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP4 DUP3 ADD SWAP2 POP PUSH1 0x20 DUP3 ADD DUP6 DUP2 GT ISZERO PUSH2 0x69 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP3 MLOAD DUP7 PUSH1 0x1 DUP3 MUL DUP4 ADD GT PUSH5 0x100000000 DUP3 GT OR ISZERO PUSH2 0x86 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 DUP4 MSTORE PUSH1 0x20 DUP4 ADD SWAP3 POP POP POP SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xBA JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x9F JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xE7 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP PUSH1 0x40 MSTORE POP POP POP CALLER PUSH1 0x1 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP1 PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x145 SWAP3 SWAP2 SWAP1 PUSH2 0x14C JUMP JUMPDEST POP POP PUSH2 0x1E9 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH2 0x18D JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x1BB JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x1BB JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x1BA JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x19F JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0x1C8 SWAP2 SWAP1 PUSH2 0x1CC JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x1E5 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0x1CD JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH2 0x2F7 DUP1 PUSH2 0x1F8 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x4FB2E45D EQ PUSH2 0x46 JUMPI DUP1 PUSH4 0x73D4A13A EQ PUSH2 0xA0 JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x123 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x88 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x5C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x157 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0xA8 PUSH2 0x1FD JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xE8 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xCD JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x115 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x12B PUSH2 0x29B JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x1B3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 PUSH1 0x1 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP PUSH1 0x1 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x293 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x268 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x293 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x276 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP DUP2 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MOD NUMBER 0x21 LT 0x48 BLOCKHASH 0x2D 0xDA CHAINID PUSH24 0x2BE17B07D3C15A56275A46F0719365C16AAECB69629C6473 PUSH16 0x6C634300060C00330000000000000000 ',
        sourceMap: '25:365:0:-:0;;;110:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;168:10;160:5;;:18;;;;;;;;;;;;;;;;;;195:5;188:4;:12;;;;;;;;;;;;:::i;:::-;;110:97;25:365;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;'
      };
      const abi = [
        {
          inputs: [
            {
              internalType: 'string',
              name: '_data',
              type: 'string'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'constructor'
        },
        {
          inputs: [],
          name: 'data',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'receiver',
              type: 'address'
            }
          ],
          name: 'transferOwner',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ];

      // deploy contract
      const contract = new web3.eth.Contract(abi as unknown as AbiItem, '0x0000000000000000000000000000000000000000');
      const deployTx = contract.deploy({data: bytecode.object, arguments: ['Hello World']});
      const currentAccounts = await web3.eth.getAccounts();
      deployTx.send({from: currentAccounts[0], gas: 1500000, gasPrice: '30000000000'});
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
