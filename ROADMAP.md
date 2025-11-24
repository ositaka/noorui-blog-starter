# Kitab Blog Roadmap

A plan for enriching the blog while also expanding noorui-rtl components.

---

## Phase 1: Content Rendering & Reading Experience

### 1.1 Markdown/MDX Rendering ✅
- [x] Install `next-mdx-remote` or `@mdx-js/react`
- [x] Create MDX components mapping for custom styling
- [x] Support for code syntax highlighting (`rehype-highlight` or `shiki`)
- [x] RTL-aware prose styles

### 1.2 Sticky Sidebar ✅
- [x] Make sidebar sticky on scroll
- [x] Add smooth scroll behavior
- [x] Collapse on mobile (hidden on mobile, visible on lg+)

### 1.3 Table of Contents (ToC) ✅
- [x] Auto-generate from headings (using rehype-slug + existing ToC component)
- [x] Highlight active section on scroll
- [x] Smooth scroll to section
- [x] RTL-aware positioning (uses CSS logical properties)

**New noorui-rtl components:**
- `TableOfContents` - Auto-generated, scroll-aware ToC
- `StickyAside` - Sticky sidebar container with RTL support

---

## Phase 2: Rich Content Components

### 2.1 Blockquote Component ✅
- [x] Styled blockquote with author attribution
- [x] Support for pull quotes
- [x] RTL text direction support (uses CSS logical properties)
- [x] Multiple variants (default, accent, subtle)

### 2.2 Callout Component ✅
- [x] Info, warning, error, success, note types
- [x] Optional title
- [x] Custom icons support
- [x] RTL-aware layout

### 2.3 Video/Media Component ✅
- [x] Support for YouTube, Vimeo embeds
- [x] Privacy-focused embeds (youtube-nocookie.com, dnt=1)
- [x] Responsive aspect ratios
- [ ] Video player with custom controls (future)
- [ ] Audio player with waveform visualization (future)

### 2.4 Figure/Gallery Component ✅
- [x] Figure with caption
- [x] Image grid layout
- [x] Size variants (default, wide, full)
- [ ] Image gallery with lightbox (future)
- [ ] Carousel/slider mode (future)

### 2.5 Code Block Component ✅
- [x] Syntax highlighting (via rehype-pretty-code)
- [x] Copy button
- [x] File name header
- [x] Line numbers (via Shiki)
- [x] Line highlighting (via Shiki)
- [x] RTL-aware for Arabic code comments

**Components added to Kitab (components/mdx/):**
- `Blockquote` - Styled quote with attribution
- `PullQuote` - Highlighted pull quote
- `Callout` - Info/warning/error/success boxes
- `Figure` - Image with caption
- `ImageGrid` - Grid layout for images
- `MediaEmbed` - YouTube/Vimeo embed wrapper
- `YouTube` - Convenience component for YouTube
- `Vimeo` - Convenience component for Vimeo
- `CodeBlock` - Code with copy button and filename
- `CopyButton` - Standalone copy button

**Demo page:** `/en/components-demo` (development only)

---

## Phase 3: Social & Engagement Features

### 3.1 Comments System
Options to consider:
- [ ] Giscus (GitHub Discussions) - Free, developer-friendly
- [ ] Disqus - Popular, feature-rich
- [ ] Custom with Supabase - Full control, multilingual

Features needed:
- [ ] Threaded replies
- [ ] RTL text input
- [ ] Reactions/likes
- [ ] Moderation

### 3.2 Social Sharing
- [ ] Share buttons (Twitter, Facebook, LinkedIn, WhatsApp)
- [ ] Copy link button
- [ ] Native share API support
- [ ] Share counts (optional)

### 3.3 Newsletter Subscription
- [ ] Email capture form
- [ ] Integration options (Mailchimp, ConvertKit, Buttondown)
- [ ] Inline and popup variants

**New noorui-rtl components:**
- `CommentSection` - Comments display
- `CommentForm` - RTL-aware comment input
- `ShareButtons` - Social sharing
- `NewsletterForm` - Email subscription

