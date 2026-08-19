export const dynamic = 'force-static'

// Matches next.config.js's trailingSlash: true - these are the URLs the
// server actually serves as canonical (a request without the trailing
// slash gets redirected to the version with it).
const BASE_URL = 'https://kritikamandale.dev'

export default function sitemap() {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}

