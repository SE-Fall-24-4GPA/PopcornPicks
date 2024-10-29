"use client";

import { APP_CONSTANTS } from "../lib/constants";
import SignOut from "./signout";
import { AuthGuard } from "./auth/AuthGuard";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="w-full py-4 px-6 border-b border-white/10 backdrop-blur-sm bg-black/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {APP_CONSTANTS["APP_NAME"]}
        </h1>
        {session && <SignOut />}
      </div>
    </header>
  );
}
