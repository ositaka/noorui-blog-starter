/**
 * Upload featured images for posts 18-21
 *
 * Usage:
 *   npx tsx scripts/upload-new-post-images.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as https from 'https'
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

// Featured images from Unsplash for posts 18-21
const images = [
  {
    slug: 'choosing-arabic-fonts',
    filename: 'arabic-fonts-comparison.jpg',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80', // Typography/fonts
    description: 'Arabic typography and fonts'
  },
  {
    slug: 'responsive-design-rtl-ltr',
    filename: 'responsive-rtl-ltr-design.jpg',
    url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80', // Responsive design
    description: 'Responsive web design across devices'
  },
  {
    slug: 'bilingual-code-switching',
    filename: 'code-switching-bilingual-ui.jpg',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80', // Bilingual/multilingual
    description: 'Bilingual user interface'
  },
  {
    slug: 'reading-patterns-layout',
    filename: 'reading-patterns-eye-tracking.jpg',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80', // Reading/studying
    description: 'Reading patterns and eye tracking'
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
  console.log('Uploading featured images for posts 18-21...\n')

  const tempDir = path.join(process.cwd(), 'temp-new-images')

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
      console.log(`   Downloading from Unsplash...`)
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
