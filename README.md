# IBI Stations - Irish Radio Streaming App

A modern, sleek Irish radio streaming web application featuring authentic radio station branding and real-time audio streaming.

## Features

- 🎵 Stream live Irish radio stations
- 📱 Responsive design for mobile and desktop
- 🎨 Glass-effect UI with authentic station logos
- 🔍 Search and filter stations by genre
- ❤️ Favorite stations (future feature)
- 🎛️ Volume controls and audio visualization

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query

## Deployment to Vercel via GitHub

### Prerequisites

1. GitHub account
2. Vercel account connected to GitHub
3. This project pushed to a GitHub repository

### Step-by-Step Deployment

1. **Download and Push to GitHub**:
   - Download the latest project files from Replit
   - Extract and navigate to the project folder
   ```bash
   git init
   git add .
   git commit -m "IBI Stations - Irish Radio Streaming App"
   git branch -M main
   git remote add origin https://github.com/yourusername/ibi-stations.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will detect the `vercel.json` configuration automatically
   - The build will use the serverless API functions in the `/api` folder
   - Click "Deploy"

3. **Configuration Details**:
   - Frontend builds to `dist/public` using Vite
   - API endpoints are serverless functions in `/api` folder
   - No additional environment variables needed for basic functionality
   - CORS headers are configured for cross-origin requests

### Configuration Files

- `vercel.json` - Vercel deployment configuration
- `package.json` - Build scripts and dependencies
- `vite.config.ts` - Frontend build configuration

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and configurations
│   │   └── pages/       # Page components
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage layer
├── shared/          # Shared types and schemas
└── vercel.json      # Vercel deployment config
```

## Audio Streaming

The app uses HTML5 audio elements to stream live radio. Some streams may require specific CORS headers or may not be available for web playback due to licensing restrictions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License