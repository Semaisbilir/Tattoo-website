import { Product } from "@/types/Product";

export function getProducts(sort: string = "default"): Product[] {
    const baseProducts: Product[] = [
        {
            _id: "1",
            name: "Fijian Design Hoodie",
            description: "Long Sleeve",
            price: 60.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0005.jpg",
            stock: 0,
            category: "Clothing",
            colors: ["black", "grey", "white"],
        },
        {
            _id: "2",
            name: "Fijian Design T-shirt",
            description: "Gildan Soft Style",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0006.jpg",
            stock: 5,
            category: "Clothing",
            colors: ["black", "grey", "white"],
        },
        {
            _id: "3",
            name: "Fijian Design Hoodie",
            description: "Long Sleeve",
            price: 60.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0007.jpg",
            stock: 1,
            category: "Clothing",
            colors: ["black", "grey", "white"],
        },
        {
            _id: "4",
            name: "Fijian Design Hoodie",
            description: "Unisex Long Sleeve",
            price: 60.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0008.jpg",
            stock: 0,
            category: "Clothing",
        },
        {
            _id: "5",
            name: "Canada Series Design Hoodie",
            description: "Long Sleeve",
            price: 60.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0009.jpg",
            stock: 1,
            category: "Clothing",
        },
        {
            _id: "6",
            name: "Canada Series Design T-shirt",
            description: "Gildan Soft Style Short Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0010.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "7",
            name: "Fijian Design T-shirt",
            description: "Gildan Soft Style Short Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0011.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "8",
            name: "Canada Series Design Hoodie",
            description: "Long Sleeve",
            price: 60.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0012.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "9",
            name: "Fijian Design T-shirt",
            description: "Gildan Soft Style Short Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0013.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "10",
            name: "Fijian Design Hoodie",
            description: "Long Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0014.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "11",
            name: "Fijian Design T-shirt",
            description: "Gildan Soft Style Short Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0015.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "12",
            name: "Fijian Design T-shirt",
            description: "Gildan Soft Style Short Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0016.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "13",
            name: "Fijian Design Hoodie",
            description: "Long Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0017.jpg",
            stock: 3,
            category: "Clothing",
        },
        {
            _id: "14",
            name: "Fijian Design T-shirt",
            description: "Gildan Soft Style Short Sleeve",
            price: 25.0,
            imageUrl: "/images/shop/clothing/IMG-20250805-WA0018.jpg",
            stock: 3,
            category: "Clothing",
        },
    ];

    switch (sort) {
        case "price-asc":
            return [...baseProducts].sort((a, b) => a.price - b.price);
        case "price-desc":
            return [...baseProducts].sort((a, b) => b.price - a.price);
        default:
            return baseProducts;
    }
}
