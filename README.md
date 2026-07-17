# GitScope

GitScope is a modern GitHub developer dashboard built with React and Vite. It helps users search GitHub profiles, explore repositories, compare developers, view analytics, and save favorite profiles in a polished SaaS-style interface.

The application is designed to feel fast, accessible, responsive, and production-ready while using the public GitHub REST API.

## Features

- GitHub profile search with debounced suggestions
- Recent searches stored in Local Storage
- Keyboard-friendly search experience with `Ctrl + K`, arrow navigation, `Enter`, and `Escape`
- Developer dashboard with profile metadata, statistics, and GitHub Score
- Repository explorer with search, sorting, filtering, and expandable repository details
- README preview for repositories
- Repository metadata including topics, license, language, size, default branch, issues, watchers, and last updated date
- Analytics dashboard with charts for languages, stars, forks, repository size, and activity timeline
- Developer comparison page with side-by-side profile and metric comparison
- Favorite developers saved in Local Storage
- Toast notifications for key user actions
- Dark mode support
- Responsive layout for desktop, tablet, and mobile
- Lazy-loaded pages and code-split analytics components
- Skeleton loading states, empty states, and accessible error handling

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Recharts
- Axios
- Lucide React
- Oxlint

## Getting Started

### Prerequisites

Make sure you have Node.js installed.

Recommended:

- Node.js 20 or later
- npm 10 or later

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

### Environment Variables

The project uses the following environment variables:

```env
VITE_API_BASE_URL=https://api.github.com
VITE_GITHUB_TOKEN=
```

`VITE_GITHUB_TOKEN` is optional, but recommended. Without a token, GitHub API requests are subject to stricter public rate limits.

To create a token:

1. Open GitHub Developer Settings.
2. Generate a fine-grained or classic personal access token.
3. Add it to `.env` as `VITE_GITHUB_TOKEN`.

Do not commit your `.env` file.

## Development

Start the development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  assets/          Static assets
  components/      Reusable UI and feature components
    charts/        Analytics chart components
    common/        Shared primitives such as buttons, cards, search, toasts
    compare/       Developer comparison components
    dashboard/     Profile dashboard components
    landing/       Landing page visuals
    layout/        App shell, navigation, and footer
    repository/    Repository list, filters, cards, and details
  constants/       Routes, labels, configuration, and static constants
  context/         Theme, favorites, and toast providers
  hooks/           Reusable React hooks
  pages/           Route-level pages
  routes/          Application routing
  services/        GitHub API client and service functions
  utils/           Formatting, analytics, errors, and helper utilities
```

## Main Pages

### Home

The landing page includes developer search, recent searches, keyboard navigation, and search suggestions.

### Dashboard

Displays a GitHub user's profile, statistics, favorite action, copy profile link action, and GitHub Score.

### Repositories

Provides repository search, sorting, filtering, expandable repository details, and README previews.

### Analytics

Visualizes repository data using charts for languages, stars, forks, repository size, and creation timeline.

### Compare

Compares two GitHub developers using profile data and repository-derived metrics.

### Favorites

Shows saved developers from Local Storage and allows users to remove them.

## GitHub Score

GitScope calculates a compact GitHub Score out of 100 using:

- Followers
- Public repositories
- Total stars
- Total forks
- Account age

The score is intended as a quick profile quality indicator, not an official GitHub metric.

## Performance Notes

The application includes several performance-focused improvements:

- Route-level lazy loading
- Code-split analytics dashboard
- Memoized chart calculations
- Memoized repeated UI components
- Debounced search requests
- Abortable API requests
- README previews fetched only when repository details are expanded
- Local Storage for favorites and recent searches

## Accessibility

GitScope includes:

- Semantic page structure
- Keyboard-accessible search suggestions
- Visible focus states
- ARIA labels for interactive controls
- Skip-to-content navigation
- Accessible loading, empty, and error states
- Sufficient color contrast across light and dark themes

## API Usage

GitScope uses the GitHub REST API. The app requests:

- User search results
- User profile details
- Public repositories
- Repository README content

Unauthenticated GitHub API usage is rate limited. Add `VITE_GITHUB_TOKEN` to improve reliability during development.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint checks |

## Deployment

The app can be deployed to any static hosting provider that supports Vite builds, such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

Build output is generated in:

```text
dist/
```

## License

This project is intended for portfolio and educational use. Add a license file if you plan to distribute or open-source it.

