import * as z from 'zod'

/**
 * Contact Form Schema with enhanced validation
 * 
 * - Name: 2-100 characters, only letters, spaces, hyphens, apostrophes
 * - Email: Standard email validation
 * - Message: 10-2000 characters, basic spam detection
 */

// Regex pattern for valid name characters (letters, spaces, hyphens, apostrophes, accents)
const namePattern = /^[a-zA-ZÀ-ÿ\s\-']+$/

// Common spam patterns to detect
const spamPatterns = [
  /\b(buy\s+now|click\s+here|free\s+money|make\s+money|urgent|viagra|casino|poker|loan|debt|credit)\b/gi,
  /(http|https|www\.)/gi,
  /\d{4,}/g, // Multiple consecutive digits (often spam)
]

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must not exceed 100 characters')
    .regex(
      namePattern,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .refine(
      (val) => val.trim().length >= 2,
      'Name cannot be only whitespace'
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(254, 'Email must not exceed 254 characters') // RFC 5321 limit
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message must not exceed 2000 characters')
    .refine(
      (val) => val.trim().length >= 10,
      'Message cannot be only whitespace'
    )
    .refine(
      (val) => {
        // Check for spam patterns
        const lowerMessage = val.toLowerCase()
        return !spamPatterns.some((pattern) => pattern.test(lowerMessage))
      },
      {
        message: 'Message contains suspicious content. Please ensure your message is appropriate.',
      }
    ),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
