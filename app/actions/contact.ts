'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { escape } from 'html-escaper'
import { contactFormSchema } from '@/lib/schemas'

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactFormInput = z.infer<typeof contactFormSchema>

export type ContactFormState = {
  success: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    _form?: string[]
  }
}

export async function sendContactMessage(
  prevState: ContactFormState | null,
  formData: ContactFormInput
): Promise<ContactFormState> {
  // Validate with Zod (client-side validation is already done, but server-side is best practice)
  const result = contactFormSchema.safeParse(formData)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { name, email, message } = result.data

  // Check if Resend is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return {
      success: false,
      errors: {
        _form: ['Email service is not configured'],
      },
    }
  }

  try {
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      replyTo: email,
      subject: `Contact request from ${escape(name)}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escape(message).replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Request
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        success: false,
        errors: {
          _form: ['Failed to send email. Please try again later.'],
        },
      }
    }

    return {
      success: true,
      message: 'Message sent successfully!',
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      errors: {
        _form: ['An unexpected error occurred. Please try again later.'],
      },
    }
  }
}
