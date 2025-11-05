# Smart City Frontend

React + TypeScript frontend application for the Smart City management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### API Configuration

The frontend is configured to connect to the backend API Gateway at `http://localhost:8080/api`.

The proxy is configured in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

### Backend Connection

Make sure the backend services are running:
- API Gateway: `http://localhost:8080`
- Eureka Server: `http://localhost:8761`

See the [backend repository](../README.md) for setup instructions.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   ├── contexts/          # React contexts (Auth, Theme)
│   ├── pages/            # Page components
│   ├── types/            # TypeScript types
│   ├── data/             # Mock data
│   └── App.tsx           # Main app component
├── package.json
├── vite.config.ts
└── README.md
```

## 🎨 Features

- **Dashboard** - Real-time city operations overview
- **Map View** - Interactive city map with markers
- **CCTV Monitoring** - Camera feed management
- **Incident Management** - Track and resolve incidents
- **Analytics** - Data visualization and insights
- **Settings** - User preferences and configuration

## 🔌 API Integration

The frontend connects to these backend endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/dashboard` - Dashboard data
- `GET /api/sensors` - Sensor data
- `GET /api/cameras` - Camera feeds
- `POST /api/events/ingest` - Event ingestion
- And more...

All API calls go through the API Gateway at `http://localhost:8080/api`

## 🛠️ Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 📦 Dependencies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🔗 Backend Repository

The backend microservices are in the parent directory:
- Backend API Gateway: `http://localhost:8080`
- See `../README.md` for backend API documentation

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploy to Static Hosting

You can deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **AWS S3**: Upload `dist/` folder
- **Any static hosting service**

### Environment Variables

Create a `.env` file for production:

```env
VITE_API_BASE_URL=https://your-api-gateway-url.com/api
```

Then update `vite.config.ts` to use the environment variable.

## 📝 Notes

- The frontend uses mock data in `src/data/mockData.ts` for development
- Replace with actual API calls to connect to the backend
- CORS is configured in the backend API Gateway
- Authentication is handled via JWT tokens

## 📄 License

Part of hackathon submission.

