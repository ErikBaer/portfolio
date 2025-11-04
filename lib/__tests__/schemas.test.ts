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
    })

    it('should reject names longer than 100 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'A'.repeat(101),
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
    })

    it('should reject names with invalid characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik123 Baer',
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
    })

    it('should reject names that are only whitespace', () => {
      const result = contactFormSchema.safeParse({
        name: '   ',
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
    })

    it('should accept valid names with accents and hyphens', () => {
      const result = contactFormSchema.safeParse({
        name: "Jean-Pierre O'Connor",
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(true)
    })

    it('should accept valid names', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(true)
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
    })

    it('should reject emails longer than 254 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'a'.repeat(250) + '@example.com',
        message: 'This is a test message',
      })

      expect(result.success).toBe(false)
    })

    it('should normalize email to lowercase', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'ERIK.BAER@EXAMPLE.COM',
        message: 'This is a test message',
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('erik.baer@example.com')
      }
    })

    it('should trim email whitespace', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: '  erik@example.com  ',
        message: 'This is a test message',
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('erik@example.com')
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
  })

  describe('message validation', () => {
    it('should reject messages shorter than 10 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'short',
      })

      expect(result.success).toBe(false)
    })

    it('should reject messages longer than 2000 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'A'.repeat(2001),
      })

      expect(result.success).toBe(false)
    })

    it('should reject messages that are only whitespace', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: '          ',
      })

      expect(result.success).toBe(false)
    })

    it('should reject messages with spam patterns', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'Buy now! Click here for free money!',
      })

      expect(result.success).toBe(false)
    })

    it('should reject messages with URLs', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'Check out http://example.com for more info',
      })

      expect(result.success).toBe(false)
    })

    it('should accept valid messages', () => {
      const result = contactFormSchema.safeParse({
        name: 'Erik Baer',
        email: 'test@example.com',
        message: 'This is a longer test message',
      })

      expect(result.success).toBe(true)
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
        const fieldNames = result.error.issues.map((issue) => issue.path[0])
        expect(fieldNames).toContain('name')
        expect(fieldNames).toContain('email')
        expect(fieldNames).toContain('message')
      }
    })
  })
})
