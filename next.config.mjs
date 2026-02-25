/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/math_study',
  assetPrefix: '/math_study/',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