---

## Phase 4: Admin Panel

### 4.1 Authentication
- [x] Supabase Auth integration (Google OAuth)
- [x] Admin role check (via ADMIN_EMAILS env var)
- [x] Protected routes (middleware-based)
- [x] Guest mode (view-only access for demos)
- [x] Login page with Google + Guest options
- [x] Auth state management (AuthProvider context)

### 4.2 Post Management
- [x] Posts list with filters
- [x] Create/Edit post form
- [x] Rich text editor (already have `RichTextEditor` in noorui-rtl)
- [x] Draft/Publish workflow
- [ ] Image upload to Supabase Storage
- [x] Translation management (all 4 locales)
- [x] Server actions protected (guests cannot edit)
- [x] Toast notifications for errors/success

### 4.3 Dashboard
- [x] Analytics overview (views, popular posts)
- [ ] Recent comments
- [x] Quick actions

### 4.4 Admin Structure (Implemented)
- [x] Separate admin layout (no site header/footer)
- [x] Sidebar navigation with DashboardShell
- [x] Proper Next.js routing (no hash-based navigation)
- [x] Server Actions for mutations
- [x] Sliding panel for post details preview
- [x] Guest mode badge in header
- [x] Settings page with profile, site info, and sign out

**New noorui-rtl components:**
- `AdminLayout` - Admin panel shell (using DashboardShell)
- `PostEditor` - Full post editing experience
- `ImageUpload` - Drag & drop image upload (TODO)
- `TranslationEditor` - Side-by-side translation editing
- `StatsCard` - Analytics display card

### 4.5 Authentication Architecture
```
Guest Mode:                    Admin Mode:
┌─────────────────┐            ┌─────────────────┐
│  Login Page     │            │  Login Page     │
│  "Enter Guest"  │            │  Google Sign-In │
└────────┬────────┘            └────────┬────────┘
         │                              │
         ▼                              ▼
┌─────────────────┐            ┌─────────────────┐
│  Cookie Set     │            │  Supabase Auth  │
│  kitab_guest    │            │  + Email Check  │
└────────┬────────┘            └────────┬────────┘
         │                              │
         ▼                              ▼
┌─────────────────┐            ┌─────────────────┐
│  View Only      │            │  Full Access    │
│  - Can browse   │            │  - CRUD posts   │
│  - No mutations │            │  - All actions  │
└─────────────────┘            └─────────────────┘
```

---

## Phase 5: Discovery & Navigation

### 5.1 Search
- [ ] Full-text search
- [ ] Search modal (Cmd+K)
- [ ] Search suggestions
- [ ] RTL search input

### 5.2 Related Posts
- [ ] Algorithm improvements (tags, categories)
- [ ] Visual related posts section

### 5.3 Pagination
- [ ] Numbered pagination
- [ ] Infinite scroll option
- [ ] Load more button

### 5.4 Filters & Sorting
- [ ] Sort by date, popularity
- [ ] Filter by tag, category
- [ ] URL-based filters

**New noorui-rtl components:**
- `SearchModal` - Cmd+K search experience
- `SearchInput` - RTL-aware search input
- `Pagination` - (already exists, may need enhancement)
- `InfiniteScroll` - Auto-loading content

---

## Phase 6: SEO & Performance

### 6.1 SEO
- [ ] Dynamic meta tags
- [ ] Open Graph images
- [ ] JSON-LD structured data
- [ ] Sitemap generation
- [ ] RSS feed

### 6.2 Performance
- [ ] Image optimization (already using next/image)
- [ ] Lazy loading
- [ ] Static generation where possible
- [ ] Bundle analysis

---

## Priority Order (Suggested)

### High Priority (Do First)
1. **Markdown rendering** - Essential for blog content
2. **Sticky sidebar + ToC** - Improves reading experience
3. **Blockquote component** - Common in blog posts

### Medium Priority
4. **Code block component** - Important for tech content
5. **Search** - User expectation
6. **Comments** - Engagement
7. **Admin panel basics** - Content management

