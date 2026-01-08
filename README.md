# Stroikefy

A SaaS platform for construction companies to manage workforce, projects, finances, documents, and inventory from a single dashboard.

## Features

- 📊 **Dashboard** - Overview of all operations with KPIs and charts
- 👷 **Workforce Management** - Employee management, time tracking, attendance
- 🏗️ **Project Management** - Task tracking, timelines, progress monitoring
- 💰 **Finance** - Invoices, expenses, budgets, financial reports
- 📦 **Inventory** - Stock tracking, ordering, material management
- 📄 **Documents** - File storage, organization, and sharing
- 🗺️ **Interactive Map** - View all construction sites on a map
- 🔐 **Role-based Access** - Control who can see and do what
- 📥 **Excel Import** - Import data from spreadsheets
- 🌙 **Dark/Light Mode** - Choose your preferred theme

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React
- **Database**: Supabase (for deployment)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy

### Supabase

1. Create a Supabase project
2. Add your Supabase URL and anon key to environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## License

MIT
