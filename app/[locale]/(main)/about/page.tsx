import { Blockquote, PullQuote, Callout, WideBox } from '@/components/mdx'
import type { Locale } from '@/lib/supabase/types'
import Link from 'next/link'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1>About Kitab</h1>

        <p>
          <strong>Kitab</strong> (كتاب — meaning "book" in Arabic) is a multilingual blog starter template that demonstrates what's possible when you build with RTL-first infrastructure from day one.
        </p>

        <Callout type="info">
          This entire site — every component, layout, and interaction — is built with{' '}
          <Link href="https://noorui.com">noorui-rtl</Link>, an open-source design system for bilingual applications.
        </Callout>

        <h2>Why Kitab Exists</h2>

        <p>
          Most blog templates treat right-to-left languages as an afterthought. A CSS override here, a direction toggle there. The result? Broken layouts, inconsistent typography, and frustrated users.
        </p>

        <PullQuote>
          Switch between languages and watch the entire interface adapt automatically. No flickering. No layout shifts. Just smooth, natural transitions.
        </PullQuote>

        <p>
          Kitab takes a different approach. Every component was built to work seamlessly across four languages — English, French, Arabic, and Urdu — representing both LTR and RTL writing systems.
        </p>

        <h2>What Powers This Site</h2>

        <p>
          The <Link href="https://noorui.com">noorui-rtl</Link> component library provides over 50 production-ready React components designed with:
        </p>

        <ul>
          <li><strong>RTL-first architecture</strong> using CSS logical properties</li>
          <li><strong>Bilingual support</strong> where Arabic and English are equal citizens</li>
          <li><strong>Full accessibility</strong> with WCAG AA compliance</li>
          <li><strong>Modern tooling</strong> including Next.js 14, TypeScript, and Tailwind CSS</li>
        </ul>

        <Blockquote variant="accent" author="The noorui-rtl philosophy">
          RTL isn't a feature you add. It's a constraint that makes your system better.
        </Blockquote>

        <h2>Explore the Admin Dashboard</h2>

        <p>
          Kitab includes a complete content management system showcasing noorui-rtl's advanced components in action.
        </p>

        <Callout type="success">
          <strong>Guest mode available!</strong> You can explore the full admin panel without signing up. Access it from the navigation header.
        </Callout>

        <p><strong>What you'll find in the dashboard:</strong></p>

        <ul>
          <li>A responsive sidebar layout using <code>DashboardShell</code></li>
          <li>Post management with <code>DataTable</code> featuring sorting, filtering, and pagination</li>
          <li>A rich text editor with full RTL support</li>
          <li>Image uploads integrated with Supabase Storage</li>
          <li>Multi-locale content fields for managing translations</li>
          <li>Authentication via Google OAuth</li>
        </ul>

        <h2>For Developers</h2>

        <p>
          Kitab is designed to be both a demo and a starting point. If you're building a multilingual application — especially one serving Arabic, Hebrew, Urdu, Farsi, or other RTL languages — this template shows you what proper RTL implementation looks like.
        </p>

        <WideBox>
          <h3 className="text-2xl font-semibold mt-8 mb-3">Technical Highlights</h3>

          <div className="my-6 w-full overflow-auto">
            <table className="w-full border-collapse border border-border">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="border border-border px-4 py-2 font-semibold text-start">Feature</th>
                  <th className="border border-border px-4 py-2 font-semibold text-start">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="border border-border px-4 py-2 text-start">Direction Switching</td>
                  <td className="border border-border px-4 py-2 text-start">Automatic RTL/LTR based on locale</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border border-border px-4 py-2 text-start">MDX Components</td>
                  <td className="border border-border px-4 py-2 text-start">Blockquotes, callouts, code blocks, media embeds</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border border-border px-4 py-2 text-start">Rich Text Editor</td>
                  <td className="border border-border px-4 py-2 text-start">Full bidirectional text support</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border border-border px-4 py-2 text-start">Image Handling</td>
                  <td className="border border-border px-4 py-2 text-start">Supabase Storage integration</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border border-border px-4 py-2 text-start">Type Safety</td>
                  <td className="border border-border px-4 py-2 text-start">Full TypeScript coverage</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border border-border px-4 py-2 text-start">Internationalization</td>
                  <td className="border border-border px-4 py-2 text-start">4 languages out of the box</td>
                </tr>
              </tbody>
            </table>
          </div>
        </WideBox>

        <p>
          The source code demonstrates patterns you can adopt in your own projects, from handling bidirectional text to managing multi-locale content.
        </p>

        <Callout type="warning">
          <strong>For local development:</strong> Explore all available MDX components at{' '}
          <Link href={`/${locale}/components-demo`}><code>/components-demo</code></Link> to see what's possible for your blog content.
        </Callout>

        <h2>Get Started with noorui-rtl</h2>

        <p>Ready to build your own multilingual application?</p>

        <Blockquote variant="subtle">
          Whether you're building a blog, an e-commerce platform, or a SaaS dashboard for the GCC market — noorui-rtl gives you the foundation to ship faster without sacrificing quality for your RTL users.
        </Blockquote>

        <p>
          <strong><Link href="https://noorui.com">Explore noorui-rtl →</Link></strong>
        </p>

        <p>
          The documentation includes installation guides, component examples, and best practices for RTL development. Everything is open source and free to use.
        </p>

        <hr className="my-8 border-border" />

        <h2>About the Creator</h2>

        <p>
          Kitab and <Link href="https://noorui.com">noorui-rtl</Link> are created by{' '}
          <strong>Nuno Marques (aka OSITAKA)</strong> — a designer and developer passionate about building better infrastructure for multilingual applications, particularly for the GCC market.
        </p>

        <Callout type="info">
          <strong>Want to connect?</strong> Find Nuno on{' '}
          <Link href="https://github.com/ositaka">GitHub</Link> and{' '}
          <Link href="https://linkedin.com/in/ositaka">LinkedIn</Link> to follow the journey of building RTL-first design systems in public.
        </Callout>

        <p className="text-sm text-muted-foreground italic">
          Kitab is part of the noorui-rtl starter collection. Built with care for developers serving multilingual audiences.
        </p>
      </article>
    </div>
  )
}
