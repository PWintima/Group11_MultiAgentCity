# API Integration Guide

This document outlines how to connect this Smart City Command Center frontend to your Python backend.

## Backend Integration Points

### 1. Real-time Agent Data

**Endpoint:** `GET /api/agents/status`

**Expected Response:**
```json
{
  "traffic": {
    "vehicleCount": 1245,
    "status": "congestion",
    "chartData": [
      { "value": 65, "timestamp": "2024-04-12T12:43:00Z" },
      ...
    ]
  },
  "energy": {
    "loadPercentage": 68,
    "chartData": [...]
  },
  "environment": {
    "airQualityIndex": 165,
    "status": "warning",
    "chartData": [...]
  },
  "transit": {
    "averageDelay": 16,
    "chartData": [...]
  }
}
```

### 2. System Logs

**Endpoint:** `GET /api/logs` or WebSocket `ws://your-backend/logs`

**Expected Response:**
```json
{
  "logs": [
    {
      "time": "20:42:03",
      "agent": "Traffic Agent",
      "message": "Congestion detected at Main & 8th St.",
      "type": "warning",
      "priority": 7
    },
    ...
  ]
}
```

### 3. Request Queue

**Endpoint:** `GET /api/queue`

**Expected Response:**
```json
{
  "queue": [
    {
      "title": "Traffic Congestion",
      "priority": 7,
      "status": "approve"
    },
    ...
  ],
  "queueSize": 8
}
```

### 4. System Controls

**Endpoints:**
- `POST /api/controls/priority-thresholds` - Toggle priority thresholds
- `POST /api/controls/load-balancing` - Toggle load balancing
- `POST /api/controls/override` - Manual override with body: `{ "action": "prioritize_traffic" }`

**Request Body:**
```json
{
  "enabled": true
}
```

### 5. City Map Data

**Endpoint:** `GET /api/map/traffic-indicators`

**Expected Response:**
```json
{
  "indicators": [
    {
      "lat": 40.7128,
      "lng": -74.0060,
      "type": "low_congestion",
      "intensity": 0.3
    },
    {
      "lat": 40.7589,
      "lng": -73.9851,
      "type": "high_congestion",
      "intensity": 0.8
    }
  ]
}
```

## WebSocket Integration

For real-time updates, use WebSocket connections:

```javascript
const ws = new WebSocket('ws://your-backend:8000/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update state based on message type
  switch(data.type) {
    case 'agent_update':
      // Update agent data
      break;
    case 'log_entry':
      // Add new log entry
      break;
    case 'queue_update':
      // Update queue
      break;
  }
};
```

## Frontend Integration Steps

1. **Install axios or fetch wrapper:**
```bash
npm install axios
```

2. **Create API service file** (`/src/services/api.ts`):
```typescript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getAgentsStatus = () => api.get('/api/agents/status');
export const getLogs = () => api.get('/api/logs');
export const getQueue = () => api.get('/api/queue');
```

3. **Update components to use real data:**

In `App.tsx`, replace mock data with API calls:
```typescript
import { useEffect, useState } from 'react';
import { getAgentsStatus } from './services/api';

function App() {
  const [agentData, setAgentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAgentsStatus();
      setAgentData(response.data);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Use agentData in components
}
```

## Environment Variables

Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000/ws
```

## Authentication (if needed)

If your backend requires authentication:

```typescript
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

## CORS Configuration

Ensure your Python backend allows CORS:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
