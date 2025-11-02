import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before importing
const mockSend = vi.fn()
vi.mock('resend', () => {
  return {
    Resend: class {
      constructor(apiKey?: string) {}
      emails = {
        send: mockSend,
      }
    },
  }
})

describe('sendContactMessage', () => {
  const mockEnvVars = {
    RESEND_API_KEY: 'test-api-key',
    RESEND_FROM_EMAIL: 'test@example.com',
    CONTACT_EMAIL: 'contact@example.com',
  }

  let sendContactMessage: any

  beforeEach(async () => {
    vi.clearAllMocks()
    mockSend.mockReset()
    
    // Dynamic import after mock is set up
    const module = await import('../contact')
    sendContactMessage = module.sendContactMessage
    
    // Reset env vars
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
    })
  })

  describe('environment configuration', () => {
    it('should handle missing RESEND_API_KEY', async () => {
      // Don't set RESEND_API_KEY

      const result = await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a valid test message',
      })

      expect(result.success).toBe(false)
      expect(result.errors?._form).toBeDefined()
      expect(result.errors?._form?.[0]).toContain('not configured')
    })
  })

  describe('email sending', () => {
    beforeEach(() => {
      // Set up valid environment
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
      expect(result.message).toBe('Message sent successfully!')
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

  describe('default values', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = mockEnvVars.RESEND_API_KEY
      mockSend.mockResolvedValue({ data: { id: '123' }, error: null })
    })

    it('should use default from email when not set', async () => {
      process.env.CONTACT_EMAIL = mockEnvVars.CONTACT_EMAIL
      delete process.env.RESEND_FROM_EMAIL

      await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a test message',
      })

      expect(mockSend).toHaveBeenCalled()
      const callArgs = mockSend.mock.calls[0][0]
      expect(callArgs.from).toBe('Portfolio <onboarding@resend.dev>')
    })

    it('should use default contact email when not set', async () => {
      process.env.RESEND_FROM_EMAIL = mockEnvVars.RESEND_FROM_EMAIL
      delete process.env.CONTACT_EMAIL

      await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a test message',
      })

      expect(mockSend).toHaveBeenCalled()
      const callArgs = mockSend.mock.calls[0][0]
      expect(callArgs.to).toBe('your-email@example.com')
    })
  })

  describe('email formatting', () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = mockEnvVars.RESEND_API_KEY
      process.env.RESEND_FROM_EMAIL = mockEnvVars.RESEND_FROM_EMAIL
      process.env.CONTACT_EMAIL = mockEnvVars.CONTACT_EMAIL
      mockSend.mockResolvedValue({ data: { id: '123' }, error: null })
    })

    it('should format email with correct structure', async () => {
      await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'This is a test message\nwith multiple lines',
      })

      expect(mockSend).toHaveBeenCalledTimes(1)
      const callArgs = mockSend.mock.calls[0][0]
      
      expect(callArgs.subject).toContain('Erik Baer')
      expect(callArgs.replyTo).toBe('erik@example.com')
      expect(callArgs.html).toContain('Erik Baer')
      expect(callArgs.html).toContain('erik@example.com')
      expect(callArgs.html).toContain('This is a test message')
    })

    it('should convert newlines to HTML in email body', async () => {
      await sendContactMessage(null, {
        name: 'Erik Baer',
        email: 'erik@example.com',
        message: 'Line 1\nLine 2\nLine 3',
      })

      const callArgs = mockSend.mock.calls[0][0]
      expect(callArgs.html).toContain('<br>')
      // Message content should have <br> but not \n in the message part
      expect(callArgs.html).toContain('Line 1<br>Line 2<br>Line 3')
    })
  })
})