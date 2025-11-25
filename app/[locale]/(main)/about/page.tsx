import { Blockquote, PullQuote, Callout, WideBox } from '@/components/mdx'
import type { Locale } from '@/lib/supabase/types'
import { aboutTranslations } from '@/lib/i18n/about'
import Link from 'next/link'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = aboutTranslations[locale]

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1>{t.title}</h1>

        <p>
          <strong>Kitab</strong> (كتاب) {t.intro}
        </p>

        <Callout type="info">
          {t.nooruiCallout.split('noorui-rtl').map((part, i, arr) => (
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <Link href="https://noorui.com">noorui-rtl</Link>
              </span>
            ) : part
          ))}
        </Callout>

        <h2>{t.whyTitle}</h2>

        <p>{t.whyP1}</p>

        <PullQuote>{t.pullQuote}</PullQuote>

        <p>{t.whyP2}</p>

        <h2>{t.techTitle}</h2>

        <p>{t.techP1}</p>

        <ul>
          <li><strong>{t.techList.rtl}</strong></li>
          <li><strong>{t.techList.bilingual}</strong></li>
          <li><strong>{t.techList.a11y}</strong></li>
          <li><strong>{t.techList.modern}</strong></li>
        </ul>

        <Blockquote variant="accent" author={t.philosophyAuthor}>
          {t.philosophyQuote}
        </Blockquote>

        <h2>{t.adminTitle}</h2>

        <p>{t.adminP1}</p>

        <Callout type="success">
          <strong>{t.guestCallout}</strong>
        </Callout>

        <p><strong>{t.adminWhat}</strong></p>

        <ul>
          {t.adminList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2>{t.devTitle}</h2>

        <p>{t.devP1}</p>

        <WideBox>
          <h3 className="text-2xl font-semibold mt-8 mb-3">{t.techHighlightsTitle}</h3>

          <div className="my-6 w-full overflow-auto">
            <table className="w-full border-collapse border border-border">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="border border-border px-4 py-2 font-semibold text-start">{t.table.feature}</th>
                  <th className="border border-border px-4 py-2 font-semibold text-start">{t.table.description}</th>
                </tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="border border-border px-4 py-2 text-start">{row.feature}</td>
                    <td className="border border-border px-4 py-2 text-start">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WideBox>

        <p>{t.devP2}</p>

        <Callout type="warning">
          <strong>{t.devCallout.split('/components-demo')[0]}</strong>
          <Link href={`/${locale}/components-demo`}><code>/components-demo</code></Link>
          {t.devCallout.split('/components-demo')[1]}
        </Callout>

        <h2>{t.getStartedTitle}</h2>

        <p>{t.getStartedP1}</p>

        <Blockquote variant="accent">
          {t.getStartedQuote}
        </Blockquote>

        <p>
          <strong><Link href="https://noorui.com">{t.getStartedCTA}</Link></strong>
        </p>

        <p>{t.getStartedP2}</p>

        <hr className="my-8 border-border" />

        <h2>{t.creatorTitle}</h2>

        <p>
          {t.creatorP1.split('Nuno Marques (aka OSITAKA)').map((part, i, arr) => (
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <strong>Nuno Marques (aka OSITAKA)</strong>
              </span>
            ) : part
          ))}
        </p>

        <Callout type="info">
          <strong>{t.creatorCallout.split('GitHub')[0]}</strong>
          <Link href="https://github.com/ositaka">GitHub</Link>
          {t.creatorCallout.split('GitHub')[1].split('LinkedIn')[0]}
          <Link href="https://linkedin.com/in/ositaka">LinkedIn</Link>
          {t.creatorCallout.split('LinkedIn')[1]}
        </Callout>

        <p className="text-sm text-muted-foreground italic">
          {t.footer}
        </p>
      </article>
    </div>
  )
}
