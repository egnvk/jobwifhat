import { Connection } from '@solana/web3.js'

export const rpc = new Connection('https://api.devnet.solana.com', {
  wsEndpoint: 'wss://api.devnet.solana.com'
})

export const LOCAL_STORAGE_KEY = 'key'
