import { Product } from "./service";
import { create } from "zustand";

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addToCart: (product: Product) =>
        set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                // Return a new array with the updated quantity for the matching item
                return {
                    items: state.items.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                    ),
                };
            }
            return {
                items: [...state.items, { ...product, quantity: 1 }],
            };
        }),
    removeFromCart: (id: number) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
    clearCart: () => set({ items: [] }),
}));
