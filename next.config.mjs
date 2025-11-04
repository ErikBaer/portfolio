/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false, // Next.js Image Optimization aktiviert
  },
  experimental: {
    // mcpServer is not a valid experimental option in Next.js 15.1.6
    // MCP support is available via __NEXT_EXPERIMENTAL_MCP_SERVER env var
  },
  // Disable Vercel Analytics and Speed Insights automatically injected badges
  // The package is still installed but not used to avoid any automatic injection
}

export default nextConfig
