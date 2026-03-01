import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import "katex/dist/katex.min.css"; // Required for math equations to render properly
import { ProductGallery } from "@/components/product/ProductGallery";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getProductSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx?$/, "") }));
}

// Custom components passed to MDX
const components = {
  h2: (props: any) => <h2 className="font-serif text-3xl mt-12 mb-4 font-normal text-white" {...props} />,
  h3: (props: any) => <h3 className="font-serif text-2xl mt-8 mb-3 font-medium text-white/90" {...props} />,
  p: (props: any) => <p className="mb-5 leading-relaxed text-white/70 font-light" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-5 text-white/70 font-light space-y-2" {...props} />,
  strong: (props: any) => <strong className="text-white font-medium" {...props} />,
  pre: CodeBlock, // Maps the Shiki output to our interactive component
};


export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.frontmatter.title} | Rafif Muchsin`,
    description: product.frontmatter.description,
    openGraph: {
      title: product.frontmatter.title,
      description: product.frontmatter.description,
      images: [product.frontmatter.images[0] || "/og.png"],
    },
  };
}

export default async function ProductPage({ 
    params 
  }: { 
    params: Promise<{ slug: string }> // Update the type to Promise
  }) {
  const { slug } = await params;
  if (!slug) {
    return notFound();
  }
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  const { frontmatter, content } = product;

  return (
    <div className="min-h-screen w-full relative z-20 bg-black text-white selection:bg-white selection:text-black">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
      <Navbar />

      <main className="relative z-20 w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-8 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Client-side Interactive Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={frontmatter.images} />
          </div>

          {/* Right Column: Content & Markdown */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-6 flex flex-col items-start lg:items-center lg:flex-row gap-3 sm:gap-4">
              <span className="bg-white/10 text-white px-3 py-1 text-[10px] uppercase tracking-widest rounded-full border border-white/10">
                {frontmatter.category}
              </span>
              <span className="text-white/40 text-xs tracking-widest">
                {frontmatter.date || "Updated Recently"}
              </span>
            </div>

            <h1 className="text-[2rem] md:text-4xl font-medium tracking-tight mb-6 leading-[1.1]">
              {frontmatter.title}
            </h1>

            <p className="font-medium text-white leading-relaxed mb-8 sm:text-wrap md:text-balance lg:text-wrap">
              {frontmatter.description}
            </p>

            {/* Pricing / Checkout Card */}
            <div className="relative rounded-3xl p-8 border border-white/10 bg-linear-to-b from-white/8 to-white/2 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] mb-8">
              <div className="flex flex-col sm:gap-4 md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">One-Time Fee</span>
                  <span className="text-4xl font-mono tracking-tight text-white">${frontmatter.price}</span>
                </div>
                <Link href="#" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black text-sm font-medium tracking-wide text-balance transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                  Checkout Page
                  <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></span>
                </Link>
              </div>
            </div>

            {/* Markdown Rendered Content */}
            <div className="mt-4 pt-2 border-t border-white/10">
              <MDXRemote 
                source={content} 
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkMath],
                    rehypePlugins: [
                      rehypeKatex,
                      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }]
                    ],
                  }
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}