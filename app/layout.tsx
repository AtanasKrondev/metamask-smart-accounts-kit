import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Header } from '@/components/header';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-background">
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
}
