import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface FigureProps {
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Caption to display below the image */
  caption?: string
  /** Image width (for next/image optimization) */
  width?: number
  /** Image height (for next/image optimization) */
  height?: number
  /** Image priority loading */
  priority?: boolean
  /** Size variant */
  size?: 'default' | 'wide' | 'full'
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

/**
 * Figure - Image with optional caption
 *
 * Usage in MDX:
 * <Figure
 *   src="/images/example.jpg"
 *   alt="Description of image"
 *   caption="Photo by John Doe on Unsplash"
 * />
 *
 * <Figure
 *   src="/images/wide-image.jpg"
 *   alt="A panoramic view"
 *   size="wide"
 *   caption="A beautiful landscape"
 * />
 */
export function Figure({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
  priority = false,
  size = 'default',
  rounded = 'md',
  className,
}: FigureProps) {
  const isExternal = src.startsWith('http://') || src.startsWith('https://')

  return (
    <figure
      className={cn(
        'my-8 not-prose',
        // Size variants
        size === 'default' && 'max-w-prose mx-auto',
        size === 'wide' && 'max-w-4xl mx-auto -mx-4 md:-mx-8',
        size === 'full' && 'w-full -mx-4 md:-mx-8 lg:-mx-16',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-muted',
          // Border radius variants
          rounded === 'none' && 'rounded-none',
          rounded === 'sm' && 'rounded-sm',
          rounded === 'md' && 'rounded-md',
          rounded === 'lg' && 'rounded-lg',
        )}
      >
        {isExternal ? (
          // External images use regular img tag
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          // Local images use next/image for optimization
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-auto"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export interface ImageGridProps {
  children: React.ReactNode
  /** Number of columns */
  columns?: 2 | 3 | 4
  /** Gap between images */
  gap?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

/**
 * ImageGrid - Grid layout for multiple images
 *
 * Usage in MDX:
 * <ImageGrid columns={2}>
 *   <Figure src="/image1.jpg" alt="Image 1" />
 *   <Figure src="/image2.jpg" alt="Image 2" />
 * </ImageGrid>
 */
export function ImageGrid({
  children,
  columns = 2,
  gap = 'md',
  className,
}: ImageGridProps) {
  return (
    <div
      className={cn(
        'my-8 grid not-prose',
        // Columns
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        // Gap
        gap === 'sm' && 'gap-2',
        gap === 'md' && 'gap-4',
        gap === 'lg' && 'gap-6',
        // Remove margins and set full width for child figures
        '[&>figure]:my-0 [&>figure]:max-w-none [&>figure]:w-full',
        className,
      )}
    >
      {children}
    </div>
  )
}
