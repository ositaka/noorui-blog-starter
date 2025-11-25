import { Skeleton } from 'noorui-rtl'
import { cn } from '@/lib/utils'

interface SkeletonTextProps {
  lines?: number
  widths?: Array<'full' | '3/4' | '1/2' | '1/4'>
  className?: string
}

const widthClasses = {
  full: 'w-full',
  '3/4': 'w-3/4',
  '1/2': 'w-1/2',
  '1/4': 'w-1/4',
}

/**
 * SkeletonText - Text placeholder component
 *
 * Displays multiple skeleton lines to mimic text content.
 * Supports custom widths per line for more realistic loading states.
 *
 * @example
 * // 3 lines with default widths
 * <SkeletonText lines={3} />
 *
 * @example
 * // Custom widths per line
 * <SkeletonText lines={3} widths={['full', '3/4', '1/2']} />
 */
export function SkeletonText({ lines = 3, widths, className }: SkeletonTextProps) {
  const defaultWidths: Array<'full' | '3/4' | '1/2' | '1/4'> = ['full', '3/4', '1/2']
  const lineWidths = widths || defaultWidths

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => {
        const widthClass = widthClasses[lineWidths[i % lineWidths.length]]
        return <Skeleton key={i} className={cn('h-4', widthClass)} />
      })}
    </div>
  )
}
