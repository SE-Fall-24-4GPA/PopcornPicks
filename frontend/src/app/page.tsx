"use client";
import React from "react";
import { redirect } from "next/navigation";

export default function Page() {
  return <div className="w-full">{redirect("/landing")}</div>;
}
