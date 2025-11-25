import { Skeleton } from 'noorui-rtl'
import { cn } from '@/lib/utils'

interface SkeletonImageProps {
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | '2/1'
  className?: string
}

const aspectRatioClasses = {
  '16/9': 'aspect-video',      // 16:9 (most common for blog images)
  '4/3': 'aspect-[4/3]',        // 4:3
  '1/1': 'aspect-square',       // 1:1 (square)
  '3/2': 'aspect-[3/2]',        // 3:2
  '2/1': 'aspect-[2/1]',        // 2:1 (wide banner)
}

/**
 * SkeletonImage - Image placeholder component
 *
 * Displays a skeleton with a specific aspect ratio to mimic image content.
 * Useful for featured images, avatars, and media placeholders.
 *
 * @example
 * // 16:9 image (default)
 * <SkeletonImage />
 *
 * @example
 * // Square avatar
 * <SkeletonImage aspectRatio="1/1" className="w-12 rounded-full" />
 *
 * @example
 * // Card featured image
 * <SkeletonImage aspectRatio="16/9" className="w-full rounded-t-lg" />
 */
export function SkeletonImage({ aspectRatio = '16/9', className }: SkeletonImageProps) {
  const aspectClass = aspectRatioClasses[aspectRatio]

  return <Skeleton className={cn('w-full', aspectClass, className)} />
}
