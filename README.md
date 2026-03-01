# RMSN-WEB

A high-performance, professional intelligence platform built to reduce uncertainty in market entry. This project serves as a digital catalog for structured industry models, supply chain bottlenecks, and risk matrices designed for capital deployment in complex industries.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 (CSS-first configuration)
- **Language:** TypeScript
- **Content:** MDX (Markdown with JSX components)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Syntax Highlighting:** Shiki
- **Math Rendering:** KaTeX

## Key Features

- **Static Content Pipeline:** All intelligence reports are authored in MDX files located in the `content/products` directory, ensuring high performance and SEO optimization.
- **Glassmorphism UI:** A modern, atmospheric aesthetic utilizing backdrop blurs and subtle radial gradients.
- **Dynamic Product Routing:** Automated slug generation for products based on file system architecture.
- **Advanced Filtering:** Client-side filtering by category, price range, and search terms without page reloads.
- **Interactive Modals:** URL-driven modals for Reports, About, and Contact sections, allowing for deep-linking and state preservation.
- **Cubic-Bezier Animations:** Smooth reveal animations and custom cursor interactions for a premium user experience.

## Project Structure

- `app/`: Next.js App Router and page definitions.
- `components/`: Modular UI, Layout, and MDX-specific components.
- `content/products/`: Source MDX files for the intelligence assets.
- `lib/`: Utility functions and the MDX parsing logic.
- `public/`: Static assets including logos, videos, and global images.

## Development

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
Static Export
This project is configured for static HTML export. To generate the production build:
```

```bash
npm run build
The output will be generated in the out/ directory, which can be hosted on any static web server or CDN.
```

## Metadata and SEO

The site includes an automated sitemap (sitemap.ts) and robots configuration (robots.ts). Metadata is handled dynamically for product pages using the generateMetadata function, pulling information directly from MDX frontmatter to ensure accurate social sharing and search engine indexing.
