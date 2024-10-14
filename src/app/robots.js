export default function robots() {
    return {
      rules: [
        {
          userAgent: 'Googlebot',
          allow: ['/'],
        },
        {
          userAgent: ['Applebot', 'Bingbot'],
          allow: ['/'],
        },
      ],
      sitemap: 'https://job-board-cambridge-frontend-next.vercel.app/sitemap.xml',
    }
  }