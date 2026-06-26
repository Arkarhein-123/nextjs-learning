"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addToCart } from "./cartSlice";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

interface ButtonProps {
    id: string;
    name: string;
    price: number;
    image: string;
}

export default function AddToCartButton({ id, name, price, image }: ButtonProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, image }));
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full flex items-center justify-center gap-2 font-semibold text-xs px-4 py-3 rounded-xl hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer ${
                isAdded
                    ? "bg-emerald-600 dark:bg-emerald-500 text-white cursor-default"
                    : "bg-slate-900 hover:bg-slate-850 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white"
            }`}
        >
            {isAdded ? (
                <>
                    <Check className="h-4 w-4 animate-in zoom-in duration-200" />
                    <span className="animate-in fade-in duration-200">Added!</span>
                </>
            ) : (
                <>
                    <Plus className="h-4 w-4" />
                    <span>Add to Cart</span>
                </>
            )}
        </button>
    );
}
