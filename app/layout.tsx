import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kawaii Studio 3D ✨ 3D Anime Karakter Giydirme & Poz Oyunu',
  description:
    'Modern, tatlı ve modüler 3D anime karakter giydirme web oyunu. Sevimli anime karakterini giydir, yüzünü ve renklerini kişiselleştir, 12 farklı poz verdir ve Polaroid fotoğrafını indir!',
  keywords: [
    'dress up game',
    '3d anime character',
    'kawaii dress up',
    'gyaru fashion',
    'anime girl maker',
    'react three fiber',
    'nextjs game',
    'webgl dress up',
  ],
  authors: [{ name: 'merbybutter' }],
  creator: 'merbybutter',
  openGraph: {
    title: 'Kawaii Studio 3D ✨ 3D Anime Karakter Giydirme & Poz Oyunu',
    description:
      'Sevimli 3D anime karakterini dilediğin gibi giydir, saç ve yüz hatlarını kişiselleştir, farklı pozlar verdir ve polaroid kartını kaydet!',
    url: 'https://kawaii-studio-3d.vercel.app',
    siteName: 'Kawaii Studio 3D',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kawaii Studio 3D ✨ 3D Anime Karakter Giydirme Oyunu',
    description:
      'Modern, tatlı ve modüler 3D anime karakter giydirme web oyunu. Poz verdir, polaroid kartını oluştur ve paylaş!',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFF0F5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased kawaii-bg-pattern min-h-screen h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
