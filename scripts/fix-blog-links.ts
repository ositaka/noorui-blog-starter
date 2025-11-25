/**
 * Fix internal blog links to include locale prefix
 * Converts /blog/slug to /[locale]/blog/slug in MDX files
 */

import * as fs from 'fs'
import * as path from 'path'

function fixLinksInFile(filePath: string, locale: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    let modified = false

    // Pattern: [Link Text](/blog/slug) -> [Link Text](/[locale]/blog/slug)
    // Only match links that DON'T already have a locale prefix
    const linkPattern = /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g

    if (linkPattern.test(content)) {
      content = content.replace(linkPattern, `[$1](/${locale}/blog/$2)`)
      modified = true
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
  console.log('Fixing internal blog links to include locale prefix...\\n')

  const contentDir = path.join(process.cwd(), 'content', 'posts')
  const locales = ['en', 'fr', 'ar', 'ur']

  let totalFiles = 0
  let updatedFiles = 0

  for (const locale of locales) {
    const localeDir = path.join(contentDir, locale)

    if (!fs.existsSync(localeDir)) {
      console.log(`Skipping ${locale} - directory not found`)
      continue
    }

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))

    console.log(`\\nProcessing ${locale}: ${files.length} files`)

    for (const file of files) {
      const filePath = path.join(localeDir, file)
      totalFiles++

      const wasUpdated = fixLinksInFile(filePath, locale)

      if (wasUpdated) {
        console.log(`  ✓ Updated: ${file}`)
        updatedFiles++
      }
    }
  }

  console.log('\\n' + '='.repeat(50))
  console.log('Update Summary:')
  console.log(`  Total files processed: ${totalFiles}`)
  console.log(`  Files updated: ${updatedFiles}`)
  console.log('='.repeat(50))
}

main()
