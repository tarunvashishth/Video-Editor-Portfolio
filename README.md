## Architecture Overview

This project uses the Next.js App Router with TypeScript for type safety and modularity. The main building blocks are:

- **Pages**: Located in `src/app/`, including the landing page and dynamic user profile pages.
- **API Routes**: Located in `src/app/api/`, for handling portfolio submission and saving.
- **Components**: Modular, reusable UI components in `src/components/` (e.g., `EmployerCard`, `VideoCard`, `Notification`).
- **Types**: All data models are defined in `src/types/portfolio.ts`.
- **Mock Data**: Used for demonstration, found in `src/data/mockPortfolio.ts`.

The UI is styled with Tailwind CSS and uses the Geist font for a modern look. Form validation is handled with `react-hook-form` and `zod`. The codebase is structured for easy extension to real data sources and AI-powered features.
