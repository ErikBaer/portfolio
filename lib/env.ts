import { z } from 'zod'

/**
 * Environment Variables Schema
 * 
 * Validates all environment variables at runtime to ensure they are properly configured.
 * This provides early error detection and better developer experience with clear error messages.
 * 
 * Required variables:
 * - RESEND_API_KEY: Required for contact form email functionality
 * 
 * Optional variables (with defaults):
 * - RESEND_FROM_EMAIL: Email address for sending emails (defaults to Resend onboarding email)
 * - CONTACT_EMAIL: Email address to receive contact form submissions (defaults to placeholder)
 * - NEXT_PUBLIC_SITE_URL: Public site URL for metadata and links (defaults to https://erikbaer.dev)
 */

/**
 * Validates environment variables lazily (only when accessed)
 * This allows builds to succeed even if env vars are not set or invalid during build time.
 * Validation happens at runtime when the values are actually used.
 */
function validateEnvVar<T>(
  value: string | undefined,
  validator: z.ZodType<T>,
  varName: string,
  defaultValue?: T
): T {
  // If value is not set, return default (if provided) or empty string
  if (!value || value.trim() === '') {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    return '' as T
  }

  // Validate format if value is provided
  const result = validator.safeParse(value)
  if (!result.success) {
    throw new Error(
      `❌ Invalid environment variable ${varName}: ${result.error.errors[0]?.message || 'Invalid format'}\n` +
      `Provided value: ${value}\n` +
      'Please check your .env file or environment configuration.'
    )
  }

  return result.data
}

/**
 * Validated environment variables with defaults
 * 
 * Note: Validation only happens at runtime when values are accessed, not at module load time.
 * This allows builds to succeed even if env vars are not set during build time.
 */
export const env = {
  // RESEND_API_KEY is validated at runtime when used (in contact.ts)
  get RESEND_API_KEY(): string {
    return process.env.RESEND_API_KEY || ''
  },
  
  // Optional with validation and defaults
  get RESEND_FROM_EMAIL(): string {
    return validateEnvVar(
      process.env.RESEND_FROM_EMAIL,
      z.string().email(),
      'RESEND_FROM_EMAIL',
      'Portfolio <onboarding@resend.dev>'
    )
  },
  
  get CONTACT_EMAIL(): string {
    return validateEnvVar(
      process.env.CONTACT_EMAIL,
      z.string().email(),
      'CONTACT_EMAIL',
      'your-email@example.com'
    )
  },
  
  get NEXT_PUBLIC_SITE_URL(): string {
    return validateEnvVar(
      process.env.NEXT_PUBLIC_SITE_URL,
      z.string().url(),
      'NEXT_PUBLIC_SITE_URL',
      'https://erikbaer.dev'
    )
  },
}

/**
 * Validates RESEND_API_KEY when actually needed (runtime)
 * Call this function before using the API key to ensure it's configured
 */
export function validateResendApiKey(): void {
  if (!env.RESEND_API_KEY || env.RESEND_API_KEY.trim() === '') {
    throw new Error(
      'RESEND_API_KEY is required for contact form functionality. ' +
      'Please set it in your .env file or environment variables.'
    )
  }
}
