"use client";

import { Product } from "@/features/cart/service";
import { useCartStore } from "@/features/cart/store";

interface ProductCatalogueProps {
    products: Product[];
}

export function ProductCatalogue({ products }: ProductCatalogueProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 antialiased">
            {/* Header section */}
            <div className="mb-10 pb-5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 mb-2">
                    Marketplace
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Premium Catalogue
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Explore curated selection of hardware configurations and essential developer products.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col"
                        >
                            {/* Image Container with Hover Scale */}
                            <div className="relative aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.image || "/placeholder.jpg"}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 tracking-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {product.name}
                                    </h3>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                                        SKU-{product.id.toString().padStart(4, "0")}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/40">
                                    {/* Currency formatting */}
                                    <span className="text-lg font-bold font-mono text-slate-900 dark:text-indigo-400">
                                        ${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-150 h-9 px-4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4 mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                            />
                                        </svg>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Empty Catalogue Fallback state */
                    <div className="col-span-full text-center py-16 bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                        </svg>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            No products available
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Check back later for updated restocks.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
