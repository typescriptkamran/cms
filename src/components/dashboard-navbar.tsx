"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch className="text-xl font-bold">
            Logo
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
