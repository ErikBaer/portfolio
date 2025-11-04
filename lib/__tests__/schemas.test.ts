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
