import { getProducts } from "@/features/cart/service";
import { ProductCatalogue } from "@/features/components/product-catalogue";
import { CartSidebar } from "@/features/components/cart-sidebar";

export default async function Home() {
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 antialiased">
            {/* The Asymmetric Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen">
                {/* Left Side: Product Catalogue (Spans 3/4 columns) */}
                <main className="lg:col-span-3 overflow-y-auto">
                    <div className="h-full">
                        <ProductCatalogue products={products} />
                    </div>
                </main>

                {/* Right Side: Cart Sidebar (Spans 1/4 column) */}
                <aside className="hidden lg:block lg:col-span-1 sticky top-0 h-screen border-l border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900">
                    <CartSidebar />
                </aside>
            </div>

            {/* Mobile / Tablet Float Panel Layer (Optional overlay helper) */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                {/* Tip: You can use a floating drawer component here on mobile devices, 
                  since the CartSidebar is hidden (hidden lg:block) on screens smaller than 1024px width.
                */}
            </div>
        </div>
    );
}
