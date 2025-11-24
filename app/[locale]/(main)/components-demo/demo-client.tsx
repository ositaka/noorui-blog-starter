'use client'

import { Separator } from 'noorui-rtl'
import type { Locale } from '@/lib/supabase/types'
import {
  Blockquote,
  PullQuote,
  Callout,
  InfoCallout,
  WarningCallout,
  ErrorCallout,
  SuccessCallout,
  Figure,
  ImageGrid,
  MediaEmbed,
  YouTube,
  CodeBlock,
} from '@/components/mdx'

interface ComponentsDemoClientProps {
  locale: Locale
}

export function ComponentsDemoClient({ locale }: ComponentsDemoClientProps) {
  const isRTL = locale === 'ar' || locale === 'ur'

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">MDX Components Demo</h1>
        <p className="text-xl text-muted-foreground">
          A showcase of all custom MDX components available for blog posts.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Blockquote Section */}
        <section className="mb-16">
          <h2>Blockquotes</h2>
          <p>Styled quotes with optional attribution and variants.</p>

          <h3>Default Variant</h3>
          <Blockquote author="Ibn Arabi" source="Fusus al-Hikam">
            The self is an ocean without a shore. Gazing upon it has no beginning or end,
            in this world or the next.
          </Blockquote>

          <h3>Accent Variant</h3>
          <Blockquote variant="accent" author="Rumi" source="The Essential Rumi">
            What you seek is seeking you. Let yourself be silently drawn by the strange
            pull of what you really love. It will not lead you astray.
          </Blockquote>

          <h3>Subtle Variant</h3>
          <Blockquote variant="subtle" author="Al-Ghazali">
            Knowledge without action is wastefulness and action without knowledge is foolishness.
          </Blockquote>
        </section>

        <Separator className="my-12" />

        {/* Pull Quotes Section */}
        <section className="mb-16">
          <h2>Pull Quotes</h2>
          <p>Large, emphasized quotes for highlighting key text.</p>

          <PullQuote align="center">
            The wound is the place where the Light enters you.
          </PullQuote>

          <PullQuote align="left">
            Be like the sun for grace and mercy.
          </PullQuote>
        </section>

        <Separator className="my-12" />

        {/* Callouts Section */}
        <section className="mb-16">
          <h2>Callouts</h2>
          <p>Highlighted content boxes for tips, warnings, errors, and notes.</p>

          <Callout type="info" title="Did you know?">
            MDX allows you to use JSX components directly in your Markdown content,
            giving you the full power of React.
          </Callout>

          <Callout type="warning" title="Caution">
            Make sure to backup your data before running this operation.
            This action cannot be undone.
          </Callout>

          <Callout type="error" title="Error">
            The connection to the server was lost. Please check your network
            connection and try again.
          </Callout>

          <Callout type="success" title="Success">
            Your changes have been saved successfully. The new settings will
            take effect immediately.
          </Callout>

          <Callout type="note">
            This is a simple note without a title. Use it for quick annotations.
          </Callout>

          <h3>Shorthand Components</h3>
          <InfoCallout title="Pro Tip">
            You can also use InfoCallout, WarningCallout, ErrorCallout, and SuccessCallout
            for convenience.
          </InfoCallout>
        </section>

        <Separator className="my-12" />

        {/* Figure Section */}
        <section className="mb-16">
          <h2>Figures</h2>
          <p>Images with captions and various sizes.</p>

          <Figure
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
            alt="A beautiful landscape"
            caption="A serene mountain landscape at sunset. Photo by Unsplash."
          />

          <h3>Wide Size</h3>
          <Figure
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
            alt="Wide panoramic view"
            caption="Panoramic mountain view"
            size="wide"
          />
        </section>

        <Separator className="my-12" />

        {/* Image Grid Section */}
        <section className="mb-16">
          <h2>Image Grid</h2>
          <p>Grid layout for multiple images.</p>

          <ImageGrid columns={2} gap="md">
            <Figure
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
              alt="Nature scene 1"
            />
            <Figure
              src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop"
              alt="Nature scene 2"
            />
            <Figure
              src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop"
              alt="Nature scene 3"
            />
            <Figure
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop"
              alt="Nature scene 4"
            />
          </ImageGrid>
        </section>

        <Separator className="my-12" />

        {/* Media Embed Section */}
        <section className="mb-16">
          <h2>Media Embeds</h2>
          <p>Responsive video embeds for YouTube and Vimeo.</p>

          <h3>YouTube</h3>
          <YouTube
            id="dQw4w9WgXcQ"
            caption="Example YouTube video embed"
          />

          <h3>Using URL</h3>
          <MediaEmbed
            url="https://www.youtube.com/watch?v=jNQXAC9IVRw"
            caption="First YouTube video ever - Me at the zoo"
          />
        </section>

        <Separator className="my-12" />

        {/* Code Block Section */}
        <section className="mb-16">
          <h2>Code Blocks</h2>
          <p>Enhanced code blocks with copy button and filename.</p>
          <Callout type="note">
            Syntax highlighting is provided by Shiki via rehype-pretty-code during MDX compilation.
            In actual blog posts, code will be fully syntax highlighted.
          </Callout>

          <CodeBlock filename="example.ts" language="TypeScript">
            <pre>
              <code>{`// A simple greeting function
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Usage
const message = greet("World");
console.log(message); // Output: Hello, World!`}</code>
            </pre>
          </CodeBlock>

          <CodeBlock filename="styles.css" language="CSS">
            <pre>
              <code>{`.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}

.card {
  border-radius: 0.5rem;
  background: var(--card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}`}</code>
            </pre>
          </CodeBlock>
        </section>

        <Separator className="my-12" />

        {/* Usage Guide */}
        <section className="mb-16">
          <h2>Usage in MDX</h2>
          <p>Here is how to use these components in your blog posts:</p>

          <CodeBlock filename="blog-post.mdx" language="MDX">
            <pre>
              <code>{`<Blockquote author="Ibn Arabi" source="Fusus al-Hikam" variant="accent">
  The self is an ocean without a shore.
</Blockquote>

<Callout type="info" title="Note">
  Important information here.
</Callout>

<Figure
  src="/images/photo.jpg"
  alt="Description"
  caption="Photo caption"
/>

<YouTube id="video-id" />

<MediaEmbed url="https://vimeo.com/123456789" />`}</code>
            </pre>
          </CodeBlock>
        </section>
      </div>
    </div>
  )
}
