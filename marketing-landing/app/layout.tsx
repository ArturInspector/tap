import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'TAP Platform - Продавайте через Shopify и AI агентов в Центральной Азии',
  description: 'Автоматическая интеграция с Shopify и VISA TAP протоколом за 5 минут. Выходите на рынки Центральной Азии и глобальные рынки.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
