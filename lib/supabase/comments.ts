'use server'

import { createClient } from './server'
import { revalidatePath } from 'next/cache'

// ============================================
// TYPES
// ============================================

export interface Comment {
  id: string
  post_id: string
  parent_id: string | null
  user_id: string | null
  user_name: string | null
  user_avatar: string | null
  content: string
  content_html: string | null
  is_pinned: boolean
  is_answer: boolean
  is_deleted: boolean
  is_edited: boolean
  edited_at: string | null
  created_at: string
  updated_at: string
  // Relations
  reactions?: CommentReaction[]
  replies?: Comment[]
}

export interface CommentReaction {
  id: string
  comment_id: string
  user_id: string
  emoji: string
  created_at: string
}

export interface CommentWithReactions extends Comment {
  reaction_counts: {
    emoji: string
    count: number
    hasReacted: boolean
  }[]
  reply_count: number
}

// ============================================
// COMMENTS
// ============================================

/**
 * Get all comments for a post with threading
 */
export async function getComments(
  postId: string,
  options?: {
    sortBy?: 'newest' | 'oldest' | 'most-reactions'
    limit?: number
    offset?: number
  }
): Promise<{ comments: CommentWithReactions[]; total: number }> {
  const supabase = await createClient()
  const { sortBy = 'newest', limit = 20, offset = 0 } = options || {}

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    const currentUserId = user?.id

    // Fetch top-level comments (parent_id is null)
    let query = supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .eq('post_id', postId)
      .is('parent_id', null)
      .eq('is_deleted', false)

    // Sort
    if (sortBy === 'newest') {
      query = query.order('created_at', { ascending: false })
    } else if (sortBy === 'oldest') {
      query = query.order('created_at', { ascending: true })
    }
    // Note: most-reactions sorting requires separate query

    query = query.range(offset, offset + limit - 1)

    const { data: comments, error, count } = await query

    if (error) throw error
    if (!comments) return { comments: [], total: 0 }

    // Fetch reactions for all comments
    const commentIds = comments.map((c) => c.id)
    const { data: reactions } = await supabase
      .from('comment_reactions')
      .select('*')
      .in('comment_id', commentIds)

    // Fetch replies for each comment (up to 3 levels)
    const commentsWithData = await Promise.all(
      comments.map(async (comment) => {
        const replies = await getReplies(comment.id, currentUserId)
        const reactionCounts = calculateReactionCounts(
          reactions?.filter((r) => r.comment_id === comment.id) || [],
          currentUserId
        )

        return {
          ...comment,
          replies,
          reaction_counts: reactionCounts,
          reply_count: replies.length,
        }
      })
    )

    // Sort by reactions if requested
    if (sortBy === 'most-reactions') {
      commentsWithData.sort((a, b) => {
        const aTotal = a.reaction_counts.reduce((sum: number, r: { emoji: string; count: number; hasReacted: boolean }) => sum + r.count, 0)
        const bTotal = b.reaction_counts.reduce((sum: number, r: { emoji: string; count: number; hasReacted: boolean }) => sum + r.count, 0)
        return bTotal - aTotal
      })
    }

    return {
      comments: commentsWithData as CommentWithReactions[],
      total: count || 0,
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
    return { comments: [], total: 0 }
  }
}

/**
 * Get replies for a comment (LinkedIn-style: only one level of replies)
 */
