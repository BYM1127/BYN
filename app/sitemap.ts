import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace this with your actual deployed Vercel domain or custom domain
  const baseUrl = 'https://bym-studio.vercel.app'

  // Define all static pages in your application
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/crochet',
    '/crochet/shop',
    '/crochet/design',
    '/photography',
    '/photography/book',
    '/webdesign',
    '/webdesign/enquire',
    '/gallery',
    '/news',
    '/policies/privacy-policy',
    '/policies/refund-policy',
    '/policies/shipping-policy',
    '/policies/terms-of-service',
  ]

  // Map them into the standard sitemap format
  const sitemapEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return sitemapEntries
}
