/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixel-shredder.com',
        port: '',
        pathname: '/article-files/**',
      },
      {
        protocol: 'https',
        hostname: 'pixel-shredder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
