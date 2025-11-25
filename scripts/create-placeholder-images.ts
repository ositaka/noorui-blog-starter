/**
 * Create placeholder images for missing technical diagrams
 *
 * This script generates simple placeholder images using placehold.co
 * for all the SVG diagrams and technical images that need custom creation
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
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Placeholder images with descriptive text
const placeholders = [
  {
    filename: 'posts/comparison/kitab-arabic.svg',
    url: 'https://placehold.co/400x200/333/fff?text=Arabic+Script+%D9%83%D8%AA%D8%A7%D8%A8',
    description: 'Word kitāb in Arabic script'
  },
  {
    filename: 'posts/comparison/kitab-urdu.svg',
    url: 'https://placehold.co/400x200/333/fff?text=Urdu+Script+%DA%A9%D8%AA%D8%A7%D8%A8',
    description: 'Word kitāb in Urdu script'
  },
  {
    filename: 'posts/urdu-letters/tay.svg',
    url: 'https://placehold.co/200x200/333/fff?text=Urdu+Letter+%D9%B9',
    description: 'Urdu letter ṭe (retroflex t)'
  },
  {
    filename: 'posts/urdu-letters/dal.svg',
    url: 'https://placehold.co/200x200/333/fff?text=Urdu+Letter+%DA%88',
    description: 'Urdu letter ḍāl (retroflex d)'
  },
  {
    filename: 'posts/urdu-letters/ray.svg',
    url: 'https://placehold.co/200x200/333/fff?text=Urdu+Letter+%DA%91',
    description: 'Urdu letter ṛe (retroflex r)'
  },
  {
    filename: 'posts/urdu-letters/noon-ghunna.svg',
    url: 'https://placehold.co/200x200/333/fff?text=Urdu+Letter+%DA%BA',
    description: 'Urdu letter nūn ghunnah'
  },
  {
    filename: 'posts/forms/label-top-rtl.svg',
    url: 'https://placehold.co/500x150/4a5568/fff?text=Form+Label+Above+Input',
    description: 'Form with label above input (RTL)'
  },
  {
    filename: 'posts/forms/label-inline-rtl.svg',
    url: 'https://placehold.co/500x150/4a5568/fff?text=Form+Label+Inline+with+Input',
    description: 'Form with inline label (RTL)'
  },
  {
    filename: 'posts/forms/email-field-arabic.svg',
    url: 'https://placehold.co/500x100/4a5568/fff?text=Email+Input+Field+RTL',
    description: 'Email field in Arabic'
  },
  {
    filename: 'posts/forms/phone-field-arabic.svg',
    url: 'https://placehold.co/500x100/4a5568/fff?text=Phone+Input+Field+RTL',
    description: 'Phone field in Arabic'
  },
  {
    filename: 'posts/forms/checkbox-rtl.svg',
    url: 'https://placehold.co/300x80/4a5568/fff?text=Checkbox+RTL',
    description: 'Checkbox in RTL layout'
  },
  {
    filename: 'posts/forms/checkbox-ltr.svg',
    url: 'https://placehold.co/300x80/4a5568/fff?text=Checkbox+LTR',
    description: 'Checkbox in LTR layout'
  },
  {
    filename: 'posts/dates/format-us.svg',
    url: 'https://placehold.co/300x150/1e40af/fff?text=US+Date+Format+MM%2FDD%2FYYYY',
    description: 'US date format'
  },
  {
    filename: 'posts/dates/format-europe.svg',
    url: 'https://placehold.co/300x150/1e40af/fff?text=EU+Date+Format+DD%2FMM%2FYYYY',
    description: 'European date format'
  },
  {
    filename: 'posts/dates/format-iso.svg',
    url: 'https://placehold.co/300x150/1e40af/fff?text=ISO+Date+Format+YYYY-MM-DD',
    description: 'ISO date format'
  },
  {
    filename: 'posts/dates/format-arabic.svg',
    url: 'https://placehold.co/300x150/1e40af/fff?text=Arabic+Date+Format',
    description: 'Arabic date format'
  },
  {
    filename: 'posts/icons/align-left-ltr.svg',
    url: 'https://placehold.co/200x80/059669/fff?text=Left+Align+Icon',
    description: 'Left align icon (LTR)'
  },
  {
    filename: 'posts/icons/align-right-ltr.svg',
    url: 'https://placehold.co/200x80/059669/fff?text=Right+Align+Icon',
    description: 'Right align icon (LTR)'
  },
  {
    filename: 'posts/icons/align-center.svg',
    url: 'https://placehold.co/200x80/059669/fff?text=Center+Align+Icon',
    description: 'Center align icon'
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
  })
}

async function uploadToSupabase(filepath: string, storagePath: string): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(filepath)

    const { data, error } = await supabase.storage
      .from('images')
      .upload(storagePath, fileBuffer, {
        contentType: 'image/png',
        upsert: true,
      })

    if (error) {
      console.error(`Upload error for ${storagePath}:`, error)
      return null
    }

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
  console.log('Creating placeholder images for technical diagrams...\n')

  const tempDir = path.join(process.cwd(), 'temp-placeholders')

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  let successCount = 0
  let errorCount = 0

  for (const placeholder of placeholders) {
    try {
      console.log(`\n📥 ${placeholder.description}`)

      const tempFilePath = path.join(tempDir, path.basename(placeholder.filename))
      console.log(`   Downloading placeholder...`)
      await downloadImage(placeholder.url, tempFilePath)
      console.log(`   ✓ Downloaded`)

      console.log(`   Uploading to Supabase...`)
      const publicUrl = await uploadToSupabase(tempFilePath, placeholder.filename)

      if (!publicUrl) {
        console.error(`   ✗ Upload failed`)
        errorCount++
        continue
      }

      console.log(`   ✓ Uploaded: ${publicUrl}`)
      successCount++

      fs.unlinkSync(tempFilePath)

    } catch (error) {
      console.error(`   ✗ Error: ${error}`)
      errorCount++
    }
  }

  try {
    fs.rmdirSync(tempDir)
  } catch (err) {
    // Ignore
  }

  console.log('\n' + '='.repeat(60))
  console.log('Placeholder Upload Summary:')
  console.log(`  Success: ${successCount}`)
  console.log(`  Errors: ${errorCount}`)
  console.log('='.repeat(60))
  console.log('\nNote: These are temporary placeholders.')
  console.log('Replace with proper custom-designed diagrams when available.')
}

main()
  .then(() => {
    console.log('\nPlaceholder creation completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Placeholder creation failed:', error)
    process.exit(1)
  })
