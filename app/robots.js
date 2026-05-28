// Required by Next.js 15 + output:'export': see sitemap.js for explanation.
export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/.well-known/'] },
    sitemap: 'https://kritikamandale.vercel.app/sitemap.xml',
  }
}
