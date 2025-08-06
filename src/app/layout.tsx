import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Font configuration
const inter = Inter({ subsets: ['latin'] })

// SEO and metadata configuration
export const metadata: Metadata = {
  title: 'Rocky Cleanz - Professional Cleaning Services',
  description: 'Professional exterior cleaning services bringing sparkle back to Calgary homes & businesses. From pressure washing to bin cleaning, we deliver exceptional results with eco-friendly methods.',
  keywords: 'cleaning services, pressure washing, bin cleaning, carpet cleaning, junk removal, Calgary cleaning',
  authors: [{ name: 'Rocky Cleanz' }],
  openGraph: {
    title: 'Rocky Cleanz - Professional Cleaning Services',
    description: 'Professional exterior cleaning services in Calgary. Pressure washing, bin cleaning, carpet cleaning, and junk removal.',
    type: 'website',
    locale: 'en_CA',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 