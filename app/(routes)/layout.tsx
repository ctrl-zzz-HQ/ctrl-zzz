import type { Metadata } from 'next'
import '/app/reset.css';
import '/app/globals.css';
import '/app/theme.css';
import SplashLayout from '@components/SplashLayout';
import NavigationLayout from '@components/NavigationLayout';
import localFont from 'next/font/local'

const vgaFont = localFont({ src: '../../public/fonts/Web437_IBM_VGA_9x16.woff' })

export const metadata: Metadata = {
  title: 'ctrl+zzz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={vgaFont.className}>
        <SplashLayout>
          <NavigationLayout>
            {children}
          </NavigationLayout>
        </SplashLayout>
      </body>
    </html>
  )
}
