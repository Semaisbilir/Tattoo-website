import { Product } from "./Product";

export interface CartItem extends Product {
    quantity: number;
    imageUrl: string; // Stripe expects image URLs
}
