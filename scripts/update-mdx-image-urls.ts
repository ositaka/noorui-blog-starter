/**
 * Update MDX files with Supabase Storage image URLs
 *
 * This script updates the featuredImage paths in MDX files from local paths
 * to Supabase Storage URLs.
 *
 * Usage:
 *   npx tsx scripts/update-mdx-image-urls.ts
 */

import * as fs from 'fs'
import * as path from 'path'

// Map of post slugs to Supabase image URLs
const imageUrlMap: Record<string, string> = {
  'reading-direction-ux': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/reading-direction-ux.jpg',
  'islamic-calligraphy': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/islamic-calligraphy.jpg',
  'arabic-ligatures': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/arabic-ligatures.jpg',
  'bidirectional-text-bidi': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/bidirectional-text.jpg',
  'common-rtl-bugs': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/common-rtl-bugs.jpg',
  'css-logical-properties': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/css-logical-properties.jpg',
  'history-of-arabic-script': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/history-of-arabic-script.jpg',
  'nastaliq-vs-naskh': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/nastaliq-vs-naskh.jpg',
  'numbers-in-rtl-languages': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/numbers-rtl.jpg',
  'phoenician-origins': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/phoenician-origins.jpg',
  'understanding-rtl': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/understanding-rtl.jpg',
  'urdu-nastaliq-script': 'https://jifbljttgucqvencyqhh.supabase.co/storage/v1/object/public/images/posts/urdu-nastaliq-script.jpg',
}

// Map of filename patterns to slugs
const filenameToSlugMap: Record<string, string> = {
  'reading-direction-ux': 'reading-direction-ux',
  'islamic-calligraphy': 'islamic-calligraphy',
  'arabic-ligatures': 'arabic-ligatures',
  'bidirectional-text-bidi': 'bidirectional-text-bidi',
  'common-rtl-bugs': 'common-rtl-bugs',
  'css-logical-properties': 'css-logical-properties',
  'history-of-arabic-script': 'history-of-arabic-script',
  'nastaliq-vs-naskh': 'nastaliq-vs-naskh',
  'numbers-in-rtl-languages': 'numbers-in-rtl-languages',
  'phoenician-origins': 'phoenician-origins',
  'understanding-rtl': 'understanding-rtl',
  'urdu-nastaliq-script': 'urdu-nastaliq-script',
}

function updateMdxFile(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')

    // Extract the slug from frontmatter
    const idMatch = content.match(/^id:\s*"([^"]+)"/m)
    if (!idMatch) {
      console.log(`   ⊘ No id found in frontmatter`)
      return false
    }

    const slug = idMatch[1]
    const newUrl = imageUrlMap[slug]

    if (!newUrl) {
      console.log(`   ⊘ No Supabase URL mapping for slug: ${slug}`)
      return false
    }

    // Replace the featuredImage line
    const updatedContent = content.replace(
      /^featuredImage:\s*"[^"]*"/m,
      `featuredImage: "${newUrl}"`
    )

    if (updatedContent === content) {
      console.log(`   ⊘ No changes needed`)
      return false
    }

    fs.writeFileSync(filePath, updatedContent, 'utf-8')
    console.log(`   ✓ Updated with Supabase URL`)
    return true

  } catch (error) {
    console.error(`   ✗ Error updating file:`, error)
    return false
  }
}

function processDirectory(dir: string): number {
  let updateCount = 0

  const files = fs.readdirSync(dir)

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) {
      continue
    }

    const filePath = path.join(dir, file)
    console.log(`\n📝 Processing: ${path.basename(dir)}/${file}`)

    if (updateMdxFile(filePath)) {
      updateCount++
    }
  }

  return updateCount
}

function main() {
  console.log('Updating MDX files with Supabase Storage URLs...\n')

  const contentDir = path.join(process.cwd(), 'content', 'posts')
  const locales = ['en', 'ar', 'fr', 'ur']

  let totalUpdated = 0

  for (const locale of locales) {
    const localeDir = path.join(contentDir, locale)

    if (!fs.existsSync(localeDir)) {
      console.log(`\nSkipping ${locale} (directory not found)`)
      continue
    }

    console.log(`\n${'='.repeat(60)}`)
    console.log(`Processing locale: ${locale}`)
    console.log('='.repeat(60))

    const count = processDirectory(localeDir)
    totalUpdated += count

    console.log(`\n${locale}: ${count} files updated`)
  }

  console.log('\n' + '='.repeat(60))
  console.log(`Total files updated: ${totalUpdated}`)
  console.log('='.repeat(60))
}

main()
