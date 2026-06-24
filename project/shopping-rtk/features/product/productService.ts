export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const PRODUCT_URL = "http://localhost:3500/products";

export const productService = {
    getProducts: async (): Promise<Product[]> => {
        try {
            const response = await fetch(PRODUCT_URL);
            if (!response.ok) throw new Error(response.statusText);
            return await response.json();
        } catch (err) {
            console.error("Failed to Fetch Products : ", err);
            return []; // replace strategy
            // throw err; // rethrow strategy
        }
    },
};
