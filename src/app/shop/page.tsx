"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/Product";

const categories = ["Prints", "Clothing", "Art"];
const defaultColors = ["black", "grey", "white"];

export default function Shop() {
    const searchParams = useSearchParams();
    const sort = searchParams.get("sort") || "default";
    const category = searchParams.get("category") || "All";
    const priceRange = searchParams.get("price") || "all";
    const stockOnly = searchParams.get("stock") === "true";
    const colorFilter = searchParams.get("color") || "All";

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const all = getProducts(sort);
        const filtered = all.filter((p) => {
            const matchCategory = category === "All" || p.category === category;
            const matchStock = !stockOnly || p.stock > 0;

            let matchPrice = true;
            if (priceRange === "under50") matchPrice = p.price < 50;
            else if (priceRange === "50to100") matchPrice = p.price >= 50 && p.price <= 100;
            else if (priceRange === "over100") matchPrice = p.price > 100;

            const colorsToCheck = p.colors && p.colors.length > 0 ? p.colors : defaultColors;
            const matchColor = colorFilter === "All" || colorsToCheck.includes(colorFilter);

            return matchCategory && matchStock && matchPrice && matchColor;
        });

        setProducts(filtered);
    }, [sort, category, priceRange, stockOnly, colorFilter]);

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set(key, value);
        window.history.replaceState(null, "", "?" + params.toString());
    };

    return (
        <div className="bg-black dark:bg-white text-white dark:text-black min-h-screen font-[Outfit]">
            <nav className="py-6 border-b border-gray-200 text-center">
                {categories.map((cat) => {
                    const active = cat === category;
                    return (
                        <button
                            key={cat}
                            onClick={() => updateParams("category", cat)}
                            className={`inline-block mx-4 uppercase text-sm ${
                                active ? "text-white dark:text-black font-semibold" : "text-gray-500"
                            }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </nav>

            <div className="flex max-w-7xl mx-auto">
                <aside className="w-64 p-6 border-r border-gray-200 hidden md:block">
                    <h3 className="font-bold mb-4">Filter</h3>

                    <div className="mb-6">
                        <h4 className="font-medium text-sm mb-2">Category</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <button onClick={() => updateParams("category", "All")}>All</button>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button onClick={() => updateParams("category", cat)}>{cat}</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-medium text-sm mb-2">Price</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <button onClick={() => updateParams("price", "all")}>All</button>
                            </li>
                            <li>
                                <button onClick={() => updateParams("price", "under50")}>Under $50</button>
                            </li>
                            <li>
                                <button onClick={() => updateParams("price", "50to100")}>$50 to $100</button>
                            </li>
                            <li>
                                <button onClick={() => updateParams("price", "over100")}>Over $100</button>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-medium text-sm mb-2">Color</h4>
                        <ul className="space-y-1 text-sm flex flex-wrap gap-2">
                            <li>
                                <button
                                    className={colorFilter === "All" ? "font-semibold" : ""}
                                    onClick={() => updateParams("color", "All")}
                                >
                                    All
                                </button>
                            </li>
                            {defaultColors.map((color) => (
                                <li key={color}>
                                    <button
                                        className={`w-6 h-6 rounded-full border-2 ${
                                            colorFilter === color ? "border-black" : "border-gray-300"
                                        }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => updateParams("color", color)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-sm mb-2">Availability</h4>
                        <label className="text-sm">
                            <input
                                type="checkbox"
                                checked={stockOnly}
                                onChange={(e) => updateParams("stock", e.target.checked ? "true" : "false")}
                            />{" "}
                            In stock only
                        </label>
                    </div>
                </aside>

                <div className="flex-1 px-4 md:px-10 py-8">
                    <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
                        <span>
                            Showing {products.length} product{products.length !== 1 ? "s" : ""} in{" "}
                            <strong>{category}</strong>
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
