/**
 * Rate Limiting Utility
 * 
 * Simple in-memory rate limiting for serverless environments.
 * 
 * Limits:
 * - Max 3 requests per 15 minutes per identifier (IP or email)
 * - Tracks requests by identifier and timestamp
 * 
 * Note: This is a simple in-memory solution suitable for serverless environments.
 * For production with multiple instances, consider using Redis (Upstash) or similar.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory store (shared across requests in serverless environment)
// In production with multiple instances, this should be replaced with Redis
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000 // 5 minutes
let lastCleanup = Date.now()

/**
 * Reset rate limit store (useful for testing)
 * @internal - exported for testing purposes only
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear()
}

function cleanupOldEntries() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return
  }

  lastCleanup = now
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Rate limit configuration
 */
const RATE_LIMIT_CONFIG = {
  maxRequests: 3, // Maximum requests allowed
  windowMs: 15 * 60 * 1000, // Time window in milliseconds (15 minutes)
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetAt: number
  message?: string
}

/**
 * Check rate limit for an identifier (IP address or email)
 * 
 * @param identifier - Unique identifier (IP address, email, etc.)
 * @returns Rate limit result with success status and remaining requests
 */
export function checkRateLimit(identifier: string): RateLimitResult {
  cleanupOldEntries()

  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // No entry exists, create new one
  if (!entry) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + RATE_LIMIT_CONFIG.windowMs,
    }
    rateLimitStore.set(identifier, newEntry)

    return {
      success: true,
      limit: RATE_LIMIT_CONFIG.maxRequests,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetAt: newEntry.resetAt,
    }
  }

  // Entry exists but window has expired
  if (entry.resetAt < now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + RATE_LIMIT_CONFIG.windowMs,
    }
    rateLimitStore.set(identifier, newEntry)

    return {
      success: true,
      limit: RATE_LIMIT_CONFIG.maxRequests,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetAt: newEntry.resetAt,
    }
  }

  // Entry exists and window is still active
  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    const secondsUntilReset = Math.ceil((entry.resetAt - now) / 1000)
    const minutesUntilReset = Math.ceil(secondsUntilReset / 60)

    return {
      success: false,
      limit: RATE_LIMIT_CONFIG.maxRequests,
      remaining: 0,
      resetAt: entry.resetAt,
      message: `Too many requests. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`,
    }
  }

  // Increment count
  entry.count++

  return {
    success: true,
    limit: RATE_LIMIT_CONFIG.maxRequests,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Get client identifier from request
 * 
 * In serverless environments, we use email as identifier since IP addresses
 * are not always reliable. For production, you might want to use a combination
 * of IP and email, or use headers like x-forwarded-for.
 * 
 * @param email - User email address
 * @param headers - Request headers (optional, for IP-based limiting)
 * @returns Unique identifier string
 */
export function getIdentifier(email: string, headers?: Headers): string {
  // For now, use email as primary identifier
  // In production, you might want to combine with IP address
  // const ip = headers?.get('x-forwarded-for')?.split(',')[0] || headers?.get('x-real-ip') || 'unknown'
  // return `${ip}:${email.toLowerCase()}`
  
  return email.toLowerCase().trim()
}

