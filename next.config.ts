import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com', 'lh3.googleusercontent.com', "res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", 
    },
  },
};

export default nextConfig;
