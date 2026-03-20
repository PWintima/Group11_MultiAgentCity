# Smart City Command Center - Frontend

A comprehensive, production-ready frontend for Multi-Agent Smart City Management Systems built with React, TypeScript, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/1200x600/1a1a2e/ffffff?text=Smart+City+Command+Center)

## ✨ Features

- 🎨 **Modern Dark UI** - Professional glassmorphism design
- 📊 **Real-time Monitoring** - Live agent data with interactive charts
- 🗺️ **City Visualization** - Interactive map with traffic indicators
- 📝 **System Logs** - Real-time event logging with color-coding
- ⚡ **Priority Queue** - Task management with priority levels
- 🎛️ **Control Panel** - System toggles and manual overrides
- 🔄 **Live Updates** - WebSocket support for real-time data
- 📱 **Responsive Design** - Optimized for desktop displays
- 🚀 **Performance** - Optimized rendering and data updates

## 🏗️ Architecture

### Tech Stack

- **Framework**: React 18.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Animations**: Motion (Framer Motion)
- **Build Tool**: Vite

### Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main application
│   ├── components/             # React components
│   │   ├── Header.tsx
│   │   ├── AgentCard.tsx
│   │   ├── CityMap.tsx
│   │   ├── RequestQueue.tsx
│   │   ├── SystemLog.tsx
│   │   ├── ControlPanel.tsx
│   │   └── ui/                 # Reusable UI components
│   ├── config/                 # Configuration files
│   │   └── constants.ts
│   ├── utils/                  # Utility functions
│   │   └── formatters.ts
│   ├── hooks/                  # Custom React hooks
│   │   └── useRealtimeData.ts
│   ├── services/               # API services
│   │   └── api.ts
│   └── data/                   # Mock data
│       └── mockData.ts
└── styles/                     # Global styles
    ├── theme.css
    └── tailwind.css
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ or higher
- npm or pnpm package manager

### Installation

1. **Clone or navigate to the project:**
```bash
cd your-project-directory
```

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

3. **Start development server:**
```bash
npm run dev
# or
pnpm dev
```

4. **Open browser:**
Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
pnpm build
```

Output will be in the `dist/` directory.

## 🔌 Backend Integration

### Quick Setup

1. **Create environment file (.env):**
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

2. **Install axios:**
```bash
npm install axios
```

3. **Rename API service:**
```bash
mv src/app/services/api.ts src/app/services/api.ts
```

4. **Update API service with your endpoints**

See detailed integration guide in `/INTEGRATION_EXAMPLE.md`

## 📚 Documentation

- **[Quick Start Guide](./QUICKSTART.md)** - Get up and running fast
- **[API Integration](./API_INTEGRATION.md)** - Connect to your backend
- **[Component Structure](./COMPONENT_STRUCTURE.md)** - Understand the architecture
- **[Integration Examples](./INTEGRATION_EXAMPLE.md)** - Complete code examples

## 🎨 Customization

### Changing Colors

Edit `/src/app/config/constants.ts`:
```typescript
export const CHART_CONFIG = {
  COLORS: {
    traffic: '#ef4444',      // Change to your preferred color
    energy: '#f59e0b',
    environment: '#10b981',
    transit: '#3b82f6',
  },
};
```

### Adding New Agents

1. Update agent types in `AgentCard.tsx`
2. Add new agent card in `App.tsx`
3. Configure backend endpoint for new agent
4. Update constants and formatters

### Modifying Layout

The dashboard uses CSS Grid (12 columns). Adjust in `App.tsx`:
```typescript
// Current: 5-4-3 column split
<div className="col-span-5">Map</div>
<div className="col-span-4">Logs</div>
<div className="col-span-3">Agents</div>

// Example: Equal split
<div className="col-span-4">Map</div>
<div className="col-span-4">Logs</div>
<div className="col-span-4">Agents</div>
```

## 🎯 Key Components

### AgentCard
Displays real-time metrics for individual agents with charts.

```typescript
<AgentCard
  type="traffic"
  title="Traffic Agent"
  metric="Vehicle count"
  value="1,245"
  status="congestion"
  statusLabel="Congestion"
  chartData={[...]}
  chartColor="#ef4444"
/>
```

### SystemLog
Real-time event logging with WebSocket support.

Features:
- Color-coded log types (info, warning, success)
- Priority indicators
- Live connection status
- Custom scrollbar

### ControlPanel
System controls with backend integration.

Features:
- Toggle switches for automated controls
- Manual override button
- Real-time state management

## 🔧 Configuration

### Chart Settings

Edit chart behavior in `constants.ts`:
```typescript
export const CHART_CONFIG = {
  DATA_POINTS: 30,          // Number of points to display
  UPDATE_INTERVAL: 3000,    // Update frequency (ms)
  ANIMATION_DURATION: 300,  // Animation speed (ms)
};
```

### API Settings

Configure API behavior:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  TIMEOUT: 10000,           // Request timeout (ms)
  RETRY_ATTEMPTS: 3,        // Retry failed requests
  POLLING_INTERVAL: 5000,   // Data polling interval (ms)
};
```

## 🐛 Troubleshooting

### Charts Not Rendering
- Verify recharts is installed
- Check data format matches `{ value: number }[]`
- Inspect browser console for errors

### CORS Errors
Add CORS middleware to your backend:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### WebSocket Connection Failed
- Verify backend WebSocket is running
- Check `VITE_WS_URL` environment variable
- Ensure no firewall blocking WebSocket

### High Memory Usage
- Reduce `DATA_POINTS` in chart config
- Implement data windowing for logs
- Clear old data periodically

## 📊 Performance

### Optimization Tips

1. **Lazy load components:**
```typescript
const CityMap = lazy(() => import('./components/CityMap'));
```

2. **Memoize expensive calculations:**
```typescript
const chartData = useMemo(() => transformData(rawData), [rawData]);
```

3. **Debounce real-time updates:**
```typescript
const debouncedUpdate = useDebounce(updateData, 300);
```

4. **Use React.memo for static components:**
```typescript
export const Header = React.memo(HeaderComponent);
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t smart-city-frontend .
docker run -p 80:80 smart-city-frontend
```

### Static Hosting

Build and upload `dist/` folder to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

## 🔒 Security

### Best Practices

- Never commit `.env` files
- Use environment variables for API keys
- Implement authentication (JWT recommended)
- Validate all user inputs
- Sanitize data from backend
- Enable HTTPS in production
- Implement rate limiting

## 🤝 Contributing

This is a custom-built frontend for your Python backend. To extend:

1. Follow the existing component structure
2. Use TypeScript for type safety
3. Follow Tailwind CSS conventions
4. Document new components
5. Update relevant documentation files

## 📝 License

This project is part of your Smart City Management System.

## 🆘 Support

For issues or questions:

1. Check the documentation files
2. Review `/INTEGRATION_EXAMPLE.md` for code examples
3. Inspect browser console for errors
4. Verify backend API responses

## 🎉 Credits

Built with:
- React
- Tailwind CSS
- Recharts
- Radix UI
- Lucide Icons
- Vite

---

**Made for Smart City Management** 🏙️

