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

describe('sendContactMessage', () => {
  const mockEnvVars = {
    RESEND_API_KEY: 'test-api-key',
    RESEND_FROM_EMAIL: 'test@example.com',
    CONTACT_EMAIL: 'contact@example.com',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockSend.mockReset()
    
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
})