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
  '0x38': {
    chainId: '0x38',
    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
    chainName: 'Binance Smart Chain',
    nativeCurrency: {name: 'BNB', decimals: 18, symbol: 'BNB'},
    blockExplorerUrls: ['https://bscscan.com']
  },
  '0x61': {
    chainId: '0x61',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/t'],
    chainName: 'BSC Testnet',
    nativeCurrency: {name: 'BNB', decimals: 18, symbol: 'BNB'},
    blockExplorerUrls: ['https://explorer.binance.org/smart-testnet']
  }
};
