"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        storageKey="theme"
      >
        <NextUIProvider>{children}</NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
