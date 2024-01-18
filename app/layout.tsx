import type { Metadata } from 'next'
import './reset.css';
import './globals.css';
import './theme.css';
import Splash from './Splash.jsx';
import NavLayout from './NavLayout.jsx';
import localFont from 'next/font/local'

const vgaFont = localFont({ src: '../public/fonts/Web437_IBM_VGA_9x16.woff' })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={vgaFont.className}>
        <Splash>
          <NavLayout>
            {children}
          </NavLayout>
        </Splash>
      </body>
    </html>
  )
}
