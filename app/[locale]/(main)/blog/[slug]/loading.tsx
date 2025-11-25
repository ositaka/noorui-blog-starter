'use client'

import { Skeleton, Card, CardHeader, CardContent, CardTitle, Separator } from 'noorui-rtl'
import { SkeletonText, SkeletonImage } from '@/components/ui/skeleton'

/**
 * Blog Post Page Loading State
 *
 * Displays skeleton placeholders while a blog post loads.
 * Mimics the layout of the actual post page with:
 * - Breadcrumb navigation
 * - Post header (category, title, excerpt, metadata)
 * - Featured image
 * - Author card
 * - Content paragraphs
 * - Tags
 * - Sidebar (ToC + related posts)
 */
export default function PostLoading() {
  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Article */}
        <article className="lg:col-span-3">
          {/* Header */}
          <header className="mb-8">
            {/* Category badge */}
            <Skeleton className="h-6 w-24 mb-4 rounded-full" />

            {/* Title */}
            <div className="mb-4 space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-3/4" />
            </div>

            {/* Excerpt */}
            <div className="mb-6 space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>

            {/* Metadata (reading time, views, date) */}
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Featured Image */}
            <SkeletonImage aspectRatio="16/9" className="mb-8 rounded-lg h-64 md:h-96" />

            {/* Author Card */}
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </CardContent>
            </Card>
          </header>

          <Separator className="my-8" />

          {/* Content - Multiple paragraphs */}
          <div className="prose prose-lg max-w-none space-y-6">
            <SkeletonText lines={4} widths={['full', 'full', 'full', '3/4']} />
            <SkeletonText lines={5} widths={['full', 'full', 'full', 'full', '1/2']} />
            <SkeletonText lines={3} widths={['full', 'full', '3/4']} />
            <SkeletonText lines={4} widths={['full', 'full', 'full', '1/2']} />
          </div>

          <Separator className="my-8" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </article>

        {/* Sidebar - Sticky */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
