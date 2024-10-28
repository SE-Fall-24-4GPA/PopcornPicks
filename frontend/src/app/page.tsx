"use client";

import React from "react";
import Login from "./login/page";
import SignUp from "./signup/page";
import { ThemeSwitcher } from "./components/theme-switcher";
import { APP_CONSTANTS } from "@/app/lib/constants";
import { useTheme } from "next-themes";
import LandingPage from "./landing/page";

export default function Page() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="w-full py-4 px-6 border-b border-divider">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">{APP_CONSTANTS["APP_NAME"]}</h1>
          <ThemeSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <LandingPage />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 border-t border-divider">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/SE-Fall-24-4GPA/PopcornPicks?tab=readme-ov-file"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              PopcornPicks
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            <a
              href="https://github.com/SE-Fall-24-4GPA/PopcornPicks/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              MIT License Copyright (c) 2024 PopcornPicks
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
