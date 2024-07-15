'use client'

import { useAtom, useStore } from 'jotai'
import { Keypair } from '@solana/web3.js'
import cryptojs from 'crypto-js'
import bs58 from 'bs58'

import { LOCAL_STORAGE_KEY } from '@/utils/config'
import { walletAtom } from '@/store/walletAtom'

export function ButtonCreateWallet() {
  const [_, setWalletState] = useAtom(walletAtom, { store: useStore() })

  const handleGenerateNewWallet = () => {
    const keypair = Keypair.generate()

    const secretPhrase = process.env.NEXT_PUBLIC_SECRETE_PHRASE || 'jobwifhat'
    const secretKeyStr = bs58.encode(keypair.secretKey)

    const encrypted = cryptojs.AES.encrypt(
      secretKeyStr,
      secretPhrase
    ).toString()
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(encrypted))

    setWalletState((wallet) => ({
      ...wallet,
      myKeyPair: keypair
    }))
  }

  return (
    <button
      className="bg-teal-900 font-bold p-3 rounded-lg text-lg"
      onClick={handleGenerateNewWallet}
    >
      create wallet
    </button>
  )
}
