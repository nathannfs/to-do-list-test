import type { Metadata } from 'next'

import './globals.scss'

export const metadata: Metadata = {
  title: 'Test Interview',
  description: 'Test technical interview',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: './assets/logo.png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
