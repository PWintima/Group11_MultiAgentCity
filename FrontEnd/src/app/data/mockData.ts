// Mock data for Smart City Dashboard

export interface ChartDataPoint {
  value: number;
}

export const generateChartData = (points: number, min: number, max: number): ChartDataPoint[] => {
  return Array.from({ length: points }, () => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

export const trafficData = {
  vehicleCount: 1245,
  status: 'congestion' as const,
  chartData: generateChartData(30, 50, 80),
};

export const energyData = {
  loadPercentage: 68,
  chartData: generateChartData(30, 40, 75),
};

export const environmentData = {
  airQualityIndex: 165,
  status: 'warning' as const,
  chartData: generateChartData(30, 60, 90),
};

export const transitData = {
  averageDelay: 16,
  chartData: generateChartData(30, 10, 25),
};

export interface LogEntry {
  time: string;
  agent: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  priority?: number;
}

export const systemLogs: LogEntry[] = [
  {
    time: '20:42:03',
    agent: 'Traffic Agent',
    message: 'Congestion detected at Main & 8th St.',
    type: 'warning',
    priority: 7,
  },
  {
    time: '20:42:03',
    agent: 'Coordinator',
    message: 'Checking dependencies: ENERGY',
    type: 'info',
  },
  {
    time: '20:42:03',
    agent: 'Coordinator',
    message: 'Decision: APPROVE',
    type: 'info',
  },
  {
    time: '20:42:03',
    agent: 'Traffic Agent',
    message: '📡 Received',
    type: 'info',
  },
  {
    time: '20:42:03',
    agent: 'Traffic Agent',
    message: 'Action: APPROVED',
    type: 'success',
  },
  {
    time: '20:42:03',
    agent: 'Traffic Agent',
    message: 'Action: Signal timing increased - 1 min → 3 min',
    type: 'info',
  },
];

export interface QueueItem {
  title: string;
  priority: number;
  status: 'approve' | 'pending';
}

export const requestQueue: QueueItem[] = [
  { title: 'Traffic Congestion', priority: 7, status: 'approve' },
  { title: 'Peak Energy Load', priority: 6, status: 'approve' },
  { title: 'High Air Pollution', priority: 5, status: 'approve' },
];
