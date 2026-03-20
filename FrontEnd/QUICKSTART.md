# Smart City Command Center - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Your Python backend running
- Basic knowledge of React

### Installation

The frontend is already set up with all necessary dependencies. Just run:

```bash
# If using npm
npm install

# If using pnpm (recommended)
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main application component
│   ├── components/
│   │   ├── Header.tsx             # Top navigation bar
│   │   ├── AgentCard.tsx          # Reusable agent monitoring card
│   │   ├── CityMap.tsx            # City visualization with traffic
│   │   ├── RequestQueue.tsx       # Priority request queue
│   │   ├── SystemLog.tsx          # Real-time event logs
│   │   ├── ControlPanel.tsx       # System control switches
│   │   ├── InfoTooltip.tsx        # Tooltip component
│   │   └── ui/                    # UI component library
│   ├── hooks/
│   │   └── useRealtimeData.ts     # Real-time data hook
│   ├── services/
│   │   └── api.ts         # API service template
│   └── data/
│       └── mockData.ts            # Mock data generators
├── styles/
│   ├── index.css                  # Global styles
│   ├── theme.css                  # Theme variables
│   └── tailwind.css               # Tailwind configuration
```

## 🎨 Current Features

### ✅ Implemented
- **Dashboard Layout**: 3-column responsive grid
- **Real-time Agent Monitoring**: 4 agent types with live metrics
- **Interactive Charts**: Area charts with gradients
- **System Logs**: Real-time event logging with color-coding
- **Request Queue**: Priority-based task management
- **Control Panel**: System toggles and manual overrides
- **City Map**: Visual traffic indicators
- **Dark Theme**: Professional dark UI with glassmorphism

### 🔌 Ready for Integration
All components use mock data and are ready to be connected to your Python backend.

## 🔗 Connecting to Your Backend

### Step 1: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000
```

### Step 2: Set Up API Service

1. Install axios:
```bash
npm install axios
```

2. Rename the example API file:
```bash
mv src/app/services/api.ts src/app/services/api.ts
```

3. Update the API functions in `api.ts` to use your actual endpoints

### Step 3: Update Components to Use Real Data

Example for `App.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { getAgentsStatus, AgentData } from './services/api';

function App() {
  const [agentData, setAgentData] = useState<AgentData | null>(null);

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      try {
        const data = await getAgentsStatus();
        setAgentData(data);
      } catch (error) {
        console.error('Failed to fetch agent data:', error);
      }
    };

    fetchData();
    
    // Poll every 5 seconds
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Use agentData.traffic.vehicleCount instead of hardcoded "1,245"
}
```

### Step 4: Set Up WebSocket (Optional)

For real-time updates without polling:

```typescript
import { useEffect, useState } from 'react';
import { WebSocketService } from './services/api';

function App() {
  const [wsService] = useState(() => new WebSocketService());

  useEffect(() => {
    wsService.connect((data) => {
      // Handle incoming messages
      console.log('Received:', data);
    });

    return () => wsService.disconnect();
  }, []);
}
```

## 🎯 Common Customizations

### Change Agent Colors

In `App.tsx`, update the `chartColor` prop:
```typescript
<AgentCard
  chartColor="#ef4444"  // Red for traffic
  // Change to any hex color
/>
```

### Add More Traffic Indicators

In `CityMap.tsx`, add more indicator circles:
```tsx
<div className="absolute top-[30%] left-[25%] w-10 h-10 bg-green-500/30 border-2 border-green-400 rounded-full">
  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
</div>
```

### Modify Time Format

In `Header.tsx`, change the time display:
```typescript
const currentTime = new Date().toLocaleTimeString('en-US', { 
  hour: '2-digit', 
  minute: '2-digit',
  second: '2-digit',  // Add seconds
  hour12: false        // Use 24-hour format
});
```

### Add New Agent

1. Create a new AgentCard in `App.tsx`:
```tsx
<AgentCard
  type="water"
  title="Water Management"
  metric="Water Usage"
  value="234M L"
  chartData={generateSteadyData(30, 200, 250)}
  chartColor="#06b6d4"
/>
```

2. Update AgentCard types in `AgentCard.tsx`:
```typescript
type: 'traffic' | 'energy' | 'environment' | 'transit' | 'water'
```

## 🐛 Troubleshooting

### Charts Not Displaying
- Ensure recharts is installed: `npm install recharts`
- Check browser console for errors
- Verify chartData is an array of objects with `value` property

### WebSocket Connection Failed
- Verify your backend WebSocket endpoint is running
- Check CORS settings on your backend
- Ensure WS_BASE_URL environment variable is correct

### Styling Issues
- Clear browser cache
- Restart development server
- Check Tailwind CSS is properly configured

### CORS Errors
Add CORS middleware to your Python backend:
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

## 📚 Additional Resources

- **API Integration Guide**: See `/API_INTEGRATION.md`
- **Component Documentation**: See `/COMPONENT_STRUCTURE.md`
- **Recharts Documentation**: https://recharts.org/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/icons/

## 🎨 Color Reference

```css
/* Status Colors */
Success/Good:  #10b981 (green)
Warning:       #f59e0b (yellow)
Error/Alert:   #ef4444 (red)
Info:          #3b82f6 (blue)

/* Background Colors */
Primary BG:    from-gray-950 via-gray-900 to-gray-950
Card BG:       bg-gray-900/50
Border:        border-gray-800

/* Text Colors */
Primary:       text-white
Secondary:     text-gray-300
Tertiary:      text-gray-400
Muted:         text-gray-500
```

## 🚢 Production Build

When ready to deploy:

```bash
npm run build
# or
pnpm build
```

This creates an optimized production build in the `dist/` directory.

### Deploy Options
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist` folder
- **Docker**: See below

### Docker Deployment (Example)

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

## 💡 Next Steps

1. **Connect to Backend**: Follow Step 1-4 above
2. **Add Authentication**: Implement login/logout functionality
3. **Add More Agents**: Extend with water, waste, etc.
4. **Implement Notifications**: Add toast notifications for alerts
5. **Add Historical Data**: Create time-range selectors for charts
6. **Mobile Responsive**: Add mobile breakpoints
7. **Add Tests**: Write unit tests with Jest/Vitest

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the example API service
3. Inspect browser console for errors
4. Verify backend API responses match expected format

Happy coding! 🎉
