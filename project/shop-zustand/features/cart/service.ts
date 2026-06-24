export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const PRODUCT_URL = "http://localhost:3500/products";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(PRODUCT_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}
