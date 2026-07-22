export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/.well-known/'] },
    sitemap: 'https://krimyportfolio.vercel.app/sitemap.xml',
  }
}
