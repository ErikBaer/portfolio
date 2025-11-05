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
import { useI18nSafe } from '@/lib/use-i18n-safe'
import { useIsMounted } from '@/lib/hooks/use-is-mounted'

/**
 * Contact Form Component
 * 
 * WICHTIG: Wird nur Client-side gerendert (nach Mount), um Hydration-Mismatches zu vermeiden.
 * React Hook Form generiert IDs beim SSR anders als beim Client, was zu Hydration-Fehlern führt.
 * 
 * Lösung: Component rendert erst nach dem Mount, zeigt vorher einen Skeleton-Loader.
 */
export function ContactForm() {
  const { t } = useI18nSafe()
  const isMounted = useIsMounted()
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

  // Verhindere Hydration-Mismatch: Form nur nach Mount rendern
  // React Hook Form generiert IDs unterschiedlich auf Server vs Client
  if (!isMounted) {
    return (
      <div className="space-y-6 max-w-md mx-auto" aria-label="Loading contact form">
        <div className="h-4 bg-accent/20 rounded animate-pulse" />
        <div className="h-4 bg-accent/20 rounded animate-pulse w-3/4" />
        <div className="h-24 bg-accent/20 rounded animate-pulse" />
        <div className="h-10 bg-accent/20 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('formName')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('formPlaceholderName')} 
                  className="bg-card text-primary placeholder:text-secondary"
                  {...field} 
                />
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
              <FormLabel>{t('formEmail')}</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder={t('formPlaceholderEmail')} 
                  className="bg-card text-primary placeholder:text-secondary"
                  {...field} 
                />
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
              <FormLabel>{t('formMessage')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('formPlaceholderMessage')}
                  className="min-h-24 bg-card text-primary placeholder:text-secondary"
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
              {t('sendMessage')}
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

