import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthProvider'
import { Header } from '@/components/HeaderClient'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Fund for Future Initiative - HP India',
  description: 'HP India\'s Fund for Future Initiative empowering the next generation of innovators from Tier 2 & 3 colleges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-hp-gray">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
