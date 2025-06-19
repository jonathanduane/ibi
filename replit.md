# replit.md - IBI Stations Radio Streaming Application

## Overview

IBI Stations is a modern radio streaming application that allows users to listen to Irish radio stations online. The application features a React frontend with a Node.js Express backend, using PostgreSQL for data persistence and Drizzle ORM for database operations. The app provides a sleek interface for browsing, searching, and streaming radio stations with features like favorites, audio visualization, and responsive design.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React 18 with TypeScript, using Vite as the build tool
- **Backend**: Node.js with Express server
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **React Components**: Modular component structure with TypeScript
- **UI Library**: shadcn/ui components for consistent design system
- **Styling**: Tailwind CSS with custom color variables and responsive design
- **Audio Player**: Custom audio player hook with volume controls and visualization
- **State Management**: TanStack Query for API data fetching and caching

### Backend Architecture
- **Express Server**: RESTful API endpoints for radio station management
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development
- **API Routes**: Clean API structure for stations, search, and favorites functionality

### Database Schema
- **Radio Stations Table**: Stores station information including name, frequency, stream URL, branding
- **Favorites Table**: User-station relationship for favorite stations
- **Validation**: Zod schemas for type-safe data validation

## Data Flow

1. **Station Loading**: Frontend fetches stations from `/api/stations` endpoint
2. **Audio Streaming**: Custom audio player manages HTML5 audio elements (demo mode)
3. **Search**: Real-time search filtering on station name, genre, location, and description
4. **Favorites**: User favorites stored in PostgreSQL with session management
5. **Responsive UI**: Adaptive layouts for mobile and desktop experiences

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, shadcn/ui component library
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Data Fetching**: TanStack Query for server state management
- **Utilities**: clsx for conditional classes, date-fns for date handling

### Backend Dependencies
- **Server**: Express.js for HTTP server
- **Database**: PostgreSQL with @neondatabase/serverless driver
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for schema validation

### Development Tools
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: tsx for running TypeScript server in development

## Deployment Strategy

The application is configured for deployment on Replit with:

- **Development Mode**: `npm run dev` starts both frontend and backend
- **Production Build**: `npm run build` creates optimized bundles
- **Production Server**: `npm run start` runs the production server
- **Database**: PostgreSQL module configured in Replit environment
- **Port Configuration**: Server runs on port 5000 with external port 80
- **Asset Serving**: Static assets served from dist/public directory

The deployment uses Replit's autoscale target with automatic build and run commands. The application supports both development and production environments with appropriate optimizations.

## Changelog

```
Changelog:
- June 17, 2025. Initial setup
- June 17, 2025. Updated application with authentic Irish radio station logos and original IBI background image
  - Integrated 23+ Irish radio stations with official logos from ibireland.ie
  - Updated background to use original Rectangle-118.png with overlay effect
  - Added white background containers for better logo visibility
  - Removed frequency and location badges for cleaner design
  - Removed generic taglines/descriptions per user preference
  - Expanded station database with local, music, news/talk, and Christian radio categories
  - Updated genre filtering to include Local stations category
  - Fixed type compatibility issues in storage layer
- June 17, 2025. Implemented real audio streaming functionality
  - Replaced demo mode with HTML5 audio streaming
  - Added comprehensive error handling for stream failures
  - Updated stream URLs to direct audio endpoints
  - Added audio error display in user interface
  - Fixed variable naming conflicts in home page component
  - Created Vercel deployment configuration with vercel.json
  - Added README with GitHub deployment instructions
- June 19, 2025. Fixed Vercel deployment issues with embedded station data
  - Replaced failing API calls with embedded station data in frontend
  - Simplified Vercel configuration to static-only build
  - Eliminated "Failed to load stations" error on deployed site
  - Maintained all search and filtering functionality
  - Ensured 100% reliable deployment without backend dependencies
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```