async function getReplies(
  parentId: string,
  currentUserId?: string,
  depth: number = 0
): Promise<Comment[]> {
  if (depth >= 1) return [] // Max depth (LinkedIn-style: no replies to replies)

  const supabase = await createClient()

  const { data: replies, error } = await supabase
    .from('comments')
    .select('*')
    .eq('parent_id', parentId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true })

  console.log('[getReplies] parentId:', parentId, 'depth:', depth, 'found:', replies?.length || 0)
  if (error) console.error('[getReplies] error:', error)

  if (error || !replies) return []

  // Fetch reactions for replies
  const replyIds = replies.map((r) => r.id)
  const { data: reactions } = await supabase
    .from('comment_reactions')
    .select('*')
    .in('comment_id', replyIds)

  // Recursively fetch nested replies
  const repliesWithData = await Promise.all(
    replies.map(async (reply) => {
      const nestedReplies = await getReplies(reply.id, currentUserId, depth + 1)
      const reactionCounts = calculateReactionCounts(
        reactions?.filter((r) => r.comment_id === reply.id) || [],
        currentUserId
      )

      return {
        ...reply,
        replies: nestedReplies,
        reaction_counts: reactionCounts,
        reply_count: nestedReplies.length,
      }
    })
  )

  return repliesWithData
}

/**
 * Calculate reaction counts and user's reaction status
 */
function calculateReactionCounts(
  reactions: CommentReaction[],
  currentUserId?: string
): { emoji: string; count: number; hasReacted: boolean }[] {
  const reactionMap = new Map<string, { count: number; hasReacted: boolean }>()

  reactions.forEach((reaction) => {
    const existing = reactionMap.get(reaction.emoji) || { count: 0, hasReacted: false }
    reactionMap.set(reaction.emoji, {
      count: existing.count + 1,
      hasReacted: existing.hasReacted || reaction.user_id === currentUserId,
    })
  })

  return Array.from(reactionMap.entries())
    .map(([emoji, data]) => ({ emoji, ...data }))
    .sort((a, b) => b.count - a.count) // Sort by count descending
}

/**
 * Create a new comment
 */
export async function createComment(data: {
  postId: string
  parentId?: string | null
  content: string
  contentHtml?: string
}): Promise<{ success: boolean; comment?: Comment; error?: string }> {
  const supabase = await createClient()

  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'You must be logged in to comment' }
    }

    // Get user display info from metadata
    const userName = user.user_metadata?.name || user.user_metadata?.full_name || user.email || 'Anonymous'
    const userAvatar = user.user_metadata?.avatar_url || null

    // Create comment
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        post_id: data.postId,
        parent_id: data.parentId || null,
        user_id: user.id,
        user_name: userName,
        user_avatar: userAvatar,
        content: data.content,
        content_html: data.contentHtml || null,
      })
      .select('*')
      .single()

    if (error) {
      // Check if it's a depth limit error
      if (error.message.includes('Maximum comment depth')) {
        return { success: false, error: 'You cannot reply to a reply (LinkedIn-style threading)' }
      }
      throw error
    }

    // Revalidate post page - use page type to revalidate all matching dynamic routes
    revalidatePath('/[locale]/blog/[slug]', 'page')

    return { success: true, comment }
  } catch (error) {
    console.error('Error creating comment:', error)
    return { success: false, error: 'Failed to create comment' }
  }
}

/**
 * Update a comment
 */
export async function updateComment(
  commentId: string,
  data: {
    content: string
    contentHtml?: string
  }
): Promise<{ success: boolean; comment?: Comment; error?: string }> {
  const supabase = await createClient()

  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'You must be logged in to edit comments' }
    }

    // Update comment
    const { data: comment, error } = await supabase
      .from('comments')
      .update({
        content: data.content,
        content_html: data.contentHtml || null,
        is_edited: true,
        edited_at: new Date().toISOString(),
      })
      .eq('id', commentId)
      .eq('user_id', user.id) // Ensure user owns the comment
      .select('*')
      .single()

    if (error) throw error
    if (!comment) {
      return { success: false, error: 'Comment not found or unauthorized' }
    }

    // Revalidate post page - use page type to revalidate all matching dynamic routes
    revalidatePath('/[locale]/blog/[slug]', 'page')

    return { success: true, comment }
  } catch (error) {
    console.error('Error updating comment:', error)
    return { success: false, error: 'Failed to update comment' }
  }
}

/**
 * Delete a comment (soft delete)
 * Permissions are handled by RLS policies:
 * - Users can delete their own comments
 * - Admins can delete any comment
 */
