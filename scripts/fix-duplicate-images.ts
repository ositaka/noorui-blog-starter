/**
 * Fix duplicate-looking images by uploading more distinct images
 *
 * Usage:
 *   npx tsx scripts/fix-duplicate-images.ts
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

// Better, more distinct images
const images = [
  {
    slug: 'why-numbers-stay-ltr',
    filename: 'numbers-ltr-rtl.jpg',
    url: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=1200&q=80', // Math/numbers on chalkboard
    description: 'Numbers and mathematics - for "Why Numbers Stay LTR" post'
  },
  {
    slug: 'icon-direction-flip-guide',
    filename: 'icon-direction-guide.jpg',
    url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80', // UI design/icons/navigation
    description: 'UI icons and navigation - for "Icon Direction" post'
  }
]

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)

    https.get(url, (response) => {
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

async function uploadToSupabase(filepath: string, filename: string): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(filepath)
    const path = `posts/${filename}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      })

    if (error) {
      console.error(`Upload error for ${filename}:`, error)
      return null
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error)
    return null
  }
}

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
  console.log('Fixing duplicate-looking images...\n')

  const tempDir = path.join(process.cwd(), 'temp-fix-images')

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  let successCount = 0
  let errorCount = 0

  for (const image of images) {
    try {
      console.log(`\n📥 Processing: ${image.description}`)
      console.log(`   Slug: ${image.slug}`)

      const tempFilePath = path.join(tempDir, image.filename)
      console.log(`   Downloading new image from Unsplash...`)
      await downloadImage(image.url, tempFilePath)
      console.log(`   ✓ Downloaded`)

      console.log(`   Uploading to Supabase storage...`)
      const publicUrl = await uploadToSupabase(tempFilePath, image.filename)

      if (!publicUrl) {
        console.error(`   ✗ Upload failed`)
        errorCount++
        continue
      }

      console.log(`   ✓ Uploaded: ${publicUrl}`)

      console.log(`   Updating post record...`)
      const updated = await updatePostImage(image.slug, publicUrl)

      if (updated) {
        console.log(`   ✓ Post updated successfully`)
        successCount++
      } else {
        console.error(`   ✗ Failed to update post`)
        errorCount++
      }

      fs.unlinkSync(tempFilePath)

    } catch (error) {
      console.error(`   ✗ Error processing ${image.slug}:`, error)
      errorCount++
    }
  }

  try {
    fs.rmdirSync(tempDir)
  } catch (err) {
    // Ignore
  }

  console.log('\n' + '='.repeat(50))
  console.log('Fix Summary:')
  console.log(`  Success: ${successCount}`)
  console.log(`  Errors: ${errorCount}`)
  console.log('='.repeat(50))
}

main()
  .then(() => {
    console.log('\nImage fix completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Image fix failed:', error)
    process.exit(1)
  })
