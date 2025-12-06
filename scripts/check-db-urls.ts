import { createClient } from '@supabase/supabase-js'
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

async function checkDb() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('posts')
    .select('slug, featured_image')
    .in('slug', ['islamic-calligraphy', 'reading-direction-ux', 'arabic-ligatures', 'common-rtl-bugs'])

  if (error) {
    console.error(error)
  } else {
    console.log('Database URLs:')
    console.log(JSON.stringify(data, null, 2))
  }
}

checkDb()
