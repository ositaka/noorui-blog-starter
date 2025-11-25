/**
 * Upload gallery images from Unsplash to Supabase Storage
 *
 * This script downloads gallery images from Unsplash and uploads them to the Supabase storage bucket
 *
 * Usage:
 *   npx tsx scripts/upload-gallery-images.ts
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

// Gallery images from Unsplash (only photos, not SVG diagrams)
const images = [
  // Calligraphy examples (for arabic-urdu-shared-roots post)
  {
    filename: 'posts/calligraphy/naskh-example.jpg',
    url: 'https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=800&q=80',
    description: 'Naskh calligraphy example'
  },
  {
    filename: 'posts/calligraphy/nastaliq-example.jpg',
    url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    description: 'Nastaliq calligraphy example'
  },
  {
    filename: 'posts/calligraphy/poetry-naskh.jpg',
    url: 'https://images.unsplash.com/photo-1584286595398-a59f31b85e6f?w=800&q=80',
    description: 'Arabic poetry in Naskh'
  },
  {
    filename: 'posts/calligraphy/poetry-nastaliq.jpg',
    url: 'https://images.unsplash.com/photo-1610465299993-e6675c9f9efa?w=800&q=80',
    description: 'Persian poetry in Nastaliq'
  },

  // Calendar interfaces (for dates-times-calendars post)
  {
    filename: 'posts/calendars/hijri-gregorian-comparison.jpg',
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
    description: 'Calendar comparison'
  },
  {
    filename: 'posts/calendars/dual-calendar-picker.jpg',
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    description: 'Dual calendar interface'
  },
  {
    filename: 'posts/calendars/week-starts-comparison.jpg',
    url: 'https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?w=800&q=80',
    description: 'Week start days comparison'
  },

  // Form examples (for accessible-forms-arabic post)
  {
    filename: 'posts/forms/complete-form-example.jpg',
    url: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80',
    description: 'Complete form interface'
  },
  {
    filename: 'posts/forms/input-text-alignment.jpg',
    url: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&q=80',
    description: 'Text input alignment'
  },
  {
    filename: 'posts/forms/validation-messages-rtl.jpg',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    description: 'Form validation messages'
  },

  // Arabic script spread map (for arabic-urdu-shared-roots post)
  {
    filename: 'posts/arabic-script-spread-map.jpg',
    url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1000&q=80',
    description: 'Map showing Arabic script spread'
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
async function uploadToSupabase(filepath: string, storagePath: string): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(filepath)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(storagePath, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true, // Replace if exists
      })

    if (error) {
      console.error(`Upload error for ${storagePath}:`, error)
      return null
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error(`Error uploading ${storagePath}:`, error)
    return null
  }
}

async function main() {
  console.log('Starting gallery images upload process...\n')

  const tempDir = path.join(process.cwd(), 'temp-gallery-images')

  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  let successCount = 0
  let errorCount = 0

  for (const image of images) {
    try {
      console.log(`\n📥 Processing: ${image.description}`)
      console.log(`   Path: ${image.filename}`)

      // Download image
      const tempFilePath = path.join(tempDir, path.basename(image.filename))
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
      successCount++

      // Clean up temp file
      fs.unlinkSync(tempFilePath)

    } catch (error) {
      console.error(`   ✗ Error processing ${image.filename}:`, error)
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
  console.log('Gallery Upload Summary:')
  console.log(`  Success: ${successCount}`)
  console.log(`  Errors: ${errorCount}`)
  console.log('='.repeat(50))
  console.log('\nNote: SVG diagrams still need to be created manually:')
  console.log('  - Form diagrams (label positions, checkboxes)')
  console.log('  - Icon direction examples')
  console.log('  - Date format comparisons')
  console.log('  - Urdu letter forms')
  console.log('  - UI comparison screenshots')
}

main()
  .then(() => {
    console.log('\nGallery image upload completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Gallery image upload failed:', error)
    process.exit(1)
  })
