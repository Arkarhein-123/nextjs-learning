"use client";

import { useState } from "react";
import AddToCartButton from "@/features/cart/AddToCartButton";
import { Product } from "@/features/product/productService";
import CartSidebar from "@/features/cart/CartSideBar";
import Navbar from "@/components/Navbar";
import { Sparkles } from "lucide-react";

export default function HomeClient({ products }: { products: Product[] }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans relative overflow-hidden flex flex-col">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-[30%] right-[-15%] h-[600px] w-[600px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-sky-500/10 dark:bg-sky-500/5 blur-[130px] pointer-events-none" />

            {/* macOS Floating Glassmorphic Navbar */}
            <Navbar onCartOpen={() => setIsCartOpen(true)} />

            {/* Main Content Area */}
            <main className="flex-1 mx-auto max-w-6xl w-full px-6 pt-28 pb-12 z-10">
                {/* Hero / Header Section */}
                <div className="mb-10 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 text-xs font-semibold mb-4">
                        <Sparkles className="h-3.5 w-3.5" />
                        Curated for Lake Tahoe Autumn Style
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-905 to-slate-700 dark:from-white dark:to-slate-400">
                        Featured Collection
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                        Handcrafted products designed to inspire. Explore premium garments, accessories, and gear tailored for modern lifestyles.
                    </p>
                </div>

                {/* Product Catalog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="group flex flex-col justify-between bg-white/60 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative backdrop-blur-md"
                        >
                            {/* Product Image Wrapper */}
                            <div className="relative aspect-square w-full rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/30 dark:border-slate-800/20 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-slate-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            {/* Details Info */}
                            <div className="mt-4 flex-1 flex flex-col justify-between">
                                <div className="mb-4">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1.5 text-base font-extrabold text-indigo-650 dark:text-indigo-400">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                                
                                {/* Add to Cart Action */}
                                <AddToCartButton
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Slide-out Cart Panel & Backdrop Overlay */}
            {isCartOpen && (
                <>
                    {/* Backdrop Overlay */}
                    <div
                        className="fixed inset-0 z-50 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsCartOpen(false)}
                    />
                    
                    {/* Floating Panel Container */}
                    <div className="fixed inset-y-0 right-0 z-50 shadow-2xl">
                        <CartSidebar onClose={() => setIsCartOpen(false)} />
                    </div>
                </>
            )}
        </div>
    );
}
