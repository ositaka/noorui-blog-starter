/**
 * Update placeholder image URLs in MDX files
 */

import * as fs from 'fs'
import * as path from 'path'

const SUPABASE_BASE_URL = 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images'

// Mapping of local paths to Supabase paths for placeholders
const imageMapping: Record<string, string> = {
  '/images/posts/comparison/kitab-arabic.svg': `${SUPABASE_BASE_URL}/posts/comparison/kitab-arabic.svg`,
  '/images/posts/comparison/kitab-urdu.svg': `${SUPABASE_BASE_URL}/posts/comparison/kitab-urdu.svg`,
  '/images/posts/urdu-letters/tay.svg': `${SUPABASE_BASE_URL}/posts/urdu-letters/tay.svg`,
  '/images/posts/urdu-letters/dal.svg': `${SUPABASE_BASE_URL}/posts/urdu-letters/dal.svg`,
  '/images/posts/urdu-letters/ray.svg': `${SUPABASE_BASE_URL}/posts/urdu-letters/ray.svg`,
  '/images/posts/urdu-letters/noon-ghunna.svg': `${SUPABASE_BASE_URL}/posts/urdu-letters/noon-ghunna.svg`,
  '/images/posts/forms/label-top-rtl.svg': `${SUPABASE_BASE_URL}/posts/forms/label-top-rtl.svg`,
  '/images/posts/forms/label-inline-rtl.svg': `${SUPABASE_BASE_URL}/posts/forms/label-inline-rtl.svg`,
  '/images/posts/forms/email-field-arabic.svg': `${SUPABASE_BASE_URL}/posts/forms/email-field-arabic.svg`,
  '/images/posts/forms/phone-field-arabic.svg': `${SUPABASE_BASE_URL}/posts/forms/phone-field-arabic.svg`,
  '/images/posts/forms/checkbox-rtl.svg': `${SUPABASE_BASE_URL}/posts/forms/checkbox-rtl.svg`,
  '/images/posts/forms/checkbox-ltr.svg': `${SUPABASE_BASE_URL}/posts/forms/checkbox-ltr.svg`,
  '/images/posts/dates/format-us.svg': `${SUPABASE_BASE_URL}/posts/dates/format-us.svg`,
  '/images/posts/dates/format-europe.svg': `${SUPABASE_BASE_URL}/posts/dates/format-europe.svg`,
  '/images/posts/dates/format-iso.svg': `${SUPABASE_BASE_URL}/posts/dates/format-iso.svg`,
  '/images/posts/dates/format-arabic.svg': `${SUPABASE_BASE_URL}/posts/dates/format-arabic.svg`,
  '/images/posts/icons/align-left-ltr.svg': `${SUPABASE_BASE_URL}/posts/icons/align-left-ltr.svg`,
  '/images/posts/icons/align-right-ltr.svg': `${SUPABASE_BASE_URL}/posts/icons/align-right-ltr.svg`,
  '/images/posts/icons/align-center.svg': `${SUPABASE_BASE_URL}/posts/icons/align-center.svg`,
}

function updateFileUrls(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    let modified = false

    for (const [localPath, supabasePath] of Object.entries(imageMapping)) {
      if (content.includes(localPath)) {
        content = content.replace(new RegExp(localPath.replace(/\//g, '\\/'), 'g'), supabasePath)
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
  console.log('Updating placeholder image URLs in MDX files...\n')

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
}

main()
