/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: getHostFromURL(process.env.NEXT_PUBLIC_SERVER_URL),
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'msgbits.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.msgbits.com',
        pathname: '/**',
      },
    ],
  },
  headers: async () => {
    const contentSecurityPolicy = process.env.NODE_ENV === 'development'
      ? `
      default-src 'self' ${process.env.NEXT_PUBLIC_SERVER_URL};
      script-src 'self' 'unsafe-inline' 'unsafe-eval' accounts.google.com/gsi/ connect.facebook.net;
      style-src 'self' 'unsafe-inline' accounts.google.com;
      img-src 'self' blob: data: lh3.googleusercontent.com;
      frame-src 'self' accounts.google.com/gsi/ *.facebook.com;
      font-src 'self' fonts.gstatic.com;
      connect-src 'self' ${process.env.NEXT_PUBLIC_SERVER_URL} ws://localhost:8080 wss://localhost:8080 accounts.google.com *.facebook.com lh3.googleusercontent.com;
    `
      : `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' accounts.google.com/gsi/ connect.facebook.net;
      style-src 'self' 'unsafe-inline' accounts.google.com;
      img-src 'self' blob: data: lh3.googleusercontent.com;
      frame-src 'self' accounts.google.com/gsi/ *.facebook.com;
      font-src 'self' fonts.gstatic.com;
      connect-src 'self' accounts.google.com *.facebook.com;
    `;

    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), microphone=(self), geolocation=() '
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          // {
          //   key: 'Content-Security-Policy',
          //   value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          // }
        ]
      }]
  }
};

function getHostFromURL(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return 'localhost';
  }
}
export default nextConfig;
