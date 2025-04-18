import { Geist as GeistSans, Geist_Mono as GeistMono } from 'next/font/google'
import './ui/globals.css'

const geistSans = GeistSans({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  title: 'Voting App',
  description: 'Vote for your favorite candidate'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
