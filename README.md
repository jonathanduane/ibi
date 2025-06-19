# IBI Stations - Irish Radio Streaming Platform

A modern web application for streaming Irish commercial radio stations, featuring authentic branding and real-time audio streaming.

## Features

- 26 authentic Irish commercial radio stations
- Real-time audio streaming with CORS handling
- Responsive design for mobile and desktop
- Search and filter functionality by genre
- Clean, minimalist interface with authentic station logos
- Audio visualization and volume controls

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query
- **Routing**: Wouter

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd ibi-stations
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect the configuration and deploy
4. Your app will be live at `https://your-app.vercel.app`

### Manual Build

```bash
npm run build
npm run start
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── pages/         # Application pages
├── server/                # Express backend
├── shared/                # Shared types and schemas
└── deployment files...
```

## Radio Stations

The application features 26 authentic Irish commercial radio stations from Independent Broadcasters of Ireland (IBI), including:

- Newstalk (News & Talk)
- Today FM (Contemporary Music)
- Beat 102 103 (Southeast Radio)
- iRadio (Northeast Radio)
- SPIN South West
- Classic Hits Radio
- And many more...

## Audio Streaming

The application uses advanced CORS handling to stream audio from Irish radio stations. Due to browser security restrictions, some streams may require direct navigation to station websites for full functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes. All radio station logos and branding are property of their respective owners.

## Support

For issues or questions, please open a GitHub issue.