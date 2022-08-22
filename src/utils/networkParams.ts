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
    chainId: '0x311',
    rpcUrls: ['https://polygon-rpc.com'],
    chainName: 'Polygon',
    nativeCurrency: {name: 'MATIC', decimals: 18, symbol: ':'},
    blockExplorerUrls: ['https://polygonscan.com']
  }
};
