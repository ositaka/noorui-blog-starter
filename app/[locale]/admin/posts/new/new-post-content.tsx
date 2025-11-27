'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'
import type { PostEditorData } from '@/components/admin/post-editor'
import type { Locale, AuthorLocalized, CategoryLocalized } from '@/lib/supabase/types'
import { createPostAction, uploadImageAction } from '../actions'

// Dynamically import PostEditor to reduce initial bundle size
const PostEditor = dynamic(
  () => import('@/components/admin/post-editor').then(mod => ({ default: mod.PostEditor })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          Loading post editor...
        </div>
      </div>
    )
  }
)

const translations: Record<Locale, {
  postDetails: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  status: string
  draft: string
  published: string
  cancel: string
  saveDraft: string
  publish: string
  all: string
  featuredImage: string
  uploadImage: string
  removeImage: string
  imagePlaceholder: string
  languages: Record<Locale, string>
}> = {
  en: {
    postDetails: 'New Post',
    title: 'Title',
    excerpt: 'Excerpt',
    content: 'Content',
    category: 'Category',
    author: 'Author',
    status: 'Status',
    draft: 'Draft',
    published: 'Published',
    cancel: 'Cancel',
    saveDraft: 'Save Draft',
    publish: 'Publish',
    all: 'Select...',
    featuredImage: 'Featured Image',
    uploadImage: 'Upload Image',
    removeImage: 'Remove',
    imagePlaceholder: 'Drag & drop an image or click to browse',
    languages: {
      en: 'English',
      fr: 'French',
      ar: 'Arabic',
      ur: 'Urdu',
    },
  },
  fr: {
    postDetails: 'Nouvel Article',
    title: 'Titre',
    excerpt: 'Extrait',
    content: 'Contenu',
    category: 'Catégorie',
    author: 'Auteur',
    status: 'Statut',
    draft: 'Brouillon',
    published: 'Publié',
    cancel: 'Annuler',
    saveDraft: 'Enregistrer le brouillon',
    publish: 'Publier',
    all: 'Sélectionner...',
    featuredImage: 'Image à la une',
    uploadImage: 'Télécharger',
    removeImage: 'Supprimer',
    imagePlaceholder: 'Glissez-déposez une image ou cliquez pour parcourir',
    languages: {
      en: 'Anglais',
      fr: 'Français',
      ar: 'Arabe',
      ur: 'Ourdou',
    },
  },
  ar: {
    postDetails: 'منشور جديد',
    title: 'العنوان',
    excerpt: 'المقتطف',
    content: 'المحتوى',
    category: 'الفئة',
    author: 'الكاتب',
    status: 'الحالة',
    draft: 'مسودة',
    published: 'منشور',
    cancel: 'إلغاء',
    saveDraft: 'حفظ كمسودة',
    publish: 'نشر',
    all: 'اختر...',
    featuredImage: 'الصورة البارزة',
    uploadImage: 'رفع صورة',
    removeImage: 'حذف',
    imagePlaceholder: 'اسحب وأفلت صورة أو انقر للتصفح',
    languages: {
      en: 'الإنجليزية',
      fr: 'الفرنسية',
      ar: 'العربية',
      ur: 'الأردية',
    },
  },
  ur: {
    postDetails: 'نئی پوسٹ',
    title: 'عنوان',
    excerpt: 'اقتباس',
    content: 'مواد',
    category: 'زمرہ',
    author: 'مصنف',
    status: 'حیثیت',
    draft: 'مسودہ',
    published: 'شائع شدہ',
    cancel: 'منسوخ',
    saveDraft: 'مسودہ محفوظ کریں',
    publish: 'شائع کریں',
    all: 'منتخب کریں...',
    featuredImage: 'نمایاں تصویر',
    uploadImage: 'تصویر اپ لوڈ کریں',
    removeImage: 'حذف کریں',
    imagePlaceholder: 'تصویر گھسیٹ کر چھوڑیں یا براؤز کرنے کے لیے کلک کریں',
    languages: {
      en: 'انگریزی',
      fr: 'فرانسیسی',
      ar: 'عربی',
      ur: 'اردو',
    },
  },
}

