import { Skeleton } from 'noorui-rtl'
import { Card, CardHeader, CardContent } from 'noorui-rtl'
import { cn } from '@/lib/utils'
import { SkeletonImage } from './skeleton-image'
import { SkeletonText } from './skeleton-text'

interface SkeletonCardProps {
  showImage?: boolean
  imageAspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | '2/1'
  className?: string
}

/**
 * SkeletonCard - Blog post card placeholder
 *
 * Mimics the structure of a blog post card with:
 * - Featured image (optional)
 * - Category badge
 * - Title (2 lines)
 * - Excerpt (2 lines)
 * - Author avatar + metadata
 *
 * @example
 * // Standard blog card with image
 * <SkeletonCard />
 *
 * @example
 * // Card without image
 * <SkeletonCard showImage={false} />
 *
 * @example
 * // Grid of cards
 * <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 *   {Array.from({ length: 6 }).map((_, i) => (
 *     <SkeletonCard key={i} />
 *   ))}
 * </div>
 */
export function SkeletonCard({
  showImage = true,
  imageAspectRatio = '16/9',
  className,
}: SkeletonCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      {showImage && (
        <SkeletonImage aspectRatio={imageAspectRatio} className="rounded-t-lg rounded-b-none" />
      )}
      <CardHeader className="space-y-3">
        {/* Category badge */}
        <Skeleton className="h-5 w-24" />
        {/* Title (2 lines) */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        {/* Excerpt (2 lines) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Author section */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Skeleton className="h-8 w-8 rounded-full" />
          {/* Author name + reading time */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
