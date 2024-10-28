'use client'

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem={true}
      storageKey="theme"
    >
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  )
}