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
        hostname: 's3-us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
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
};

function getHostFromURL(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return 'localhost';
  }
}
export default nextConfig;
