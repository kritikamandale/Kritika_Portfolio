// Required by Next.js 15 + output:'export':
// Route handlers used as metadata generators must be explicitly marked
// force-static so the static export pipeline can pre-render them.
export const dynamic = 'force-static'

export default function sitemap() {
  return [
    {
      url: 'https://kritikamandale.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