export async function deleteComment(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'You must be logged in to delete comments' }
    }

    // Soft delete - RLS policies will automatically check permissions
    // (users can only delete their own, admins can delete any)
    const { error } = await supabase
      .from('comments')
      .update({
        is_deleted: true,
        content: '[deleted]',
        content_html: '<p>[deleted]</p>',
      })
      .eq('id', commentId)

    if (error) throw error

    // Revalidate both blog post pages and admin pages
    revalidatePath('/[locale]/blog/[slug]', 'page')
    revalidatePath('/[locale]/admin/comments', 'page')

    return { success: true }
  } catch (error) {
    console.error('Error deleting comment:', error)
    return { success: false, error: 'Failed to delete comment' }
  }
}

/**
 * Pin/unpin a comment (author/moderator only)
 */
export async function togglePinComment(
  commentId: string,
  isPinned: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'You must be logged in' }
    }

    // TODO: Check if user is post author or moderator
    // For now, allow any authenticated user

    const { error } = await supabase
      .from('comments')
      .update({ is_pinned: isPinned })
      .eq('id', commentId)

    if (error) throw error

    // Revalidate post page - use page type to revalidate all matching dynamic routes
    revalidatePath('/[locale]/blog/[slug]', 'page')

    return { success: true }
  } catch (error) {
    console.error('Error toggling pin:', error)
    return { success: false, error: 'Failed to toggle pin' }
  }
}

// ============================================
// REACTIONS
// ============================================

/**
 * Toggle a reaction on a comment
 * LinkedIn-style: User can only have ONE reaction at a time
 */
export async function toggleReaction(
  commentId: string,
  emoji: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'You must be logged in to react' }
    }

    // Check if user already has ANY reaction on this comment
    const { data: existingReactions } = await supabase
      .from('comment_reactions')
      .select('id, emoji')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)

    const existingReaction = existingReactions?.[0]

    if (existingReaction) {
      if (existingReaction.emoji === emoji) {
        // Remove reaction if clicking the same emoji (toggle off)
        const { error } = await supabase
          .from('comment_reactions')
          .delete()
          .eq('id', existingReaction.id)

        if (error) throw error
      } else {
        // Replace reaction with new emoji
        const { error } = await supabase
          .from('comment_reactions')
          .update({ emoji })
          .eq('id', existingReaction.id)

        if (error) throw error
      }
    } else {
      // Add new reaction
      const { error } = await supabase
        .from('comment_reactions')
        .insert({
          comment_id: commentId,
          user_id: user.id,
          emoji,
        })

      if (error) throw error
    }

    // Revalidate post page - use page type to revalidate all matching dynamic routes
    revalidatePath('/[locale]/blog/[slug]', 'page')

    return { success: true }
  } catch (error) {
    console.error('Error toggling reaction:', error)
    return { success: false, error: 'Failed to toggle reaction' }
  }
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

export interface RecentComment {
  id: string
  content: string
  created_at: string
  user_name: string
  user_avatar: string | null
  post_slug: string
  post_title: string
}

/**
 * Get recent comments for admin dashboard
 * Fetches the most recent comments across all posts with post and user info
 */
