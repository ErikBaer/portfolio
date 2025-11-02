import { describe, it, expect } from 'vitest'
import { contactFormSchema } from '../schemas'

describe('contactFormSchema', () => {
  describe('name validation', () => {
    it('should reject names shorter than 2 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'a',
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 2 characters')
      }
    })

    it('should accept valid names', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(true)
    })

    it('should reject empty names', () => {
      const result = contactFormSchema.safeParse({
        name: '',
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
    })
  })

  describe('email validation', () => {
    it('should reject invalid email addresses', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'not-an-email',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid email')
      }
    })

    it('should accept valid email addresses', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'erik.baer@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(true)
    })

    it('should reject empty emails', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: '',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
    })
  })

  describe('message validation', () => {
    it('should reject messages shorter than 10 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'short',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 10 characters')
      }
    })

    it('should accept valid messages', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'This is a longer test message',
      })

      expect(result.success).toBe(true)
    })

    it('should reject empty messages', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: '',
      })

      expect(result.success).toBe(false)
    })
  })

  describe('complete form validation', () => {
    it('should validate all fields together', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'erik.baer@example.com',
        message: 'This is a complete test message with enough characters',
      })

      expect(result.success).toBe(true)
    })

    it('should return multiple errors for invalid form', () => {
      const result = contactFormSchema.safeParse({
        name: 'a',
        email: 'invalid-email',
        message: 'short',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
