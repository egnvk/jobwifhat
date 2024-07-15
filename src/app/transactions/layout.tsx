import Link from 'next/link'

import { BalanceInfo } from '@/components/BalanceInfo'

export default function TransactionLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="flex items-center justify-between mt-8 mx-8">
        <Link href="/" className="bg-blue-900 font-bold p-3 rounded-lg text-lg">
          back
        </Link>

        <BalanceInfo />
      </header>
      <main className="min-h-screen mx-8 mt-8">{children}</main>
    </>
  )
}
