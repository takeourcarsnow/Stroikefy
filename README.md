# Stroikefy

A SaaS platform for construction companies to manage workforce, projects, finances, documents, and inventory from a single dashboard.

## Features

- 🌐 **Internationalization** - English and Lithuanian language support with easy switching
- 🗄️ **Database Integration** - Supabase backend with automatic fallback to demo data
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
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React
- **Internationalization**: Custom JSON-based i18n system

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (optional - works with demo data)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Sources

The application supports two data sources that you can switch between using the **Data Source Switcher** in the header:

### Demo Data (Default)
- **No setup required** - Works immediately
- **Static demo data** for development and testing
- **Offline capable** - No internet connection needed

### Supabase (Live Database)
- **Real PostgreSQL database** with persistent storage
- **Multi-user support** with real-time updates
- **Production ready** and scalable

## Internationalization

### Language Support
- **English** (en) - Default language
- **Lithuanian** (lt) - Complete translation coverage

### Language Switching
- Click the flag icon in the header to switch languages
- Language preference is automatically saved
- All UI elements update immediately

### Adding New Languages
1. Create a new JSON file in `src/locales/` (e.g., `fr.json`)
2. Add translations for all keys from `en.json`
3. Update the language store and switcher component

## Database Setup (Optional)

If you want to use live data instead of demo data:

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project

2. **Run the database schema**
   - Open your Supabase project's SQL editor
   - Execute the contents of `supabase/schema.sql`

3. **Seed the database**
   - Execute the contents of `supabase/seed.sql`

4. **Configure environment variables**
   - Add your Supabase credentials to `.env.local`

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (optional - app works with demo data)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: For admin operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Project Structure

```
stroikefy/
├── src/
│   ├── app/                    # Next.js app router pages
│   ├── components/            # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   │   ├── data-hooks.ts     # Combined data fetching hooks
│   │   ├── supabase-hooks.ts # Supabase-specific hooks
│   │   └── useTranslation.ts # Translation hook
│   ├── lib/                  # Utility libraries
│   ├── locales/              # Translation files
│   │   ├── en.json          # English translations
│   │   └── lt.json          # Lithuanian translations
│   ├── providers/           # Data source provider
│   ├── store/               # Zustand stores
│   ├── types/               # TypeScript definitions
│   └── data/                # Demo data fallback
├── supabase/                # Database schema and seed
│   ├── schema.sql          # Complete database schema
│   └── seed.sql            # Demo data seed
└── public/                 # Static assets
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted with Docker

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Tailwind CSS**: Utility-first styling
- **Comprehensive demo data**: Test all features without database

## API Reference

### Data Hooks

All data fetching uses custom hooks with automatic fallback:

```tsx
import { useProjects, useEmployees, useDashboardStats } from '@/hooks';

// Hooks automatically use Supabase if available, otherwise demo data
const { data: projects, isLoading } = useProjects();
const { data: stats } = useDashboardStats();
```

### Translation Hook

```tsx
import { useTranslation } from '@/hooks';

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t('dashboard.title')}</h1>;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
