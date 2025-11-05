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

Update the API base URL in your code:

```typescript
// In your API config file
const API_BASE_URL = 'http://localhost:8080/api';
```

### Backend Connection

Make sure the backend services are running:
- API Gateway: `http://localhost:8080`
- Eureka Server: `http://localhost:8761`

## 📁 Project Structure

```
src/
├── components/        # Reusable components
├── contexts/          # React contexts (Auth, Theme)
├── pages/            # Page components
├── types/            # TypeScript types
├── data/             # Mock data
└── App.tsx           # Main app component
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
- `GET /api/events/ingest` - Event ingestion
- And more...

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
```

## 📦 Dependencies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🔗 Backend Repository

The backend microservices are in a separate repository:
- Backend API Gateway: `http://localhost:8080`
- See backend repository for API documentation

## 📄 License

Part of hackathon submission.

