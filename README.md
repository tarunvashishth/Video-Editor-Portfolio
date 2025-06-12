# Video Editor Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Architecture Overview

This project uses the Next.js App Router with TypeScript for type safety and modularity. The main building blocks are:

- **Pages**: Located in `src/app/`, including the landing page and dynamic user profile pages.
- **API Routes**: Located in `src/app/api/`, for handling portfolio submission and saving.
- **Components**: Modular, reusable UI components in `src/components/` (e.g., `EmployerCard`, `VideoCard`, `Notification`).
- **Types**: All data models are defined in `src/types/portfolio.ts`.
- **Mock Data**: Used for demonstration, found in `src/data/mockPortfolio.ts`.

The UI is styled with Tailwind CSS and uses the Geist font for a modern look. Form validation is handled with `react-hook-form` and `zod`. The codebase is structured for easy extension to real data sources and AI-powered features.
