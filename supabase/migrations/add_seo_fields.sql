-- Add additional SEO fields to post_translations table
-- Run this migration in Supabase SQL Editor

-- Add og_image field (custom Open Graph image, overrides featured_image if set)
ALTER TABLE post_translations
ADD COLUMN IF NOT EXISTS og_image TEXT;

-- Add focus_keyword field (for SEO optimization guidance)
ALTER TABLE post_translations
ADD COLUMN IF NOT EXISTS focus_keyword TEXT;

-- Add twitter_card field (allows customization of Twitter card type)
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS twitter_card TEXT DEFAULT 'summary_large_image';

COMMENT ON COLUMN post_translations.og_image IS 'Custom Open Graph image URL (overrides featured_image if set)';
COMMENT ON COLUMN post_translations.focus_keyword IS 'Focus keyword for SEO optimization';
COMMENT ON COLUMN posts.twitter_card IS 'Twitter card type: summary, summary_large_image, app, or player';
