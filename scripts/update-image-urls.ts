/**
 * Update image URLs in MDX files to use Supabase storage URLs
 *
 * This script replaces local image paths with Supabase storage URLs
 *
 * Usage:
 *   npx tsx scripts/update-image-urls.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const SUPABASE_BASE_URL = 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images'

// Mapping of local paths to Supabase paths
const imageMapping: Record<string, string> = {
  // Featured images
  '/images/posts/numbers-ltr-rtl.jpg': `${SUPABASE_BASE_URL}/posts/numbers-ltr-rtl.jpg`,
  '/images/posts/icon-direction-guide.jpg': `${SUPABASE_BASE_URL}/posts/icon-direction-guide.jpg`,
  '/images/posts/arabic-urdu-roots.jpg': `${SUPABASE_BASE_URL}/posts/arabic-urdu-roots.jpg`,
  '/images/posts/accessible-forms-arabic.jpg': `${SUPABASE_BASE_URL}/posts/accessible-forms-arabic.jpg`,
  '/images/posts/dates-calendars-multilingual.jpg': `${SUPABASE_BASE_URL}/posts/dates-calendars-multilingual.jpg`,

  // Gallery images
  '/images/posts/calligraphy/naskh-example.jpg': `${SUPABASE_BASE_URL}/posts/calligraphy/naskh-example.jpg`,
  '/images/posts/calligraphy/nastaliq-example.jpg': `${SUPABASE_BASE_URL}/posts/calligraphy/nastaliq-example.jpg`,
  '/images/posts/calligraphy/poetry-naskh.jpg': `${SUPABASE_BASE_URL}/posts/calligraphy/poetry-naskh.jpg`,
  '/images/posts/calligraphy/poetry-nastaliq.jpg': `${SUPABASE_BASE_URL}/posts/calligraphy/poetry-nastaliq.jpg`,
  '/images/posts/calendars/hijri-gregorian-comparison.jpg': `${SUPABASE_BASE_URL}/posts/calendars/hijri-gregorian-comparison.jpg`,
  '/images/posts/calendars/dual-calendar-picker.jpg': `${SUPABASE_BASE_URL}/posts/calendars/dual-calendar-picker.jpg`,
  '/images/posts/calendars/week-starts-comparison.jpg': `${SUPABASE_BASE_URL}/posts/calendars/week-starts-comparison.jpg`,
  '/images/posts/forms/complete-form-example.jpg': `${SUPABASE_BASE_URL}/posts/forms/complete-form-example.jpg`,
  '/images/posts/forms/input-text-alignment.jpg': `${SUPABASE_BASE_URL}/posts/forms/input-text-alignment.jpg`,
  '/images/posts/forms/validation-messages-rtl.jpg': `${SUPABASE_BASE_URL}/posts/forms/validation-messages-rtl.jpg`,
  '/images/posts/arabic-script-spread-map.jpg': `${SUPABASE_BASE_URL}/posts/arabic-script-spread-map.jpg`,
}

function updateFileUrls(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    let modified = false

    for (const [localPath, supabasePath] of Object.entries(imageMapping)) {
      if (content.includes(localPath)) {
        content = content.replace(new RegExp(localPath, 'g'), supabasePath)
        modified = true
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8')
      return true
    }

    return false
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error)
    return false
  }
}

function main() {
  console.log('Updating image URLs in MDX files...\n')

  const contentDir = path.join(process.cwd(), 'content', 'posts')
  const locales = ['en', 'fr', 'ar', 'ur']
  const newPostNumbers = ['13', '14', '15', '16', '17']

  let totalFiles = 0
  let updatedFiles = 0

  for (const locale of locales) {
    const localeDir = path.join(contentDir, locale)

    if (!fs.existsSync(localeDir)) {
      console.log(`Skipping ${locale} - directory not found`)
      continue
    }

    const files = fs.readdirSync(localeDir).filter(f => {
      const fileNumber = f.split('-')[0]
      return newPostNumbers.includes(fileNumber) && (f.endsWith('.md') || f.endsWith('.mdx'))
    })

    console.log(`\nProcessing ${locale}: ${files.length} files`)

    for (const file of files) {
      const filePath = path.join(localeDir, file)
      totalFiles++

      const wasUpdated = updateFileUrls(filePath)

      if (wasUpdated) {
        console.log(`  ✓ Updated: ${file}`)
        updatedFiles++
      } else {
        console.log(`  - No changes: ${file}`)
      }
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('Update Summary:')
  console.log(`  Total files processed: ${totalFiles}`)
  console.log(`  Files updated: ${updatedFiles}`)
  console.log('='.repeat(50))
  console.log('\nNote: SVG diagram paths remain unchanged.')
  console.log('You can create these diagrams later or use placeholders.')
}

main()
