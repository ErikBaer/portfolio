import { describe, it, expect, beforeEach } from 'vitest'
import { env } from '../env'

describe('env', () => {
  beforeEach(() => {
    // Clear environment variables before each test
    delete process.env.RESEND_API_KEY
    delete process.env.RESEND_FROM_EMAIL
    delete process.env.CONTACT_EMAIL
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  describe('RESEND_FROM_EMAIL', () => {
    it('should return default value when not set', () => {
      const value = env.RESEND_FROM_EMAIL
      expect(value).toBe('Portfolio <onboarding@resend.dev>')
    })

    it('should accept pure email format', () => {
      process.env.RESEND_FROM_EMAIL = 'test@example.com'
      const value = env.RESEND_FROM_EMAIL
      expect(value).toBe('test@example.com')
    })

    it('should accept display name format', () => {
      process.env.RESEND_FROM_EMAIL = 'Portfolio <noreply@example.com>'
      const value = env.RESEND_FROM_EMAIL
      expect(value).toBe('Portfolio <noreply@example.com>')
    })

    it('should throw error for invalid email format', () => {
      process.env.RESEND_FROM_EMAIL = 'invalid-email'
      expect(() => env.RESEND_FROM_EMAIL).toThrow('Invalid environment variable')
    })

    it('should throw error for invalid display name format', () => {
      process.env.RESEND_FROM_EMAIL = 'Display Name <invalid-email>'
      expect(() => env.RESEND_FROM_EMAIL).toThrow('Invalid environment variable')
    })
  })

  describe('CONTACT_EMAIL', () => {
    it('should return default value when not set', () => {
      const value = env.CONTACT_EMAIL
      expect(value).toBe('your-email@example.com')
    })

    it('should accept valid email', () => {
      process.env.CONTACT_EMAIL = 'contact@example.com'
      const value = env.CONTACT_EMAIL
      expect(value).toBe('contact@example.com')
    })

    it('should throw error for invalid email', () => {
      process.env.CONTACT_EMAIL = 'invalid-email'
      expect(() => env.CONTACT_EMAIL).toThrow('Invalid environment variable')
    })
  })

  describe('NEXT_PUBLIC_SITE_URL', () => {
    it('should return default value when not set', () => {
      const value = env.NEXT_PUBLIC_SITE_URL
      expect(value).toBe('https://erikbaer.dev')
    })

    it('should accept valid URL', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
      const value = env.NEXT_PUBLIC_SITE_URL
      expect(value).toBe('https://example.com')
    })

    it('should throw error for invalid URL', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'not-a-url'
      expect(() => env.NEXT_PUBLIC_SITE_URL).toThrow('Invalid environment variable')
    })
  })

  describe('RESEND_API_KEY', () => {
    it('should return empty string when not set', () => {
      const value = env.RESEND_API_KEY
      expect(value).toBe('')
    })

    it('should return value when set', () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      const value = env.RESEND_API_KEY
      expect(value).toBe('test-api-key')
    })
  })
})

