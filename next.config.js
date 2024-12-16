const apiUrl = new URL(process.env.NEXT_PUBLIC_API_HOST);
const fileUrl = new URL(process.env.NEXT_PUBLIC_FILE_HOST || process.env.NEXT_PUBLIC_API_HOST);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: apiUrl.hostname }, { hostname: fileUrl.hostname }]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  
};

module.exports = nextConfig;
