# Complete Integration Example

This document provides a complete, working example of how to integrate the frontend with your Python backend.

## Example: Updating App.tsx with Real Data

Here's a complete example showing how to transform the current mock-data implementation into a real API-connected version:

### Before (Current - Mock Data)

```typescript
// App.tsx (current version with mock data)
import { Header } from './components/Header';
import { AgentCard } from './components/AgentCard';

function App() {
  const trafficData = generateVolatileData(30, 50, 80);
  
  return (
    <AgentCard
      type="traffic"
      title="Traffic Agent"
      value="1,245"
      chartData={trafficData}
      chartColor="#ef4444"
    />
  );
}
```

### After (With Real API Integration)

```typescript
// App.tsx (with real API integration)
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AgentCard } from './components/AgentCard';
import { getAgentsStatus } from './services/api';
import { transformToChartData } from './utils/formatters';

interface AgentState {
  traffic: {
    vehicleCount: number;
    status: string;
    chartData: Array<{ value: number }>;
  };
  energy: {
    loadPercentage: number;
    chartData: Array<{ value: number }>;
  };
  environment: {
    airQualityIndex: number;
    status: string;
    chartData: Array<{ value: number }>;
  };
  transit: {
    averageDelay: number;
    chartData: Array<{ value: number }>;
  };
}

function App() {
  const [agentData, setAgentData] = useState<AgentState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAgentsStatus();
        
        // Transform API data to component format
        setAgentData({
          traffic: {
            vehicleCount: data.traffic.vehicleCount,
            status: data.traffic.status,
            chartData: transformToChartData(data.traffic.chartData, 30),
          },
          energy: {
            loadPercentage: data.energy.loadPercentage,
            chartData: transformToChartData(data.energy.chartData, 30),
          },
          environment: {
            airQualityIndex: data.environment.airQualityIndex,
            status: data.environment.status,
            chartData: transformToChartData(data.environment.chartData, 30),
          },
          transit: {
            averageDelay: data.transit.averageDelay,
            chartData: transformToChartData(data.transit.chartData, 30),
          },
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch agent data');
        setLoading(false);
        console.error(err);
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-white">Loading dashboard...</p>
    </div>;
  }

  if (error || !agentData) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-red-400">{error || 'No data available'}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <Header />
      
      <div className="p-6 grid grid-cols-12 gap-4 h-[calc(100vh-88px)]">
        <div className="col-span-3">
          <AgentCard
            type="traffic"
            title="Traffic Agent"
            metric="Vehicle count"
            value={agentData.traffic.vehicleCount.toLocaleString()}
            status={agentData.traffic.status as any}
            statusLabel={agentData.traffic.status}
            chartData={agentData.traffic.chartData}
            chartColor="#ef4444"
          />
        </div>
        {/* Add other agents similarly */}
      </div>
    </div>
  );
}

export default App;
```

## Example: SystemLog with WebSocket

