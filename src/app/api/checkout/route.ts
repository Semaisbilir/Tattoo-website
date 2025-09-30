import Stripe from "stripe";
import { CartItem } from "@/context/CartContext";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-07-30.basil" });

export async function POST(req: Request) {
    try {
        const { items } = await req.json();
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
        }

        // Validate items
        const line_items = items.map((item: CartItem) => {
            if (
                typeof item.name !== "string" ||
                typeof item.price !== "number" ||
                isNaN(item.price) ||
                typeof item.quantity !== "number" ||
                item.quantity <= 0
            ) {
                throw new Error(`Invalid item: ${item.name}`);
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancel`,
        });

        return new Response(JSON.stringify({ url: session.url }));
    } catch (err: unknown) {
        console.error("Stripe checkout error:", err);
        return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Checkout failed" }), {
            status: 500,
        });
    }
}
