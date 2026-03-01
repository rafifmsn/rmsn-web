"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Product {
  slug: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

export function ProductListing({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "all" || p.category === category;
      const matchesMin = minPrice ? p.price >= Number(minPrice) : true;
      const matchesMax = maxPrice ? p.price <= Number(maxPrice) : true;
      return matchesSearch && matchesCat && matchesMin && matchesMax;
    }).sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });
  }, [search, category, minPrice, maxPrice, sort, initialProducts]);

  return (
    <>
      {/* Filter UI */}
      <div className="glass-card rounded-2xl p-4 md:p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 px-1">Search</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports..." className="glass-input rounded-xl px-4 py-3 text-sm w-full" />
          </div>

          <div className="md:col-span-3 flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 px-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="glass-input glass-select rounded-xl px-4 py-3 text-sm w-full appearance-none cursor-pointer">
              <option value="all">All Categories</option>
              <option value="Model">Entry Models</option>
              <option value="Matrix">Viability Matrix</option>
              <option value="Risk">Regulatory Risk</option>
            </select>
          </div>

          <div className="md:col-span-3 flex gap-2">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 px-1">Min $</label>
              <input 
                type="number" 
                min="0" // Prevents negative values
                value={minPrice} 
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0) setMinPrice(e.target.value); // Manual check for safety
                }} 
                placeholder="0" 
                className="glass-input rounded-xl px-4 py-3 text-sm w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 px-1">Max $</label>
              <input 
                type="number" 
                min="0"
                value={maxPrice} 
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0) setMaxPrice(e.target.value);
                }} 
                placeholder="Any" 
                className="glass-input rounded-xl px-4 py-3 text-sm w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 px-1">Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="glass-input glass-select rounded-xl px-4 py-3 text-sm w-full appearance-none cursor-pointer">
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {filteredProducts.map((product) => (
          <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={product.slug}>
            <Link href={`/products/${product.slug}`} className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group hover:bg-white/10 transition-colors">
              <div className="relative aspect-video overflow-hidden bg-zinc-900">
                <img src={product.images?.[0] || "/og.png"} alt={product.title} className="w-full aspect-video object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest rounded-full border border-white/10">
                  {product.category}
                </div>
              </div>
              <div className="p-5 flex flex-col grow justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 leading-tight">{product.title}</h3>
                  <p className="text-sm text-white/60 font-light line-clamp-2 leading-relaxed">{product.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <span className="text-lg font-mono tracking-tight">${product.price}</span>
                  <span className="text-sm transition-opacity">View Details →</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}