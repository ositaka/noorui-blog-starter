/**
 * Update image URLs in new posts (18-21) to use Supabase storage URLs
 */

import * as fs from 'fs'
import * as path from 'path'

const SUPABASE_BASE_URL = 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images'

// Mapping of local paths to Supabase paths for new posts
const imageMapping: Record<string, string> = {
  '/images/posts/arabic-fonts-comparison.jpg': `${SUPABASE_BASE_URL}/posts/arabic-fonts-comparison.jpg`,
  '/images/posts/responsive-rtl-ltr-design.jpg': `${SUPABASE_BASE_URL}/posts/responsive-rtl-ltr-design.jpg`,
  '/images/posts/code-switching-bilingual-ui.jpg': `${SUPABASE_BASE_URL}/posts/code-switching-bilingual-ui.jpg`,
  '/images/posts/reading-patterns-eye-tracking.jpg': `${SUPABASE_BASE_URL}/posts/reading-patterns-eye-tracking.jpg`,
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
  console.log('Updating image URLs in new posts (18-21)...\n')

  const contentDir = path.join(process.cwd(), 'content', 'posts')
  const locales = ['en', 'fr', 'ar', 'ur']
  const newPostNumbers = ['18', '19', '20', '21']

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
