'use client'

import { Skeleton, Card, CardContent } from 'noorui-rtl'

/**
 * Admin Posts List Loading State
 *
 * Displays skeleton placeholders while the posts list loads.
 * Mimics the layout with:
 * - Header (title + create button)
 * - Search/filter controls
 * - Posts table with rows
 */
export default function AdminPostsLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-32" /> {/* Posts title */}
          <Skeleton className="h-5 w-48" /> {/* Subtitle */}
        </div>
        <Skeleton className="h-10 w-32" /> {/* Create New button */}
      </div>

      {/* Search/Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" /> {/* Search input */}
            <Skeleton className="h-10 w-32" /> {/* Status filter */}
            <Skeleton className="h-10 w-32" /> {/* Category filter */}
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium">
              <div className="col-span-4">
                <Skeleton className="h-4 w-16" /> {/* Title */}
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-16" /> {/* Author */}
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-16" /> {/* Status */}
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-20" /> {/* Category */}
              </div>
              <div className="col-span-1">
                <Skeleton className="h-4 w-14" /> {/* Views */}
              </div>
              <div className="col-span-1">
                <Skeleton className="h-4 w-12" /> {/* Actions */}
              </div>
            </div>

            {/* Table rows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 py-3 items-center">
                <div className="col-span-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Skeleton className="h-4 w-32" /> {/* Page info */}
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
