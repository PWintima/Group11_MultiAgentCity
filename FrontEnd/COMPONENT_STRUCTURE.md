# Smart City Command Center - Component Structure

## Overview

This frontend is a React-based dashboard for managing a Multi-Agent Smart City Management System.

## Component Hierarchy

```
App.tsx
├── Header.tsx                 # Top navigation with branding and user info
├── CityMap.tsx               # Interactive city map with traffic indicators
├── RequestQueue.tsx          # Priority-based request queue management
├── SystemLog.tsx             # Real-time system event logs
├── AgentCard.tsx (x4)        # Individual agent monitoring cards
│   ├── Traffic Agent
│   ├── Energy Agent
│   ├── Environment Agent
│   └── Public Transit Agent
└── ControlPanel.tsx          # System control toggles and manual overrides
```

## Component Details

### 1. Header Component (`/src/app/components/Header.tsx`)
**Purpose:** Displays application branding, current time, and user information

**Features:**
- Application title and subtitle
- Real-time clock display
- User profile with admin badge
- Settings icon

**Props:** None (self-contained)

### 2. CityMap Component (`/src/app/components/CityMap.tsx`)
**Purpose:** Visual representation of city traffic and congestion

**Features:**
- City map visualization with overlay
- Traffic indicator markers (green = low, red = high congestion)
- Zoom controls (+/-)
- Legend showing congestion levels

**Customization:**
- Replace map image in `figma:asset/...` import
- Adjust indicator positions in the component
- Add more indicators by duplicating the circle div elements

### 3. AgentCard Component (`/src/app/components/AgentCard.tsx`)
**Purpose:** Reusable card for displaying individual agent metrics

**Props:**
```typescript
{
  type: 'traffic' | 'energy' | 'environment' | 'transit';
  title: string;              // Agent name
  metric: string;             // Metric label (e.g., "Vehicle count")
  value: string | number;     // Current value
  status?: string;            // Alert status
  statusLabel?: string;       // Status badge text
  chartData: Array<{value: number}>; // Time series data
  chartColor: string;         // Chart line color (hex)
}
```

**Features:**
- Icon-based identification
- Real-time metric display
- Status badges with color coding
- Area chart visualization
- Expandable/collapsible (UI only)

### 4. RequestQueue Component (`/src/app/components/RequestQueue.tsx`)
**Purpose:** Displays pending system requests with priority levels

**Features:**
- Priority-based list
- Approval status badges
- Queue size indicator
- Real-time queue updates

**Data Structure:**
```typescript
{
  title: string;
  priority: number;  // 1-10 scale
  status: 'approve' | 'pending';
}
```

### 5. SystemLog Component (`/src/app/components/SystemLog.tsx`)
**Purpose:** Real-time event log display

**Features:**
- Timestamped entries
- Agent attribution
- Color-coded message types (info, warning, success)
- Priority indicators
- Live status indicator
- Custom scrollbar styling
- Auto-scroll to latest entries (can be implemented)

**Log Entry Structure:**
```typescript
{
  time: string;        // HH:MM:SS format
  agent: string;       // Agent name
  message: string;     // Log message
  type: 'info' | 'warning' | 'success';
  priority?: number;   // Optional priority level
}
```

### 6. ControlPanel Component (`/src/app/components/ControlPanel.tsx`)
**Purpose:** System-wide control switches and overrides

**Features:**
- Toggle switches for automated controls:
  - Priority Thresholds
  - Automatic Load Balancing
- Manual Override section
- Override action button
- External Libraries indicator

**Integration:**
Connect switches to your backend using:
```typescript
<Switch 
  defaultChecked 
  onCheckedChange={(checked) => {
    // Call API to update backend
    api.post('/controls/priority-thresholds', { enabled: checked });
  }}
/>
```

## Layout Structure

The dashboard uses a CSS Grid layout (12 columns):

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
├──────────────┬──────────────┬──────────────────┤
│              │              │   Agent Card 1    │
│   City Map   │              ├──────────────────┤
│   (col 5)    │  System Log  │   Agent Card 2    │
│              │   (col 4)    ├──────────────────┤
├──────────────┤              │   Agent Card 3    │
│ Request      │              ├──────────────────┤
│ Queue        │              │   Mini Cards      │
│              │              ├──────────────────┤
│              │              │  Control Panel    │
└──────────────┴──────────────┴──────────────────┘
```

## Styling System

### Color Scheme
- **Background:** Dark gray gradient (`from-gray-950 via-gray-900 to-gray-950`)
- **Cards:** Semi-transparent (`bg-gray-900/50`) with backdrop blur
- **Borders:** `border-gray-800`
- **Text:** 
  - Primary: `text-white`
  - Secondary: `text-gray-300`
  - Tertiary: `text-gray-400`

### Status Colors
- **Success/Good:** Green (`text-green-400`, `bg-green-500/20`)
- **Warning:** Yellow (`text-yellow-400`, `bg-yellow-500/20`)
- **Error/Congestion:** Red (`text-red-400`, `bg-red-500/20`)

### Charts
Uses Recharts library with:
- Area charts with gradient fills
- Responsive containers
- Smooth animations (can be toggled)
- Custom colors per agent

## Mock Data Generators

Located in `/src/app/App.tsx`:

1. **generateTrendingUpData:** Creates upward trending data
2. **generateVolatileData:** Creates variable/oscillating data
3. **generateSteadyData:** Creates relatively stable data

## Responsive Design

Current implementation is optimized for desktop (1920x1080+). For responsive design:

1. Adjust grid columns for smaller screens:
```typescript
className="grid grid-cols-1 lg:grid-cols-12 gap-4"
```

2. Stack components vertically on mobile:
```typescript
className="col-span-1 lg:col-span-5"
```

3. Consider using the `useMediaQuery` hook from `/src/app/components/ui/use-mobile.ts`

## Performance Considerations

- Charts use `isAnimationActive={false}` for better performance
- Mock data generators create limited data points (30)
- Consider implementing virtualization for long logs
- Use React.memo() for frequently re-rendering components
- Implement debouncing for real-time data updates

## Customization Guide

### Changing Agent Icons
Edit the `icons` object in `AgentCard.tsx`:
```typescript
const icons = {
  traffic: Car,  // Replace with any lucide-react icon
  energy: Zap,
  ...
};
```

### Adding New Agents
1. Add agent type to AgentCard props
2. Add icon to icons object
3. Create new AgentCard instance in App.tsx
4. Update backend integration to include new agent data

### Modifying Chart Appearance
In `AgentCard.tsx`, adjust:
- `strokeWidth` for line thickness
- Gradient stops for fill opacity
- Chart height in the container div
- Add grid lines or tooltips from Recharts

## Accessibility Features

Current implementation includes:
- Semantic HTML structure
- Hover states for interactive elements
- Color contrast ratios meeting WCAG AA
- Icon + text labels for clarity

**To Improve:**
- Add ARIA labels to interactive elements
- Implement keyboard navigation
- Add screen reader announcements for live updates
- Ensure all charts have accessible alternatives

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses modern CSS features:
- CSS Grid
- Backdrop filters
- Custom properties (CSS variables)
