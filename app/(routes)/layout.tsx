import type { Metadata } from 'next'
import '/app/reset.css';
import '/app/globals.css';
import '/app/theme.css';
import SplashLayout from '@components/SplashLayout';
import NavigationLayout from '@components/NavigationLayout';
import font from './font';

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
      <body className={font.className}>
        <SplashLayout>
          <NavigationLayout>
            {children}
          </NavigationLayout>
        </SplashLayout>
      </body>
    </html>
  )
}
