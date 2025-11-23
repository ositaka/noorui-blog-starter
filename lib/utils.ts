import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date with locale-aware formatting
 * Uses Arabic month names and numerals for Arabic locale
 */
export function formatDate(
  date: Date | string,
  locale: string,
  options: {
    format?: 'short' | 'medium' | 'long'
  } = {}
): string {
  const { format = 'medium' } = options
  const dateObj = typeof date === 'string' ? new Date(date) : date

  // Map locale to Intl locale code
  const intlLocale = locale === 'ar' ? 'ar-SA' : locale === 'ur' ? 'ur-PK' : 'en-US'

  // Define format options based on format type
  const formatOptionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'long', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  }

  return new Intl.DateTimeFormat(intlLocale, formatOptionsMap[format]).format(dateObj)
}
