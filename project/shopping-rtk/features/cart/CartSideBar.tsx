"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { removeFromCart, incrementQuantity, decrementQuantity } from "./cartSlice";

interface CartSidebarProps {
    onClose: () => void;
}

export default function CartSidebar({ onClose }: CartSidebarProps) {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white/70 dark:bg-slate-900/75 backdrop-blur-2xl border-l border-slate-200/50 dark:border-slate-800/40 shadow-2xl animate-in slide-in-from-right duration-300">
            {/* macOS Style Window Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/30 dark:border-slate-850/20 bg-slate-50/40 dark:bg-slate-950/20">
                {/* Decorative macOS dots */}
                <div className="flex items-center gap-2 group/dots">
                    <button
                        onClick={onClose}
                        aria-label="Close cart"
                        className="h-3 w-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center cursor-pointer relative"
                    >
                        <span className="absolute text-[8px] font-bold text-rose-950 opacity-0 group-hover/dots:opacity-100 select-none">×</span>
                    </button>
                    <div className="h-3 w-3 rounded-full bg-amber-500 relative flex items-center justify-center select-none">
                        <span className="absolute text-[8px] font-bold text-amber-950 opacity-0 group-hover/dots:opacity-100 select-none">-</span>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500 relative flex items-center justify-center select-none">
                        <span className="absolute text-[8px] font-bold text-emerald-950 opacity-0 group-hover/dots:opacity-100 select-none">+</span>
                    </div>
                </div>

                {/* Header Title */}
                <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-semibold tracking-tight text-slate-850 dark:text-slate-250">
                        Shopping Bag
                    </span>
                </div>

                {/* Empty element to help center the title and balance layout */}
                <div className="w-12" />
            </div>

            {/* Scrollable Cart Items Container */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cartItems.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center py-12">
                        <div className="h-16 w-16 rounded-2xl bg-slate-100/50 dark:bg-slate-800/30 flex items-center justify-center text-slate-400 dark:text-slate-600 mb-4 border border-slate-200/30 dark:border-slate-700/20">
                            <ShoppingBag className="h-7 w-7" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Bag is empty</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[240px]">
                            Once you add items to your cart, they will appear here.
                        </p>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="group flex gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/20 border border-slate-200/40 dark:border-slate-700/15 hover:border-slate-300/60 dark:hover:border-slate-600/30 transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className="h-20 w-20 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/40 overflow-hidden flex-shrink-0 relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Details & Controls */}
                            <div className="flex flex-1 flex-col justify-between min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="min-w-0">
                                        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                                            {item.name}
                                        </h4>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-450 mt-0.5 block">
                                            Unit Price: ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    {/* Segemented Quantity Control */}
                                    <div className="flex items-center bg-slate-100/70 dark:bg-slate-800/40 p-1 rounded-lg border border-slate-200/40 dark:border-slate-700/20">
                                        <button
                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                            className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm text-slate-600 dark:text-slate-450 cursor-pointer transition-all active:scale-90"
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="px-2.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 min-w-[20px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                            className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm text-slate-600 dark:text-slate-450 cursor-pointer transition-all active:scale-90"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="text-rose-500 hover:text-rose-600 text-[10px] font-semibold flex items-center gap-1 p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Summary & Checkout */}
            <div className="border-t border-slate-250/20 dark:border-slate-800/30 bg-slate-50/40 dark:bg-slate-950/25 px-6 py-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>Shipping & Handling</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Free</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Total Price</span>
                    <span className="text-2xl font-bold text-indigo-650 dark:text-indigo-400">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-550 hover:to-purple-550 active:from-indigo-650 active:to-purple-650 text-white font-semibold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg shadow-indigo-600/15 hover:shadow-indigo-650/25 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                </button>
            </div>
        </div>
    );
}
