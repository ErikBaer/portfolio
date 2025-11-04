/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // mcpServer is not a valid experimental option in Next.js 15.1.6
    // MCP support is available via __NEXT_EXPERIMENTAL_MCP_SERVER env var
  },
}

export default nextConfig
