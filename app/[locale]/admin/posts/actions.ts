'use server'

import type { Locale } from '@/lib/supabase/types'
import { isAdmin } from '@/lib/supabase/auth'
import { createClient } from '@/lib/supabase/server'
import {
  createPost as createPostApi,
  updatePost as updatePostApi,
  upsertTranslation as upsertTranslationApi,
  deletePost as deletePostApi,
  publishPost as publishPostApi,
  unpublishPost as unpublishPostApi,
  type CreatePostData,
  type UpdatePostData,
  type UpdateTranslationData,
} from '@/lib/supabase/admin-api'

// Error messages for unauthorized access
const GUEST_ERROR = {
  error: 'This is a demo - editing is disabled for guests. Sign in with an admin account to make changes.',
}

/**
 * Check if user is authorized to make changes
 * Returns null if authorized, error object if not
 */
async function requireAdmin() {
  const admin = await isAdmin()
  if (!admin) {
    return GUEST_ERROR
  }
  return null
}

/**
 * Server Actions for admin post operations
 * These wrap the admin-api functions to be callable from client components
 * All mutation actions are protected - only admins can modify data
 */

export async function createPostAction(data: CreatePostData) {
  const authError = await requireAdmin()
  if (authError) return authError

  return createPostApi(data)
}

export async function updatePostAction(postId: string, data: UpdatePostData) {
  const authError = await requireAdmin()
  if (authError) return authError

  return updatePostApi(postId, data)
}

export async function upsertTranslationAction(
  postId: string,
  locale: Locale,
  data: UpdateTranslationData
) {
  const authError = await requireAdmin()
  if (authError) return authError

  return upsertTranslationApi(postId, locale, data)
}

export async function deletePostAction(postId: string) {
  const authError = await requireAdmin()
  if (authError) return authError

  return deletePostApi(postId)
}

export async function publishPostAction(postId: string) {
  const authError = await requireAdmin()
  if (authError) return authError

  return publishPostApi(postId)
}

export async function unpublishPostAction(postId: string) {
  const authError = await requireAdmin()
  if (authError) return authError

  return unpublishPostApi(postId)
}

/**
 * Upload an image to Supabase Storage
 * Returns the public URL of the uploaded image
 */
export async function uploadImageAction(formData: FormData) {
  const authError = await requireAdmin()
  if (authError) return authError

  const file = formData.get('file') as File
  if (!file) {
    return { error: 'No file provided' }
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { error: 'File must be an image' }
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    return { error: 'File size must be less than 5MB' }
  }

  const supabase = await createClient()

  // Generate a unique filename
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 8)
  const extension = file.name.split('.').pop() || 'jpg'
  const filename = `${timestamp}-${randomId}.${extension}`
  const path = `posts/${filename}`

  // Convert file to buffer for upload
  const bytes = await file.arrayBuffer()
  const buffer = new Uint8Array(bytes)

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('images')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return { error: `Upload failed: ${error.message}` }
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(data.path)

  return { url: urlData.publicUrl }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImageAction(url: string) {
  const authError = await requireAdmin()
  if (authError) return authError

  const supabase = await createClient()

  // Extract the path from the URL
  // URL format: https://xxx.supabase.co/storage/v1/object/public/images/posts/filename.jpg
  const match = url.match(/\/images\/(.+)$/)
  if (!match) {
    return { error: 'Invalid image URL' }
  }

  const path = match[1]

  const { error } = await supabase.storage
    .from('images')
    .remove([path])

  if (error) {
    console.error('Delete error:', error)
    return { error: `Delete failed: ${error.message}` }
  }

  return { success: true }
}
