import { HeaderContainer } from '@/components/HeaderContainer'
import { WalletInfo } from '@/components/WalletInfo'

export default function Home() {
  return (
    <>
      <header className="mt-8 mx-8">
        <HeaderContainer />
      </header>
      <main className="min-h-screen mx-8 mt-8">
        <section>
          <WalletInfo />
        </section>
      </main>
    </>
  )
}
