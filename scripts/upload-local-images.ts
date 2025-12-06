/**
 * Upload local images from public/images/posts/ to Supabase Storage
 *
 * This script uploads the custom ChatGPT-generated images from the local
 * public folder to Supabase Storage and updates the database posts.
 *
 * Usage:
 *   npx tsx scripts/upload-local-images.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Map of local image filenames to post slugs
const imageToSlugMap: Record<string, string> = {
  'reading-direction-ux.jpg': 'reading-direction-ux',
  'islamic-calligraphy.jpg': 'islamic-calligraphy',
  'arabic-ligatures.jpg': 'arabic-ligatures',
  'bidirectional-text.jpg': 'bidirectional-text-bidi',
  'common-rtl-bugs.jpg': 'common-rtl-bugs',
  'css-logical-properties.jpg': 'css-logical-properties',
  'history-of-arabic-script.jpg': 'history-of-arabic-script',
  'nastaliq-vs-naskh.jpg': 'nastaliq-vs-naskh',
  'numbers-rtl.jpg': 'numbers-in-rtl-languages',
  'phoenician-origins.jpg': 'phoenician-origins',
  'understanding-rtl.jpg': 'understanding-rtl',
  'urdu-nastaliq-script.jpg': 'urdu-nastaliq-script',
}

/**
 * Upload image to Supabase Storage
 */
async function uploadToSupabase(
  filepath: string,
  filename: string
): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(filepath)
    const storagePath = `posts/${filename}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(storagePath, fileBuffer, {
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
async function updatePostImage(
  slug: string,
  imageUrl: string
): Promise<boolean> {
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

/**
 * Recursively get all image files from a directory
 */
function getImageFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList)
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      fileList.push(filePath)
    }
  })

  return fileList
}

async function main() {
  console.log('Starting upload of local images to Supabase Storage...\n')

  const publicImagesDir = path.join(process.cwd(), 'public', 'images', 'posts')

  if (!fs.existsSync(publicImagesDir)) {
    console.error(`Directory not found: ${publicImagesDir}`)
    process.exit(1)
  }

  // Get all image files
  const imageFiles = getImageFiles(publicImagesDir)
  console.log(`Found ${imageFiles.length} image files\n`)

  let successCount = 0
  let errorCount = 0
  let skippedCount = 0

  for (const imagePath of imageFiles) {
    const filename = path.basename(imagePath)
    const relativePath = path.relative(publicImagesDir, imagePath)

    try {
      console.log(`\n📥 Processing: ${relativePath}`)

      // Upload to Supabase
      console.log(`   Uploading to Supabase storage...`)
      const publicUrl = await uploadToSupabase(imagePath, relativePath)

      if (!publicUrl) {
        console.error(`   ✗ Upload failed`)
        errorCount++
        continue
      }

      console.log(`   ✓ Uploaded: ${publicUrl}`)

      // Update post if there's a mapping
      const slug = imageToSlugMap[filename]
      if (slug) {
        console.log(`   Updating post: ${slug}`)
        const updated = await updatePostImage(slug, publicUrl)

        if (updated) {
          console.log(`   ✓ Post updated successfully`)
          successCount++
        } else {
          console.error(`   ✗ Failed to update post`)
          errorCount++
        }
      } else {
        console.log(`   ⊘ No post mapping found (image uploaded only)`)
        skippedCount++
      }
    } catch (error) {
      console.error(`   ✗ Error processing ${filename}:`, error)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('Upload Summary:')
  console.log(`  Posts updated: ${successCount}`)
  console.log(`  Images uploaded (no post): ${skippedCount}`)
  console.log(`  Errors: ${errorCount}`)
  console.log('='.repeat(60))
}

main()
  .then(() => {
    console.log('\nLocal image upload completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Image upload failed:', error)
    process.exit(1)
  })
