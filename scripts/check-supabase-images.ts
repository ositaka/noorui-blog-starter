/**
 * Check what images exist in Supabase Storage and their metadata
 */

import { createClient } from '@supabase/supabase-js'
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

async function checkImages() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // List files in the posts folder
  const { data, error } = await supabase.storage
    .from('images')
    .list('posts', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'updated_at', order: 'desc' }
    })

  if (error) {
    console.error('Error listing files:', error)
    return
  }

  console.log('\nSupabase Storage - posts/ folder:')
  console.log('=' .repeat(80))

  data?.slice(0, 15).forEach(file => {
    const date = new Date(file.updated_at || file.created_at)
    console.log(`${file.name.padEnd(40)} | Updated: ${date.toLocaleString()}`)
  })

  console.log(`\nTotal files: ${data?.length}`)
}

checkImages()
