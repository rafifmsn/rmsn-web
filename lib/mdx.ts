import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/products");

export type ProductFrontmatter = {
  title: string;
  description: string;
  price: number;
  category: string;
  date: string;
  images: string[];
};

export function getProductSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export function getProductBySlug(slug: string) {
  if (!slug) return null;
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`); // Fallback to .md if needed
  
  const fallbackPath = path.join(contentDirectory, `${realSlug}.md`);
  const finalPath = fs.existsSync(fullPath) ? fullPath : fallbackPath;

  if (!fs.existsSync(finalPath)) return null;

  const fileContents = fs.readFileSync(finalPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as ProductFrontmatter,
    content,
  };
}