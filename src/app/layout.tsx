import type { Metadata } from 'next'

import './globals.scss'

export const metadata: Metadata = {
  title: 'Test Interview',
  description: 'Test technical interview',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="container">
      <body>{children}</body>
    </html>
  )
}
