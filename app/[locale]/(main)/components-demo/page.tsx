import { notFound } from 'next/navigation'
import type { Locale } from '@/lib/supabase/types'
import { ComponentsDemoClient } from './demo-client'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export default async function ComponentsDemoPage({ params }: PageProps) {
  const { locale } = await params

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return <ComponentsDemoClient locale={locale} />
}
