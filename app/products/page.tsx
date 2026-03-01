import { getProductSlugs, getProductBySlug } from "@/lib/mdx";
import { Navbar } from "@/components/layout/Navbar";
import { ProductListing } from "@/components/product/ProductListing";

export const metadata = {
  title: "Intelligence Catalog | Rafif Muchsin",
  description: "Browse structured market intelligence reports, risk matrices, and cost structure engines.",
};

export default function ProductsPage() {
  // Fetch data on the server - fs works here!
  const slugs = getProductSlugs();
  const allProducts = slugs.map((slug) => {
    const product = getProductBySlug(slug);
    return {
      slug: product?.slug || "",
      ...product?.frontmatter,
    };
  });

  return (
    <div className="min-h-screen w-full relative z-20">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
      <Navbar />

      <main className="relative z-20 w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-8 md:pt-36 flex flex-col">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">Intelligence Assets</h1>
          <p className="text-white/60 font-light text-lg md:text-xl max-w-2xl text-balance">
            Access structured industry models, supply chain bottlenecks, and risk matrices optimized for execution.
          </p>
        </header>

        {/* Pass the server data into the client component */}
        <ProductListing initialProducts={allProducts as any[]} />
      </main>
    </div>
  );
}