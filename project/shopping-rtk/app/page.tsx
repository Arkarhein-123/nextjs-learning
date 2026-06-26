// app/page.tsx
import { productService } from "@/features/product/productService";
import HomeClient from "./HomeClient";

export default async function Page() {
    // Fetch data on the server
    const products = await productService.getProducts();

    return <HomeClient products={products} />;
}
