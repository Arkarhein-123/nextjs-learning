// app/employee/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To detect current route

interface NavItem {
    name: string;
    href: string;
}

interface NavbarProps {
    brand: string;
    links: NavItem[];
}

export default function Navbar({ brand, links }: NavbarProps) {
    const pathname = usePathname(); // Get active url path

    return (
        <div className="w-full border-b bg-background sticky top-0 z-50">
            <nav className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {brand}
                </h3>

                <div>
                    <ul className="flex items-center gap-2 text-sm font-medium relative">
                        {links.map((link, index) => {
                            // Check if this specific link is the active route
                            const isActive = pathname === link.href;

                            return (
                                <li key={index} className="relative">
                                    <Link
                                        href={link.href}
                                        className={`px-4 py-2 rounded-md transition-all duration-300 block text-sm ${
                                            isActive
                                                ? "bg-blue-500 text-white border font-semibold shadow-sm"
                                                : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
