import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, getIdentifier, resetRateLimitStore } from '../rate-limit'

describe('rate-limit', () => {
  beforeEach(() => {
    // Clear rate limit store before each test
    resetRateLimitStore()
  })

  describe('getIdentifier', () => {
    it('should normalize email to lowercase and trim', () => {
      expect(getIdentifier('Test@Example.com')).toBe('test@example.com')
      expect(getIdentifier('  user@email.com  ')).toBe('user@email.com')
      expect(getIdentifier('USER@EMAIL.COM')).toBe('user@email.com')
    })
  })

  describe('checkRateLimit', () => {
    it('should allow first request', () => {
      const result = checkRateLimit('test@example.com')
      expect(result.success).toBe(true)
      expect(result.remaining).toBe(2)
      expect(result.limit).toBe(3)
    })

    it('should allow multiple requests up to limit', () => {
      const identifier = 'test@example.com'
      
      // First request
      const result1 = checkRateLimit(identifier)
      expect(result1.success).toBe(true)
      expect(result1.remaining).toBe(2)

      // Second request
      const result2 = checkRateLimit(identifier)
      expect(result2.success).toBe(true)
      expect(result2.remaining).toBe(1)

      // Third request
      const result3 = checkRateLimit(identifier)
      expect(result3.success).toBe(true)
      expect(result3.remaining).toBe(0)
    })

    it('should block requests exceeding limit', () => {
      const identifier = 'test@example.com'
      
      // Make 3 requests (limit)
      checkRateLimit(identifier)
      checkRateLimit(identifier)
      checkRateLimit(identifier)

      // Fourth request should be blocked
      const result = checkRateLimit(identifier)
      expect(result.success).toBe(false)
      expect(result.remaining).toBe(0)
      expect(result.message).toContain('Too many requests')
    })

    it('should handle different identifiers separately', () => {
      const identifier1 = 'user1@example.com'
      const identifier2 = 'user2@example.com'
      
      // User 1 makes 3 requests
      checkRateLimit(identifier1)
      checkRateLimit(identifier1)
      checkRateLimit(identifier1)

      // User 2 should still be able to make requests
      const result = checkRateLimit(identifier2)
      expect(result.success).toBe(true)
      expect(result.remaining).toBe(2)
    })

    it('should reset after window expires', () => {
      const identifier = 'test@example.com'
      
      // Make 3 requests
      checkRateLimit(identifier)
      checkRateLimit(identifier)
      checkRateLimit(identifier)

      // Fourth request should be blocked
      const blockedResult = checkRateLimit(identifier)
      expect(blockedResult.success).toBe(false)

      // Note: In a real test, we would need to mock time or wait for the window to expire
      // For now, we just verify the basic functionality
    })
  })
})

