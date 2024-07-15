'use client'

import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useAtom, useStore } from 'jotai'
import React from 'react'

import { walletAtom } from '@/store/walletAtom'
import { rpc } from '@/utils/config'

export function BalanceInfo() {
  const [walletState, setWalletState] = useAtom(walletAtom, {
    store: useStore()
  })

  React.useEffect(() => {
    if (walletState.myKeyPair) {
      rpc
        .getBalance(new PublicKey(walletState.myKeyPair.publicKey), 'confirmed')
        .then((lamports) => {
          setWalletState((wallet) => ({
            ...wallet,
            balance: lamports / LAMPORTS_PER_SOL
          }))
        })
    }
  }, [walletState.myKeyPair, setWalletState])

  return (
    <div>
      <p className="font-bold">{walletState.balance} SOL</p>
    </div>
  )
}
