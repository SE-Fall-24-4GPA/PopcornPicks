'use client'

import React from "react"
import {Button} from "@nextui-org/react"
import {LogOut} from "lucide-react"

export default function SignOut() {
    return (
        <Button>
            <LogOut size={18}/>
        </Button>
    );
}