```typescript
// SystemLog.tsx (with WebSocket integration)
import { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import { WebSocketService } from '../services/api';
import type { LogEntry } from '../services/api';

export function SystemLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsService = useRef<WebSocketService>(new WebSocketService());
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to WebSocket
    wsService.current.connect(
      (data) => {
        if (data.type === 'log_entry') {
          setLogs((prev) => [data.payload, ...prev].slice(0, 50));
          
          // Auto-scroll to top
          if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
          }
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      }
    );

    setIsConnected(true);

    // Cleanup
    return () => {
      wsService.current.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm text-gray-300">Real-Time System Log</h3>
        <div className="flex items-center gap-2">
          <Activity 
            className={`w-3 h-3 ${isConnected ? 'text-green-400 animate-pulse' : 'text-red-400'}`} 
          />
          <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
            {isConnected ? 'Live' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div 
        ref={logContainerRef}
        className="space-y-2 flex-1 overflow-auto custom-scrollbar"
      >
        {logs.length === 0 ? (
          <p className="text-gray-500 text-xs">Waiting for log entries...</p>
        ) : (
          logs.map((entry, index) => (
            <div 
              key={`${entry.time}-${index}`}
              className="flex items-start gap-3 text-xs py-2 hover:bg-gray-800/30 rounded px-2"
            >
              <span className="text-gray-500 font-mono shrink-0">{entry.time}</span>
              <div className="flex-1">
                <span className="text-gray-300 font-medium">{entry.agent}:</span>{' '}
                <span className={
                  entry.type === 'success' ? 'text-green-400' :
                  entry.type === 'warning' ? 'text-yellow-400' :
                  entry.type === 'error' ? 'text-red-400' :
                  'text-gray-400'
                }>
                  {entry.message}
                </span>
                {entry.priority && (
                  <span className="text-gray-500 ml-1">(Priority {entry.priority})</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Example: ControlPanel with Backend Integration

```typescript
// ControlPanel.tsx (with backend integration)
import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { 
  updatePriorityThresholds, 
  updateLoadBalancing, 
  triggerManualOverride 
} from '../services/api';
import { toast } from 'sonner';