export async function getRecentComments(limit = 10): Promise<RecentComment[]> {
  const supabase = await createClient()

  try {
    // Fetch recent comments with stored user info
    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        post_id,
        user_name,
        user_avatar
      `)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    if (!comments || comments.length === 0) return []

    // Get unique post IDs
    const postIds = [...new Set(comments.map(c => c.post_id))]

    // Fetch post info (from posts_localized for titles)
    const { data: posts } = await supabase
      .from('posts_localized')
      .select('id, slug, title, locale')
      .in('id', postIds)
      .eq('locale', 'en') // Use English titles for admin dashboard

    // Create map for quick lookup
    const postsMap = new Map(posts?.map(p => [p.id, p]) || [])

    // Enrich comments with post info
    return comments.map(comment => {
      const post = postsMap.get(comment.post_id)

      return {
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        user_name: comment.user_name || 'Anonymous',
        user_avatar: comment.user_avatar,
        post_slug: post?.slug || '',
        post_title: post?.title || 'Unknown Post',
      }
    })
  } catch (error) {
    console.error('Error fetching recent comments:', error)
    return []
  }
}

export interface AdminComment {
  id: string
  content: string
  created_at: string
  user_name: string
  user_avatar: string | null
  user_id: string | null
  post_slug: string
  post_title: string
  post_id: string
  is_deleted: boolean
  is_pinned: boolean
  is_edited: boolean
  reply_count: number
  parent_id: string | null
}

/**
 * Get all comments for admin management page
 * Supports pagination, filtering, and search
 */
export async function getAllCommentsAdmin(options?: {
  limit?: number
  offset?: number
  postId?: string
  searchQuery?: string
  status?: 'all' | 'active' | 'deleted' | 'pinned'
  sortBy?: 'newest' | 'oldest'
}): Promise<{ comments: AdminComment[]; total: number }> {
  const supabase = await createClient()
  const {
    limit = 20,
    offset = 0,
    postId,
    searchQuery,
    status = 'all',
    sortBy = 'newest',
  } = options || {}

  try {
    // Build query
    let query = supabase
      .from('comments')
      .select('*', { count: 'exact' })

    // Filter by post
    if (postId) {
      query = query.eq('post_id', postId)
    }

    // Filter by status
    if (status === 'active') {
      query = query.eq('is_deleted', false)
    } else if (status === 'deleted') {
      query = query.eq('is_deleted', true)
    } else if (status === 'pinned') {
      query = query.eq('is_pinned', true).eq('is_deleted', false)
    }
    // 'all' means no filter

    // Search by content or user name
    if (searchQuery && searchQuery.trim() !== '') {
      query = query.or(`content.ilike.%${searchQuery}%,user_name.ilike.%${searchQuery}%`)
    }

    // Sort
    if (sortBy === 'newest') {
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order('created_at', { ascending: true })
    }

    // Pagination
    query = query.range(offset, offset + limit - 1)

    const { data: comments, error, count } = await query

    if (error) throw error
    if (!comments || comments.length === 0) return { comments: [], total: count || 0 }

    // Get unique post IDs
    const postIds = [...new Set(comments.map(c => c.post_id))]

    // Fetch post info
    const { data: posts } = await supabase
      .from('posts_localized')
      .select('id, slug, title')
      .in('id', postIds)
      .eq('locale', 'en')

    // Create map for quick lookup
    const postsMap = new Map(posts?.map(p => [p.id, p]) || [])

    // Count replies for each comment
    const commentIds = comments.map(c => c.id)
    const { data: repliesCount } = await supabase
      .from('comments')
      .select('parent_id')
      .in('parent_id', commentIds)
      .eq('is_deleted', false)

    // Create reply count map
    const replyCountMap = new Map<string, number>()
    repliesCount?.forEach(reply => {
      if (reply.parent_id) {
        replyCountMap.set(reply.parent_id, (replyCountMap.get(reply.parent_id) || 0) + 1)
      }
    })

    // Enrich comments with post info and reply counts
    const enrichedComments = comments.map(comment => {
      const post = postsMap.get(comment.post_id)

      return {
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        user_name: comment.user_name || 'Anonymous',
        user_avatar: comment.user_avatar,
        user_id: comment.user_id,
        post_slug: post?.slug || '',
        post_title: post?.title || 'Unknown Post',
        post_id: comment.post_id,
        is_deleted: comment.is_deleted,
        is_pinned: comment.is_pinned,
        is_edited: comment.is_edited,
        reply_count: replyCountMap.get(comment.id) || 0,
        parent_id: comment.parent_id,
      }
    })

    return {
      comments: enrichedComments,
      total: count || 0,
    }
  } catch (error) {
    console.error('Error fetching all comments:', error)
    return { comments: [], total: 0 }
  }
}
