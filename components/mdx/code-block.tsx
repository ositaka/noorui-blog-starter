'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Check, Copy, Terminal } from 'lucide-react'

export interface CodeBlockProps {
  children: React.ReactNode
  /** Filename to display in header */
  filename?: string
  /** Language for display (optional, usually inferred from code) */
  language?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Lines to highlight (comma-separated, e.g., "1,3-5,8") */
  highlightLines?: string
  /** Show copy button */
  copyable?: boolean
  /** Caption below the code */
  caption?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * CodeBlock - Enhanced code block with copy button and filename
 *
 * Note: This component wraps existing code blocks with extra features.
 * Syntax highlighting is handled by rehype-pretty-code.
 *
 * Usage in MDX:
 * <CodeBlock filename="example.ts" copyable>
 * ```typescript
 * const greeting = "Hello, World!";
 * console.log(greeting);
 * ```
 * </CodeBlock>
 */
export function CodeBlock({
  children,
  filename,
  language,
  showLineNumbers,
  copyable = true,
  caption,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    if (!codeRef.current) return

    // Get the text content from the code block
    const codeElement = codeRef.current.querySelector('code')
    const text = codeElement?.textContent || ''

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const showHeader = filename || language || copyable

  return (
    <figure className={cn('my-6 group not-prose', className)}>
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border border-b-0 border-border rounded-t-lg">
          <div className="flex items-center gap-2">
            {filename ? (
              <span className="text-sm font-mono text-muted-foreground">
                {filename}
              </span>
            ) : language ? (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Terminal className="h-3.5 w-3.5" />
                {language}
              </span>
            ) : null}
          </div>
          {copyable && (
            <button
              onClick={handleCopy}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10',
                'opacity-0 group-hover:opacity-100 focus:opacity-100',
              )}
              aria-label={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      )}
      <div
        ref={codeRef}
        className={cn(
          // Remove top radius when header is shown
          showHeader && [
            '[&>pre]:rounded-t-none',
            '[&>pre]:border-t-0',
            '[&>pre]:mt-0',
            '[&_figure>pre]:rounded-t-none',
            '[&_figure>pre]:border-t-0',
            '[&_[data-rehype-pretty-code-figure]>pre]:rounded-t-none',
            '[&_[data-rehype-pretty-code-figure]>pre]:border-t-0',
          ],
          // Ensure pre styling for plain code blocks
          '[&>pre]:overflow-x-auto [&>pre]:p-4 [&>pre]:bg-zinc-900 [&>pre]:text-zinc-100',
          '[&>pre]:border [&>pre]:border-border [&>pre]:rounded-lg',
          '[&>pre>code]:text-sm [&>pre>code]:font-mono',
          showLineNumbers && '[&_code]:data-[line-numbers]',
        )}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * CopyButton - Standalone copy button for inline use
 */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 text-sm rounded-md',
        'bg-muted hover:bg-muted-foreground/10 transition-colors',
        className,
      )}
      aria-label={copied ? 'Copied!' : 'Copy'}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-green-500" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}