### Lower Priority (Nice to Have)
8. **Gallery/Carousel** - Rich media
9. **Video/Audio** - Multimedia content
10. **Newsletter** - Marketing
11. **Advanced analytics** - Insights

---

## Implementation Notes

### For noorui-rtl Development
When creating components, ensure:
- [ ] RTL/LTR support via `dir` prop or context
- [ ] Logical CSS properties (`margin-inline-start`, etc.)
- [ ] Keyboard navigation works in both directions
- [ ] Touch gestures respect direction (swipe left/right)
- [ ] Icons flip when appropriate (arrows, etc.)

### Testing Checklist
For each feature, test in:
- [ ] English (LTR)
- [ ] French (LTR)  
- [ ] Arabic (RTL)
- [ ] Urdu (RTL)
- [ ] Light mode
- [ ] Dark mode
- [ ] Mobile viewport
- [ ] Desktop viewport

---

## Getting Started

To continue development, start a fresh Claude Code session and reference this roadmap:

```
"Let's work on Phase 1 of the Kitab blog roadmap - specifically markdown rendering. Check ROADMAP.md for context."
```

---

## Phase 7: Component Development in noorui-rtl

### Development Workflow

**Primary workflow**: Build components directly in noorui-rtl, then use in Kitab.

```
┌─────────────────────────────────────────────────────────────────┐
│  1. BUILD IN NOORUI-RTL                                         │
│     Create component in noorui-rtl/components/                  │
│     Add TypeScript types, RTL support, variants                 │
│     Write Storybook stories and tests                           │
│     Export from index.ts                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. PUBLISH NEW VERSION                                         │
│     Bump version in package.json                                │
│     npm publish                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. USE IN KITAB                                                │
│     npm update noorui-rtl                                       │
│     Import component: import { X } from 'noorui-rtl'            │
│     Use in MDX components or pages                              │
└─────────────────────────────────────────────────────────────────┘
```

**Alternative workflow** (for complex components): Prototype in Kitab first, then migrate.

```
Kitab /components/  →  Test with real content  →  Migrate to noorui-rtl
```

### Component Spec Template

When a component is ready for migration, create a spec file at:
`/docs/components/<component-name>.md`

Template structure:

```markdown
# ComponentName

## Overview
Brief description of what the component does.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'highlight' | 'default' | Visual style |
| dir | 'ltr' \| 'rtl' | inherited | Text direction |

## RTL Behavior
- How the component adapts to RTL
- Which CSS properties use logical values
- Icon/arrow flipping behavior

## Variants
Description of each variant with visual examples.

## Usage Examples

### Basic
\`\`\`tsx
<ComponentName>Content</ComponentName>
\`\`\`

### With RTL
\`\`\`tsx
<ComponentName dir="rtl">محتوى عربي</ComponentName>
\`\`\`

## Accessibility
- Keyboard navigation
- ARIA attributes
- Screen reader behavior

## Source Code
\`\`\`tsx
// Full component code here
\`\`\`
```

### Components to Build in noorui-rtl

#### Phase 2: Rich Content Components (Priority: HIGH)

| Component | Description | Props | Status |
|-----------|-------------|-------|--------|
| `Blockquote` | Styled quote with optional author/source | `variant`, `author`, `source`, `cite` | TODO |
| `PullQuote` | Large highlighted quote for emphasis | `align` (left/center/right) | TODO |
| `Callout` | Info/warning/error/success boxes | `type`, `title`, `icon` | TODO |
| `CodeBlock` | Enhanced code with copy, filename, line numbers | `language`, `filename`, `showLineNumbers`, `highlightLines` | TODO |
| `MediaEmbed` | YouTube/Vimeo/Twitter embeds | `url`, `aspectRatio` | TODO |
| `ImageGallery` | Grid of images with lightbox | `images`, `columns`, `gap` | TODO |
| `Figure` | Image with caption | `src`, `alt`, `caption` | TODO |

