'use client'

import { useEffect, useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Send } from 'lucide-react'
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact'
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<ContactFormState>({ success: false })

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      form.reset()
    }
  }, [state.success, form])

  // Handle server-side field errors (from Zod validation on server)
  useEffect(() => {
    if (state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        if (field !== '_form' && messages) {
          form.setError(field as keyof ContactFormValues, {
            type: 'server',
            message: messages[0],
          })
        }
      })
    }
  }, [state.errors, form])

  async function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      const result = await sendContactMessage(null, values)
      setState(result)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            'Sending...'
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>

        {state.success && (
          <p className="text-sm text-green-600 dark:text-green-400 text-center">
            {state.message || "Message sent successfully! I'll get back to you soon."}
          </p>
        )}

        {state.errors?._form && (
          <p className="text-sm text-destructive text-center">
            {state.errors._form[0]}
          </p>
        )}
      </form>
    </Form>
  )
}

