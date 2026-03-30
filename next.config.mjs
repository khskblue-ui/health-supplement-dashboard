/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // RAILWAY_API_URL: server-side only (no NEXT_PUBLIC_ prefix), used for proxying
    // Falls back to NEXT_PUBLIC_API_URL for local dev compatibility
    const dest =
      process.env.RAILWAY_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: `${dest}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
