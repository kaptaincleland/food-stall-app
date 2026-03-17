import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ylswfbzyvbnbjcdxqnje.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Keep this one too just in case you use signed URLs
      {
        protocol: 'https',
        hostname: 'ylswfbzyvbnbjcdxqnje.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/**',
      },
    ],
  },
};

export default nextConfig;