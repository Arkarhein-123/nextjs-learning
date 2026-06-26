"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ShoppingBag, Sparkles, Compass, Flame } from "lucide-react";

interface NavbarProps {
    onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    
    // Sum total quantities of all items
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-6xl w-[calc(100%-2rem)] rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(15,23,42,0.06)] transition-all duration-300">
            <div className="px-6 py-3.5 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold tracking-tight text-slate-800 dark:text-white leading-none">
                            IndiShop
                        </span>
                        <span className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400 mt-0.5">
                            Tahoe Edition
                        </span>
                    </div>
                </div>

                {/* Navigation Links - macOS Segmented Control Style */}
                <div className="hidden md:flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/30 p-1 rounded-xl border border-slate-200/30 dark:border-slate-700/20">
                    <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-sm border border-slate-200/30 dark:border-slate-700/30 transition-all duration-200">
                        <Compass className="h-3.5 w-3.5" />
                        Explore
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200">
                        <Flame className="h-3.5 w-3.5" />
                        Hot Deals
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200">
                        <Sparkles className="h-3.5 w-3.5" />
                        New In
                    </button>
                </div>

                {/* Actions / Cart Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCartOpen}
                        className="group relative flex items-center gap-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/40 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 shadow-sm hover:shadow active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        <div className="relative">
                            <ShoppingBag className="h-4.5 w-4.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-in zoom-in duration-200">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                        <span className="hidden sm:inline">Cart</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