export function ControlPanel() {
  const [priorityThresholds, setPriorityThresholds] = useState(true);
  const [loadBalancing, setLoadBalancing] = useState(true);
  const [isOverriding, setIsOverriding] = useState(false);

  const handlePriorityChange = async (checked: boolean) => {
    try {
      await updatePriorityThresholds(checked);
      setPriorityThresholds(checked);
      toast.success(`Priority thresholds ${checked ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update priority thresholds');
      console.error(error);
    }
  };

  const handleLoadBalancingChange = async (checked: boolean) => {
    try {
      await updateLoadBalancing(checked);
      setLoadBalancing(checked);
      toast.success(`Load balancing ${checked ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update load balancing');
      console.error(error);
    }
  };

  const handleOverride = async () => {
    setIsOverriding(true);
    try {
      await triggerManualOverride('prioritize_traffic');
      toast.success('Manual override activated');
    } catch (error) {
      toast.error('Failed to trigger override');
      console.error(error);
    } finally {
      setIsOverriding(false);
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-300">ACTIVE SYSTEM CONTROLS</span>
        <ChevronUp className="w-4 h-4 text-gray-500" />
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between px-3 py-2.5 bg-gray-800/50 rounded-md">
          <span className="text-sm text-white">Priority Thresholds</span>
          <Switch 
            checked={priorityThresholds}
            onCheckedChange={handlePriorityChange}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 bg-gray-800/50 rounded-md">
          <span className="text-sm text-white">Automatic Load Balancing</span>
          <Switch 
            checked={loadBalancing}
            onCheckedChange={handleLoadBalancingChange}
          />
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-3">
          <span className="text-xs text-gray-400">MANUAL OVERRIDE</span>
        </div>
        <div className="px-3 py-2.5 bg-gray-800/50 rounded-md mb-3">
          <span className="text-sm text-white">Prioritize Traffic Clearance</span>
        </div>
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          size="sm"
          onClick={handleOverride}
          disabled={isOverriding}
        >
          {isOverriding ? 'OVERRIDING...' : 'OVERRIDE'}
        </Button>
      </div>
    </div>
  );
}
```

## Example: Python FastAPI Backend

Here's a minimal Python backend example to get you started:

```python
# main.py
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import asyncio
import random

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data generators
def generate_chart_data(points=30):
    return [
        {
            "value": random.randint(50, 100),
            "timestamp": datetime.now().isoformat()
        }
        for _ in range(points)
    ]

@app.get("/api/agents/status")
async def get_agents_status():
    return {
        "traffic": {
            "vehicleCount": random.randint(1000, 1500),
            "status": random.choice(["normal", "congestion"]),
            "chartData": generate_chart_data()
        },
        "energy": {
            "loadPercentage": random.randint(50, 85),
            "chartData": generate_chart_data()
        },
        "environment": {
            "airQualityIndex": random.randint(100, 200),
            "status": "warning",
            "chartData": generate_chart_data()
        },
        "transit": {
            "averageDelay": random.randint(10, 25),
            "chartData": generate_chart_data()
        }
    }

@app.get("/api/logs")
async def get_logs(limit: int = 50):
    return {
        "logs": [
            {
                "time": datetime.now().strftime("%H:%M:%S"),
                "agent": "Traffic Agent",
                "message": "Congestion detected at Main & 8th St.",
                "type": "warning",
                "priority": 7
            }
        ]
    }

@app.get("/api/queue")
async def get_queue():
    return {
        "queue": [
            {
                "id": "1",
                "title": "Traffic Congestion",
                "priority": 7,
                "status": "approve",
                "timestamp": datetime.now().isoformat()
            }
        ],
        "queueSize": 8
    }

@app.post("/api/controls/priority-thresholds")
async def update_priority_thresholds(data: dict):
    enabled = data.get("enabled", False)
    print(f"Priority thresholds: {enabled}")
    return {"success": True}

@app.post("/api/controls/load-balancing")
async def update_load_balancing(data: dict):
    enabled = data.get("enabled", False)
    print(f"Load balancing: {enabled}")
    return {"success": True}

@app.post("/api/controls/override")
async def trigger_override(data: dict):
    action = data.get("action")
    print(f"Override triggered: {action}")
    return {"success": True}

# WebSocket endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    try:
        while True:
            # Send log entry every 5 seconds
            await asyncio.sleep(5)
            log_entry = {
                "type": "log_entry",
                "payload": {
                    "time": datetime.now().strftime("%H:%M:%S"),
                    "agent": random.choice(["Traffic Agent", "Energy Agent", "Coordinator"]),
                    "message": random.choice([
                        "System status updated",
                        "Processing request",
                        "Action completed"
                    ]),
                    "type": random.choice(["info", "success", "warning"])
                }
            }
            await websocket.send_json(log_entry)
            
    except Exception as e:
        print(f"WebSocket error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Running the Complete Stack

### 1. Start Backend

```bash
# Install dependencies
pip install fastapi uvicorn websockets

# Run backend
python main.py
```

Backend will run on `http://localhost:8000`

### 2. Configure Frontend

Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

### 3. Install Frontend Dependencies

```bash
npm install axios
```

### 4. Update API Service

Rename and update `src/app/services/api.ts` to `api.ts` and uncomment axios code.

### 5. Start Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Testing the Integration

1. Open browser to `http://localhost:5173`
2. Open browser DevTools (F12) > Network tab
3. You should see:
   - Initial API calls to `/api/agents/status`, `/api/logs`, `/api/queue`
   - WebSocket connection to `/ws`
   - Periodic polling requests every 5 seconds
4. Toggle switches in Control Panel - check Network tab for POST requests
5. Click Override button - should send POST to `/api/controls/override`

## Troubleshooting

### CORS Errors
- Verify `allow_origins` in backend includes your frontend URL
- Check browser console for specific CORS error

### WebSocket Not Connecting
- Ensure backend WebSocket endpoint is running
- Check `VITE_WS_URL` environment variable
- Look for WebSocket errors in browser console

### No Data Displaying
- Check Network tab for API responses
- Verify response format matches interface definitions
- Check browser console for transformation errors

### High CPU Usage
- Reduce polling interval (increase from 5000ms to 10000ms)
- Disable chart animations
- Implement data caching

## Next Steps

1. **Add Authentication**: JWT tokens, login page
2. **Error Boundaries**: Graceful error handling
3. **Data Caching**: Use React Query or SWR
4. **Optimistic Updates**: Update UI before API confirms
5. **Offline Support**: Cache data in IndexedDB
6. **Performance Monitoring**: Add analytics and error tracking
