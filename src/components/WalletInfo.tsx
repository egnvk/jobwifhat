'use client'

import { PublicKey } from '@solana/web3.js'
import { useAtom } from 'jotai'
import bs58 from 'bs58'

import { walletAtom } from '@/store/walletAtom'

export function WalletInfo() {
  const [walletState] = useAtom(walletAtom)

  if (!walletState.myKeyPair) {
    return (
      <div className="text-lg border-2 border-gray-400 p-4">
        Please create new wallet keypair
      </div>
    )
  }

  const myPublicKey = new PublicKey(walletState.myKeyPair.publicKey)
  const myPrivateKey = bs58.encode(walletState.myKeyPair.secretKey)

  return (
    <div className="text-lg border-2 border-gray-400 p-4">
      <div className="">
        public key
        <p className="font-bold break-words">{myPublicKey.toString()}</p>
      </div>
      <div className="pt-3">
        private key
        <p className="font-bold break-words">{myPrivateKey}</p>
      </div>
    </div>
  )
}
