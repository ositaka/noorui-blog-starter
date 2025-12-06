/**
 * Add cache-busting parameter to image URLs in database
 */

import { createClient } from '@supabase/supabase-js'
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

const imageSlugs = [
  'reading-direction-ux',
  'islamic-calligraphy',
  'arabic-ligatures',
  'bidirectional-text-bidi',
  'common-rtl-bugs',
  'css-logical-properties',
  'history-of-arabic-script',
  'nastaliq-vs-naskh',
  'numbers-in-rtl-languages',
  'phoenician-origins',
  'understanding-rtl',
  'urdu-nastaliq-script',
]

async function addCacheBuster() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  console.log('Adding cache-busting parameter to image URLs...\n')

  const timestamp = Date.now()
  let successCount = 0

  for (const slug of imageSlugs) {
    // Get current URL
    const { data: post } = await supabase
      .from('posts')
      .select('featured_image')
      .eq('slug', slug)
      .single()

    if (!post?.featured_image) {
      console.log(`⊘ ${slug}: No featured image found`)
      continue
    }

    // Add cache buster
    const newUrl = `${post.featured_image}?v=${timestamp}`

    // Update
    const { error } = await supabase
      .from('posts')
      .update({ featured_image: newUrl })
      .eq('slug', slug)

    if (error) {
      console.log(`✗ ${slug}: ${error.message}`)
    } else {
      console.log(`✓ ${slug}`)
      successCount++
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`Updated: ${successCount}/${imageSlugs.length}`)
  console.log('='.repeat(60))
}

addCacheBuster()
