import { Outfit, Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import '../src/styles/variables.css'

// ─── Self-hosted Google Fonts via next/font ───────────────────────────────────
// Fonts are downloaded at build time and served as first-party static assets.
// No external network request is made at runtime — eliminates the Google Fonts
// CDN dependency entirely and removes the need for preconnect hints.

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heading-next',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-next',
  display: 'swap',
  preload: true,
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-next',
  display: 'swap',
  preload: false, // monospace font — not on critical path
})

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
    <html
      lang="en"
      suppressHydrationWarning
      // CSS variables are applied here so they cascade to every element.
      // The existing --font-sans / --font-heading vars in variables.css
      // still work; these next/font vars override them with self-hosted files.
      className={`${outfit.variable} ${inter.variable} ${firaCode.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
