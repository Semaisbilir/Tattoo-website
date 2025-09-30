"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type SpecialOrderType = "deliver" | "pickup" | null;

export type SpecialOrderDetails = {
    name: string;
    address?: string;
    phone: string;
    note?: string;
};

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    size?: string;
    color?: string;
    specialOrderType?: SpecialOrderType;
    specialOrderDetails?: SpecialOrderDetails;
};

interface CartContextType {
    cart: CartItem[];
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingItem = prev.find((i) => i._id === item._id && i.size === item.size);
            if (existingItem) {
                return prev.map((i) =>
                    i._id === item._id && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
        setIsCartOpen(true); // open drawer automatically
    };

    const removeFromCart = (id: string) => setCart((prev) => prev.filter((item) => item._id !== id));
    const updateQuantity = (id: string, quantity: number) =>
        setCart((prev) => prev.map((item) => (item._id === id ? { ...item, quantity } : item)));
    const clearCart = () => setCart([]);

    // Persist cart
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                cartTotal,
                isCartOpen,
                toggleCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
