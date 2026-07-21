import { Fraunces, Yeseva_One, Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import '../src/styles/variables.css'
import SmoothScroll from '../src/components/SmoothScroll/SmoothScroll'

// ─── Self-hosted Google Fonts via next/font ───────────────────────────────────
// Fonts are downloaded at build time and served as first-party static assets.
// No external network request is made at runtime — eliminates the Google Fonts
// CDN dependency entirely and removes the need for preconnect hints.

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-heading-next',
  display: 'swap',
  preload: true,
})

const yesevaOne = Yeseva_One({
  subsets: ['latin'],
  weight: '400',
  style: ['normal'],
  variable: '--font-yeseva',
  display: 'swap',
  preload: false, // used on a single hero element only — not on critical path
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
  metadataBase: new URL('https://krimyportfolio.vercel.app'),
  title: 'Kritika Mandale — Full-Stack & AI/ML Developer',
  description: 'Full-stack and AI/ML developer from Nagpur. I build end-to-end intelligent web products — from React UIs to ML model deployment. Open to internships and freelance.',
  keywords: ['Full-Stack Developer', 'AI/ML Engineer', 'React', 'Frontend', 'Portfolio'],
  authors: [{ name: 'Kritika Mandale' }],
  openGraph: {
    title: 'Kritika Mandale — Full-Stack & AI/ML Developer',
    description: 'Building intelligent web products that combine React, Node.js, and machine learning.',
    url: 'https://krimyportfolio.vercel.app/',
    siteName: 'Kritika Mandale Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kritika Mandale — Full-Stack & AI/ML Developer',
    description: 'Full-stack and AI/ML developer from Nagpur. I build end-to-end intelligent web products — from React UIs to ML model deployment. Open to internships and freelance.',
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
      className={`${fraunces.variable} ${yesevaOne.variable} ${inter.variable} ${firaCode.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kritika Mandale",
              "jobTitle": "Full-Stack and AI/ML Developer",
              "url": "https://krimyportfolio.vercel.app/",
              "sameAs": [
                "https://github.com/kritikamandale"
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning className="overflow-x-hidden">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
