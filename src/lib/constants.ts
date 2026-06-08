// Euro Token Configuration (Chiado Testnet)
export const EURO_TOKEN_ADDRESS = '0xE96eC7A6BcA030F2b673dD938Ca475cE972E4D55'

// ERC-20 ABI (minimal interface for Euro token operations)
export const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function mint(address to, uint256 amount)',
]

// Token configuration
export const EURO_TOKEN = {
  address: EURO_TOKEN_ADDRESS,
  symbol: 'EUR',
  decimals: 18, // Note: display decimals will be 2, but token has 18 decimals
  displayDecimals: 2,
} as const
