"use client";

import { APP_CONSTANTS } from "../lib/constants";
import SignOut from "./signout";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if the user is logged in based on local storage
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Check login status on component mount
    checkLoginStatus();

    // Add an event listener to handle local storage changes
    const handleStorageChange = (event) => {
      if (event.key === "token" || event.key === "username") {
        checkLoginStatus();
      }
    };

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
    setIsLoggedIn(false); // Update state when the user signs out
  };

  return (
    <header className="w-full py-4 px-6 border-b border-white/10 backdrop-blur-sm bg-black/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {APP_CONSTANTS["APP_NAME"]}
        </h1>
        {isLoggedIn && <SignOut onSignOut={handleSignOut} />} {/* Pass the callback to SignOut */}
      </div>
    </header>
  );
}
