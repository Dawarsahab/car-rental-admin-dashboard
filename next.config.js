/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add webpack alias configuration
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, 'components'),
      '@/context': path.resolve(__dirname, 'context'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/styles': path.resolve(__dirname, 'styles'),
    };
    return config;
  },
};

const path = require('path');
module.exports = nextConfig;