const emptyPostData: PostEditorData = {
  slug: '',
  categoryId: '',
  authorId: '',
  isPublished: false,
  isFeatured: false,
  featuredImage: null,
  titles: { en: '', fr: '', ar: '', ur: '' },
  excerpts: { en: '', fr: '', ar: '', ur: '' },
  contents: { en: '', fr: '', ar: '', ur: '' },
  seoData: {
    en: {},
    fr: {},
    ar: {},
    ur: {},
  },
}

interface NewPostContentProps {
  locale: Locale
  authors: AuthorLocalized[]
  categories: CategoryLocalized[]
}

/**
 * NewPostContent - Client component for creating new posts
 */
export function NewPostContent({
  locale,
  authors,
  categories,
}: NewPostContentProps) {
  const router = useRouter()
  const t = translations[locale]

  // Helper to check if a value is empty (null, undefined, or empty string)
  const isEmpty = (value: string | null | undefined): boolean => {
    return !value || value.trim() === ''
  }

  const [data, setData] = React.useState<PostEditorData>(emptyPostData)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleCancel = () => {
    router.push(`/${locale}/admin/posts`)
  }

  const handleUploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadImageAction(formData)

    if ('error' in result && result.error) {
      toast.error(result.error)
      throw new Error(result.error)
    }

    if ('url' in result) {
      return result.url
    }

    throw new Error('Upload failed')
  }

  const handleSave = async (publish: boolean) => {
    if (!data.slug || !data.titles.en) {
      // Basic validation - at least need a slug and English title
      return
    }

    setIsSubmitting(true)

    try {
      // Build translations array from the editor data
      const translationsToCreate = (['en', 'fr', 'ar', 'ur'] as Locale[])
        .filter((loc) => data.titles[loc]) // Only include locales with titles
        .map((loc) => {
          // Build translation data, excluding empty SEO fields entirely
          const translationData: any = {
            locale: loc,
            title: data.titles[loc],
          }

          // Add optional fields only if they have values
          if (data.excerpts[loc]) translationData.excerpt = data.excerpts[loc]
          if (data.contents[loc]) translationData.content = data.contents[loc]

          // Only include SEO fields if they have values
          const metaTitle = data.seoData[loc]?.meta_title
          const metaDesc = data.seoData[loc]?.meta_description
          const ogImage = data.seoData[loc]?.og_image
          const focusKeyword = data.seoData[loc]?.focus_keyword
          const twitterCard = data.seoData[loc]?.twitter_card

          if (!isEmpty(metaTitle)) translationData.meta_title = metaTitle
          if (!isEmpty(metaDesc)) translationData.meta_description = metaDesc
          if (!isEmpty(ogImage)) translationData.og_image = ogImage
          if (!isEmpty(focusKeyword)) translationData.focus_keyword = focusKeyword
          if (twitterCard) translationData.twitter_card = twitterCard

          return translationData
        })

      const result = await createPostAction({
        slug: data.slug,
        author_id: data.authorId || undefined,
        category_id: data.categoryId || undefined,
        featured_image: data.featuredImage || undefined,
        is_published: publish,
        is_featured: data.isFeatured,
        translations: translationsToCreate,
      })

      // Check for guest mode error or creation failure
      if ('error' in result && result.error) {
        toast.error(result.error)
        return
      }
      if ('post' in result && result.post) {
        toast.success(publish ? 'Post published!' : 'Draft saved!')
        router.push(`/${locale}/admin/posts`)
      }
    } catch (error) {
      toast.error('An error occurred while saving the post')
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <PostEditor
        data={data}
        authors={authors}
        categories={categories}
        translations={t}
        isEditing={false}
        onChange={setData}
        onUploadImage={handleUploadImage}
        onCancel={handleCancel}
        onSaveDraft={() => handleSave(false)}
        onPublish={() => handleSave(true)}
      />
    </div>
  )
}
