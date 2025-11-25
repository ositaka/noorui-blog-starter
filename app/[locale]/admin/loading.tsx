'use client'

import { Skeleton, Card, CardHeader, CardContent } from 'noorui-rtl'

/**
 * Admin Dashboard Loading State
 *
 * Displays skeleton placeholders while the admin dashboard loads.
 * Mimics the layout with:
 * - Header (title + action button)
 * - Stats grid (4 stat cards)
 * - Recent posts table
 */
export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" /> {/* Dashboard title */}
          <Skeleton className="h-5 w-64" /> {/* Subtitle */}
        </div>
        <Skeleton className="h-10 w-40" /> {/* Create New button */}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <Skeleton className="h-4 w-4" /> {/* Icon */}
                <Skeleton className="h-8 w-16" /> {/* Value */}
              </div>
              <Skeleton className="h-4 w-24 mt-2" /> {/* Label */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" /> {/* Card title */}
            <Skeleton className="h-4 w-48" /> {/* Card description */}
          </div>
          <Skeleton className="h-9 w-28" /> {/* View All button */}
        </CardHeader>
        <CardContent>
          {/* Table skeleton */}
          <div className="space-y-4">
            {/* Table header */}
            <div className="flex items-center gap-4 pb-4 border-b">
              <Skeleton className="h-4 w-32" /> {/* Title header */}
              <Skeleton className="h-4 w-20" /> {/* Status header */}
              <Skeleton className="h-4 w-24" /> {/* Date header */}
            </div>

            {/* Table rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full max-w-xs" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" /> {/* Badge */}
                <Skeleton className="h-4 w-24" /> {/* Date */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
