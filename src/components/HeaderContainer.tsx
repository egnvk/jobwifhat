'use client'

import { useAtom } from 'jotai'
import Link from 'next/link'

import { ButtonCreateWallet } from './ButtonCreateWallet'
import { walletAtom } from '@/store/walletAtom'
import { BalanceInfo } from './BalanceInfo'

export function HeaderContainer() {
  const [walletState] = useAtom(walletAtom)

  return (
    <div className="flex items-center justify-between">
      {walletState.myKeyPair ? (
        <Link
          href="/transactions"
          className="bg-blue-900 font-bold p-3 rounded-lg text-lg"
        >
          send tx
        </Link>
      ) : (
        <ButtonCreateWallet />
      )}
      <BalanceInfo />
    </div>
  )
}
