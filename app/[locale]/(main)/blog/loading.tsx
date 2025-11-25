'use client'

import { Skeleton } from 'noorui-rtl'
import { Card, CardHeader, CardContent } from 'noorui-rtl'
import { SkeletonCard } from '@/components/ui/skeleton'

/**
 * Blog List Page Loading State
 *
 * Displays skeleton placeholders while the blog list page loads.
 * Mimics the layout of the actual blog page with:
 * - Page header (title + subtitle)
 * - Tabs navigation
 * - Grid of blog post cards
 * - Sidebar with tags
 */
export default function BlogLoading() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      {/* Page Header */}
      <header className="mb-12">
        <Skeleton className="h-10 w-32 mb-4" /> {/* Title */}
        <Skeleton className="h-6 w-full max-w-2xl" /> {/* Subtitle */}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs skeleton */}
          <div className="mb-8 flex gap-2 flex-wrap">
            <Skeleton className="h-10 w-16" /> {/* All tab */}
            <Skeleton className="h-10 w-24" /> {/* Category 1 */}
            <Skeleton className="h-10 w-28" /> {/* Category 2 */}
            <Skeleton className="h-10 w-20" /> {/* Category 3 */}
          </div>

          {/* Grid of post cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>

        {/* Sidebar - Tags */}
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-16" /> {/* "Tags" title */}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20" /> // Tag badges
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
