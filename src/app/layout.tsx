import { ThemeProvider } from '@/providers/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title:
    'HopterLink - Find, Review, and Connect with Local Gems.',
  description:
    'Every review tells a story, every story shapes a community.',
  openGraph: {
    images: '/opengraph-image.png'
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Pandem - Information you need during on-call emergencies',
    description:
      'Quickly link new on-call tickets to similar past incidents and their solutions. All directly in Slack the moment an incident happens.',
    images: ['https://i.imgur.com/MPMcyPP.png']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="antialiased"
    >
      <Analytics />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main
            className={`flex min-h-screen flex-col ${inter.className}`}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
