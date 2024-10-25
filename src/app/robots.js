import { MetadataRoute } from 'next'

export default function robots() {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/jobs/',
          '/jobs/*',
          '/categories/',
          '/categories/*'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/search?*'
        ],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow: [
          '/',
          '/jobs/',
          '/jobs/*',
          '/categories/',
          '/categories/*'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/search?*'
        ],
      },
      {
        // Catch-all rule for other bots
        userAgent: '*',
        allow: [
          '/',
          '/jobs/',
          '/jobs/*',
          '/categories/',
          '/categories/*'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/search?*'
        ],
      },
    ],
    sitemap: 'https://jobsincambs.com/sitemap.xml',
  }
}