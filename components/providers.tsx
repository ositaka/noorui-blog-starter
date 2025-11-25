'use client'

import { ThemeProvider } from 'next-themes'
import { DirectionProvider, DesignSystemProvider, TooltipProvider } from 'noorui-rtl'
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <DirectionProvider>
        <DesignSystemProvider defaultTheme="minimal">
          <TooltipProvider>
            {/* Navigation progress bar */}
            <NextTopLoader
              color="hsl(var(--primary))"
              height={3}
              showSpinner={false}
              shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
            />
            {children}
            <Toaster richColors position="bottom-right" />
          </TooltipProvider>
        </DesignSystemProvider>
      </DirectionProvider>
    </ThemeProvider>
  )
}
