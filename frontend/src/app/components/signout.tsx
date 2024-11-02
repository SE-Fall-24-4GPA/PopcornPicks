'use client';

import React from "react";
import { Button } from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignOutProps {
  className?: string;
  variant?: "flat" | "bordered" | "light" | "solid" | "shadow" | "ghost" | undefined;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  onSignOut: () => void; // Add a callback prop
}

export default function SignOut({ 
  className,
  variant = "ghost",
  color = "danger",
  onSignOut // Receive the callback
}: SignOutProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            // Sign out the user
            await signOut({
                redirect: false,
                callbackUrl: "/login"
            });
    
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("username"); // Clear other relevant data if necessary
    
            // Call the onSignOut callback to update UI
            onSignOut(); // Call the callback to notify the parent component
    
            // Redirect to login page
            router.replace("/login");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <Button
            onClick={handleSignOut}
            variant={variant}
            color={color}
            className={className}
            startContent={<LogOut size={18} />}
        >
            Sign Out
        </Button>
    );
}
