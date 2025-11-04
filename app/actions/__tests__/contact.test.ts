import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before ANY imports
const mockSend = vi.fn()
vi.mock('resend', () => {
  return {
    Resend: class {
      constructor(apiKey?: string) {}
      get emails() {
        return {
          send: mockSend,
        }
      }
    },
  }
})

// Import the module to be tested after mock
import { sendContactMessage } from '../contact'
import { resetRateLimitStore } from '@/lib/rate-limit'

describe('sendContactMessage', () => {
  const mockEnvVars = {
    RESEND_API_KEY: 'test-api-key',
    RESEND_FROM_EMAIL: 'test@example.com',
    CONTACT_EMAIL: 'contact@example.com',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockSend.mockReset()
    
    // Reset rate limit store before each test to avoid rate limiting issues
    resetRateLimitStore()
    
    Object.keys(mockEnvVars).forEach((key) => {
      delete process.env[key]
    })
  })

  describe('validation', () => {
    it('should reject invalid form data', async () => {
      const result = await sendContactMessage(null, {
        name: 'a', // too short
        email: 'invalid-email',
        message: 'short',
      })

      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should accept valid form data', async () => {
      process.env.RESEND_API_KEY = mockEnvVars.RESEND_API_KEY
      process.env.RESEND_FROM_EMAIL = mockEnvVars.RESEND_FROM_EMAIL
      process.env.CONTACT_EMAIL = mockEnvVars.CONTACT_EMAIL
      mockSend.mockResolvedValue({ data: { id: '123' }, error: null })

      const result = await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a valid test message',
      })

      expect(result.success).toBe(true)
      expect(result.message).toBeDefined()
      expect(mockSend).toHaveBeenCalledTimes(1)
    })
  })

  describe('prevState parameter', () => {
    it('should work independently of prevState', async () => {
      process.env.RESEND_API_KEY = mockEnvVars.RESEND_API_KEY
      process.env.RESEND_FROM_EMAIL = mockEnvVars.RESEND_FROM_EMAIL
      process.env.CONTACT_EMAIL = mockEnvVars.CONTACT_EMAIL
      mockSend.mockResolvedValue({ data: { id: '123' }, error: null })

      const prevState = { success: false, errors: { name: ['Previous error'] } }

      const result = await sendContactMessage(prevState, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a valid test message',
      })

      expect(result.success).toBe(true)
      expect(result.message).toBeDefined()
      expect(result.errors).toBeUndefined()
    })
  })

  describe('environment configuration', () => {
    it('should handle missing RESEND_API_KEY', async () => {
      const result = await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a valid test message',
      })

      expect(result.success).toBe(false)
      expect(result.errors?._form).toBeDefined()
      expect(result.errors?._form?.[0]).toBeDefined()
      expect(mockSend).not.toHaveBeenCalled()
    })
  })

  describe('email sending', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = mockEnvVars.RESEND_API_KEY
      process.env.RESEND_FROM_EMAIL = mockEnvVars.RESEND_FROM_EMAIL
      process.env.CONTACT_EMAIL = mockEnvVars.CONTACT_EMAIL
    })

    it('should handle successful email send', async () => {
      mockSend.mockResolvedValue({
        data: { id: 'email-123' },
        error: null,
      })

      const result = await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(true)
      expect(result.message).toBeDefined()
      expect(mockSend).toHaveBeenCalledTimes(1)
    })

    it('should handle Resend API error', async () => {
      mockSend.mockResolvedValue({
        data: null,
        error: { message: 'API error' },
      })

      const result = await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
      expect(result.errors?._form).toBeDefined()
    })

    it('should handle unexpected errors', async () => {
      mockSend.mockRejectedValue(new Error('Network error'))

      const result = await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
      expect(result.errors?._form).toBeDefined()
    })
  })

  describe('rate limiting', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = mockEnvVars.RESEND_API_KEY
      process.env.RESEND_FROM_EMAIL = mockEnvVars.RESEND_FROM_EMAIL
      process.env.CONTACT_EMAIL = mockEnvVars.CONTACT_EMAIL
      mockSend.mockResolvedValue({ data: { id: '123' }, error: null })
    })

    it('should allow multiple requests up to limit', async () => {
      const formData = {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a test message',
      }

      // First request should succeed
      const result1 = await sendContactMessage(null, formData)
      expect(result1.success).toBe(true)

      // Second request should succeed
      const result2 = await sendContactMessage(null, formData)
      expect(result2.success).toBe(true)

      // Third request should succeed
      const result3 = await sendContactMessage(null, formData)
      expect(result3.success).toBe(true)
    })

    it('should block requests exceeding rate limit', async () => {
      // Reset rate limit store at the start of this specific test
      resetRateLimitStore()
      
      const formData = {
        name: 'Erik Baer',
        email: 'ratelimited@example.com',
        message: 'This is a test message',
      }

      // Make 3 requests (limit) - these should succeed
      const result1 = await sendContactMessage(null, formData)
      expect(result1.success).toBe(true)
      const result2 = await sendContactMessage(null, formData)
      expect(result2.success).toBe(true)
      const result3 = await sendContactMessage(null, formData)
      expect(result3.success).toBe(true)

      // Fourth request should be blocked
      const result4 = await sendContactMessage(null, formData)
      expect(result4.success).toBe(false)
      expect(result4.errors?._form).toBeDefined()
      expect(result4.errors?._form?.[0]).toContain('Too many requests')
      
      // mockSend should have been called 3 times (for the first 3 successful requests)
      // but the 4th request should be blocked before reaching the email sending code
      expect(mockSend).toHaveBeenCalledTimes(3)
    })
  })
})