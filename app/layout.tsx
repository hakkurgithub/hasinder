import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TİB Ağı | Hatay İş Dünyası Ticaret Portalı',
  description: 'Sıfır sermaye ile B2B ticaret ağınıza katılın, eşleştirmelerden anında komisyon kazanın. Sadece resmi kaydı olan iş insanlarının buluştuğu güvenli ticaret ağı.',
  keywords: ['Hatay', 'İstanbul', 'TİB Ağı', 'B2B', 'Ticaret', 'Lojistik', 'Gıda', 'İnşaat', 'Komisyon', 'Sıfır Sermaye'],
  authors: [{ name: 'Hakkı Kurt - HASİNDER' }],
  openGraph: {
    title: 'TİB Ağı | Hatay İş Dünyası Ticaret Portalı',
    description: 'MahalleKoop ve EsnafPay vizyonuyla iş insanlarını bir araya getirin. Sıfır yatırımla düzenli gelir elde edin.',
    url: 'https://hasinder-mega.vercel.app',
    siteName: 'TİB Ağı',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
