'use client'

import React from "react"
import { Button } from "@nextui-org/react"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface SignOutProps {
  className?: string;
  variant?: "flat" | "bordered" | "light" | "solid" | "shadow" | "ghost" | undefined;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
}

export default function SignOut({ 
  className,
  variant = "ghost",
  color = "danger"
}: SignOutProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const data = await signOut({
                redirect: false,
                callbackUrl: "/login"
            });
            // Wait for the session to be destroyed before redirecting
            setTimeout(() => {
                router.replace("/login");
            }, 100);
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