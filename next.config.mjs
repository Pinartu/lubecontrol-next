/** @type {import('next').NextConfig} */
const nextConfig = {
  // Match legacy lubecontrol.com.au URLs: canonical paths end with /
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  async redirects() {
    return [
      { source: '/contact', destination: '/make-an-enquiry/', permanent: true },
      { source: '/contact/', destination: '/make-an-enquiry/', permanent: true },
      { source: '/catalogue', destination: '/catalogue-library/', permanent: true },
      { source: '/catalogue/', destination: '/catalogue-library/', permanent: true },
      { source: '/lube-services', destination: '/services/', permanent: true },
      { source: '/lube-services/', destination: '/services/', permanent: true },
      { source: '/lube-services/:path*', destination: '/services/:path*', permanent: true },
      { source: '/more-lubrication/oil-storage', destination: '/more-lubrication/lubrication-storage/', permanent: true },
      { source: '/more-lubrication/oil-storage/', destination: '/more-lubrication/lubrication-storage/', permanent: true },
      { source: '/more-lubrication/spill-containment', destination: '/more-lubrication/oil-spill-containment/', permanent: true },
      { source: '/more-lubrication/spill-containment/', destination: '/more-lubrication/oil-spill-containment/', permanent: true },
      { source: '/auto-lube-systems/remote-grease-lines', destination: '/more-lubrication/remote-greasing-equipment/', permanent: true },
      { source: '/auto-lube-systems/remote-grease-lines/', destination: '/more-lubrication/remote-greasing-equipment/', permanent: true },
      { source: '/auto-lube-systems/single-point-lubricators', destination: '/auto-lube-systems/', permanent: true },
      { source: '/auto-lube-systems/single-point-lubricators/', destination: '/auto-lube-systems/', permanent: true },
      { source: '/auto-lube-systems/multi-point-lubricators', destination: '/auto-lube-systems/', permanent: true },
      { source: '/auto-lube-systems/multi-point-lubricators/', destination: '/auto-lube-systems/', permanent: true },
      { source: '/auto-lube-systems/centralised-lubrication-systems', destination: '/auto-lube-systems/', permanent: true },
      { source: '/auto-lube-systems/centralised-lubrication-systems/', destination: '/auto-lube-systems/', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        // Apply security headers to HTML routes (Next still serves _next/static with correct MIME types)
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default nextConfig
