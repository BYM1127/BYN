import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/api/', 
        '/checkout/', 
        '/my-orders/'
      ],
    },
    // Make sure to replace this with your actual production domain once deployed to Vercel
    sitemap: 'https://bym-studio.vercel.app/sitemap.xml',
  }
}
