"use client";

import React from "react";
import Login from "./login/page";
import SignUp from "./signup/page";
import { ThemeSwitcher } from "./components/theme-switcher";
import { APP_CONSTANTS, FOOTER_LINKS } from "@/app/lib/constants";
import { useTheme } from "next-themes";
import LandingPage from "./landing/page";
import ProfilePage from "./profile/page";
import ReviewPage from "./review/page";
import SignOut from "./components/signout";

export default function Page() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with overlay */}
      <div className="fixed inset-0">
        <img
          src="/movie_collage.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to ensure content readability */}
        <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full py-4 px-6 border-b border-white/10 backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">{APP_CONSTANTS['APP_NAME']}</h1>
            {/* <ThemeSwitcher /> */} {/* Uncomment this line to enable theme switcher */}
            <SignOut />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="w-full">
            <ReviewPage />
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-4 px-6 border-t border-white/10 backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-white/90">
              Made with ❤️ by{" "}
              <a
                href={FOOTER_LINKS[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                PopcornPicks
              </a>
            </p>
            <p className="text-sm text-white/70">
              <a
                href={FOOTER_LINKS[1].url}
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
    </div>
  );
}
