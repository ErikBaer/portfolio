/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false, // Next.js Image Optimization aktiviert
  },
  // Next.js 16: MCP Server ist standardmäßig aktiviert (keine Konfiguration nötig)
  // Der MCP Server läuft automatisch auf /_next/mcp wenn der Dev Server läuft
  // Disable Vercel Analytics and Speed Insights automatically injected badges
  // The package is still installed but not used to avoid any automatic injection
}

export default nextConfig
