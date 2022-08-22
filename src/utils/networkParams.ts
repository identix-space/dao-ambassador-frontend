interface Params {
  [key: string]: {
    chainId: string
    rpcUrls: string[]
    chainName: string,
    nativeCurrency: {
      name: string
      decimals: number
      symbol: string
    }
    blockExplorerUrls: string[]
  }
}

export const networkParams: Params = {
  '0x4': {
    chainId: '0x4',
    rpcUrls: ['https://rinkeby.infura.io/v3/35f50afe9c5b41e98dcab7f4c7ba4d80'],
    chainName: 'Rinkeby',
    nativeCurrency: {name: 'RETH', decimals: 18, symbol: 'RETH'},
    blockExplorerUrls: ['https://rinkeby.etherscan.io']
  }
};
