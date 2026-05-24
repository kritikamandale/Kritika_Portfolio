import './globals.css'
import '../src/styles/variables.css'

export const metadata = {
  metadataBase: new URL('https://kritikamandale.vercel.app'),
  title: 'Kritika Mandale — Creative Developer & Designer',
  description: 'Portfolio of Kritika Mandale — a Creative Developer & Designer specialising in beautiful, production-grade web experiences. Available for freelance and full-time roles.',
  keywords: ['Creative Developer', 'Designer', 'React', 'Frontend', 'Portfolio'],
  authors: [{ name: 'Kritika Mandale' }],
  openGraph: {
    title: 'Kritika Mandale — Creative Developer & Designer',
    description: 'Building beautiful digital experiences with code and design.',
    url: 'https://kritikamandale.vercel.app',
    siteName: 'Kritika Mandale Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kritika Mandale — Portfolio',
    description: 'Creative Developer & Designer.',
    images: ['/og-image.png'],
  },
}

export const viewport = {
  themeColor: '#f5f0eb',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
