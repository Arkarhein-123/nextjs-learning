"use client";

import { useCartStore } from "@/features/cart/store";
import Image from "next/image";
import Link from "next/link";

export function CartSidebar() {
    const { items, clearCart, removeFromCart } = useCartStore();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="flex h-full w-full max-w-md flex-col bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800/80 shadow-2xl antialiased">
            {/* Header Section */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                            Shopping Cart
                        </h2>
                        {totalItems > 0 && (
                            <span className="inline-flex h-5 items-center justify-center rounded-full bg-indigo-50 px-2 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                {totalItems}
                            </span>
                        )}
                    </div>
                </div>

                {items.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="text-xs font-semibold text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-all px-2.5 py-1.5 rounded-md"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100 dark:divide-slate-800/40">
                {items && items.length > 0 ? (
                    items.map((item, idx) => (
                        <div key={item.id} className={`flex gap-4 group/item ${idx > 0 ? "pt-4" : ""}`}>
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 relative">
                                <img
                                    src={item.image || "/placeholder.jpg"}
                                    alt={item.name}
                                    className="h-16 w-16 object-cover rounded-xl"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-between py-0.5">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50 tracking-tight line-clamp-1 group-hover/item:text-indigo-600">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 font-mono">
                                        ${Number(item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        Qty{" "}
                                        <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                                            × {item.quantity}
                                        </span>
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs font-medium text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-0.5 px-1 rounded hover:bg-slate-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center pb-12">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Your cart is empty</h3>
                    </div>
                )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-800/60 p-6 space-y-4">
                    <div className="flex justify-between text-base font-bold text-slate-900 dark:text-slate-50">
                        <span>Estimated Total</span>
                        <span className="text-indigo-600">${total.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl h-11 text-sm transition-all">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
