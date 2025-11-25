/**
 * Upload images from Unsplash to Supabase Storage
 *
 * This script downloads images from Unsplash and uploads them to the Supabase storage bucket
 *
 * Usage:
 *   npx tsx scripts/upload-images.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Image URLs from Unsplash for each post
const images = [
  {
    slug: 'why-numbers-stay-ltr',
    filename: 'numbers-ltr-rtl.jpg',
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80', // Arabic numbers/mathematics
    description: 'Numbers and Arabic text'
  },
  {
    slug: 'icon-direction-flip-guide',
    filename: 'icon-direction-guide.jpg',
    url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&q=80', // UI/UX design icons
    description: 'UI icons and design elements'
  },
  {
    slug: 'arabic-urdu-shared-roots',
    filename: 'arabic-urdu-roots.jpg',
    url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80', // Islamic calligraphy
    description: 'Arabic and Islamic calligraphy'
  },
  {
    slug: 'accessible-forms-arabic',
    filename: 'accessible-forms-arabic.jpg',
    url: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&q=80', // Forms and accessibility
    description: 'Web forms and user interface'
  },
  {
    slug: 'dates-times-calendars-multilingual',
    filename: 'dates-calendars-multilingual.jpg',
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80', // Calendar/time concept
    description: 'Calendar and time'
  }
]

/**
 * Download image from URL
 */
async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)

    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          https.get(redirectUrl, (redirectResponse) => {
            redirectResponse.pipe(file)
            file.on('finish', () => {
              file.close()
              resolve()
            })
          }).on('error', (err) => {
            fs.unlink(filepath, () => {})
            reject(err)
          })
        } else {
          reject(new Error('Redirect without location'))
        }
      } else {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })

    file.on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

/**
 * Upload image to Supabase Storage
 */
async function uploadToSupabase(filepath: string, filename: string): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(filepath)
    const path = `posts/${filename}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true, // Replace if exists
      })

    if (error) {
      console.error(`Upload error for ${filename}:`, error)
      return null
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error)
    return null
  }
}

/**
 * Update post with new featured image URL
 */
async function updatePostImage(slug: string, imageUrl: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .update({ featured_image: imageUrl })
    .eq('slug', slug)

  if (error) {
    console.error(`Error updating post ${slug}:`, error)
    return false
  }

  return true
}

async function main() {
  console.log('Starting image upload process...\n')

  const tempDir = path.join(process.cwd(), 'temp-images')

  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  let successCount = 0
  let errorCount = 0

  for (const image of images) {
    try {
      console.log(`\n📥 Processing: ${image.description}`)
      console.log(`   Slug: ${image.slug}`)

      // Download image
      const tempFilePath = path.join(tempDir, image.filename)
      console.log(`   Downloading from Unsplash...`)
      await downloadImage(image.url, tempFilePath)
      console.log(`   ✓ Downloaded`)

      // Upload to Supabase
      console.log(`   Uploading to Supabase storage...`)
      const publicUrl = await uploadToSupabase(tempFilePath, image.filename)

      if (!publicUrl) {
        console.error(`   ✗ Upload failed`)
        errorCount++
        continue
      }

      console.log(`   ✓ Uploaded: ${publicUrl}`)

      // Update post record
      console.log(`   Updating post record...`)
      const updated = await updatePostImage(image.slug, publicUrl)

      if (updated) {
        console.log(`   ✓ Post updated successfully`)
        successCount++
      } else {
        console.error(`   ✗ Failed to update post`)
        errorCount++
      }

      // Clean up temp file
      fs.unlinkSync(tempFilePath)

    } catch (error) {
      console.error(`   ✗ Error processing ${image.slug}:`, error)
      errorCount++
    }
  }

  // Clean up temp directory
  try {
    fs.rmdirSync(tempDir)
  } catch (err) {
    // Ignore errors when removing temp directory
  }

  console.log('\n' + '='.repeat(50))
  console.log('Upload Summary:')
  console.log(`  Success: ${successCount}`)
  console.log(`  Errors: ${errorCount}`)
  console.log('='.repeat(50))
}

main()
  .then(() => {
    console.log('\nImage upload completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Image upload failed:', error)
    process.exit(1)
  })
