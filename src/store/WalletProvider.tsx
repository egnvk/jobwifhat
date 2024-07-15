'use client'

import { createStore, Provider } from 'jotai'
import { Keypair } from '@solana/web3.js'
import cryptojs from 'crypto-js'
import React from 'react'
import bs58 from 'bs58'

import { LOCAL_STORAGE_KEY } from '@/utils/config'
import { walletAtom } from './walletAtom'

export default function WalletProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [store] = React.useState(() => createStore())

  React.useLayoutEffect(() => {
    const encrypted = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (encrypted) {
      const secretPhrase = process.env.NEXT_PUBLIC_SECRETE_PHRASE || 'jobwifhat'
      const decrypted = cryptojs.AES.decrypt(
        JSON.parse(encrypted),
        secretPhrase
      )
      const decryptedSecretKey = decrypted.toString(cryptojs.enc.Utf8)
      const decryptedKeypair = Keypair.fromSecretKey(
        bs58.decode(decryptedSecretKey)
      )

      store.set(walletAtom, {
        balance: 0,
        myKeyPair: decryptedKeypair
      })
      return
    }
  }, [store])

  return <Provider store={store}>{children}</Provider>
}
