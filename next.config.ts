import type { NextConfig } from 'next';

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
} as NextConfig;

export default config;
