import { Keypair } from '@solana/web3.js'
import { atom } from 'jotai'

export interface IWalletAtom {
  balance: number
  myKeyPair: Keypair | null
}

const initialWalletState: IWalletAtom = {
  balance: 0,
  myKeyPair: null
}

export const walletAtom = atom<IWalletAtom>(initialWalletState)
