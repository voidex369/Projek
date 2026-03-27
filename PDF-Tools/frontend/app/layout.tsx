import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PDF Tools - Convert, Merge, Split & Compress PDFs',
  description: 'Professional PDF tools. Convert PDFs to Word, Images, Text. Merge, Split, Compress PDFs. Fast, secure, and easy to use.',
  keywords: ['PDF', 'convert', 'merge', 'split', 'compress', 'documents'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