#### Phase 1: Reading Experience
- [ ] `TableOfContents` - Already in Kitab, needs migration
- [ ] `StickyAside` - Sidebar container with sticky behavior

#### From Phase 3
- [ ] `CommentSection`
- [ ] `CommentForm`
- [ ] `ShareButtons`
- [ ] `NewsletterForm`

#### From Phase 4 (Admin Panel)
- [ ] `StatsCard` - Dashboard statistics card with trend indicator
- [ ] `PostsTable` - Posts DataTable with columns, filters, and actions
- [ ] `PostFilters` - Filter controls for posts (search, status, category)
- [ ] `PostEditor` - Multi-locale post editing form
- [ ] `ContentEditor` - Dual-mode editor (Rich Text + Markdown) with preview
- [ ] `TranslationEditor` - Side-by-side translation editor with copy functionality
- [ ] `ImageUpload` - Drag & drop image upload (future)

#### Bug Fixes Needed in noorui-rtl
- [ ] **DataTable filtering/sorting not working** - The `searchable` prop and column `sortable`/`filterable` props don't seem to trigger actual filtering/sorting. Kitab has a local workaround using Table + custom logic. This should be fixed in noorui-rtl so DataTable works out of the box.

#### Fixed in noorui-rtl v0.3.8
- [x] **DashboardShell DialogTitle accessibility** - Added visually hidden SheetTitle to satisfy radix-ui accessibility requirements. This fixes the console warning about DialogContent requiring DialogTitle.
- [x] **DashboardShell mobile sidebar RTL positioning** - Fixed mobile sidebar to use `side="start"` instead of direction-based logic since CSS logical properties handle RTL automatically. Now the sidebar correctly appears on the right side for RTL locales.

#### Added in noorui-rtl v0.3.11
- [x] **DashboardShell headerActions prop** - New prop to add custom actions (like theme/language switchers) to the header.

#### Added in noorui-rtl v0.3.12
- [x] **RichTextEditor dir prop** - New prop to override direction from context. Useful when editing content in a different language than the page locale (e.g., editing Arabic content on an English admin page).

#### Fixed in noorui-rtl v0.3.13
- [x] **RichTextEditor jsx attribute console error** - Fixed `jsx` attribute console error in Next.js 16 with Turbopack. Replaced styled-jsx with standard `dangerouslySetInnerHTML` for inline styles.

#### Added in noorui-rtl v0.3.14
- [x] **ButtonArrow component** - New button variant with semantic direction support (`forward`/`back`). Arrows automatically flip in RTL mode using `rtl:rotate-180`. Replaces the need for manual arrow icon handling with direction-aware buttons.

#### Added in Kitab v0.1.x
- [x] **Localized date formatting** - Dates now display in Arabic format (e.g., "٢٢ نوفمبر ٢٠٢٥") when in Arabic locale. Uses `Intl.DateTimeFormat` with locale-aware month names and numerals. Created `formatDate` utility in `lib/utils.ts`.
- [x] **Admin auth with Guest mode** - Google OAuth + Email magic link + Guest mode for demos. Protected server actions, toast notifications, settings page.

#### Bug Fixes Needed in Kitab
- [ ] **Translation copy preview not parsing markdown** - When copying content between locales in the TranslationEditor, the preview panel shows raw markdown instead of rendered content. Need to parse/render markdown in the preview.

#### From Phase 5
- [ ] `SearchModal`
- [ ] `SearchInput`
- [ ] `InfiniteScroll`

### Migration Session Prompt

When starting a new session to migrate components, use:

```
"I have component specs ready in /docs/components/ from the Kitab blog.
Let's migrate [ComponentName] to noorui-rtl package.
Check the spec file for props, RTL behavior, and source code."
```

### After Migration Checklist

For each migrated component:
- [ ] Component added to noorui-rtl/components/
- [ ] Exported from index.ts
- [ ] TypeScript types exported
- [ ] Storybook story created
- [ ] Unit tests written
- [ ] RTL tests included
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Published to npm
- [ ] Kitab updated to use package version
