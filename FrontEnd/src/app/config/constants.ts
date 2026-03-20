/**
 * Application Constants
 * Centralized configuration for the Smart City Command Center
 */

// ==================== API Configuration ====================
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8000',
  TIMEOUT: 10000, // milliseconds
  RETRY_ATTEMPTS: 3,
  POLLING_INTERVAL: 5000, // milliseconds
};

// ==================== Chart Configuration ====================
export const CHART_CONFIG = {
  DATA_POINTS: 30,
  UPDATE_INTERVAL: 3000, // milliseconds
  ANIMATION_DURATION: 300,
  COLORS: {
    traffic: '#ef4444',      // Red
    energy: '#f59e0b',       // Orange/Amber
    environment: '#10b981',  // Green
    transit: '#3b82f6',      // Blue
    water: '#06b6d4',        // Cyan
    waste: '#8b5cf6',        // Purple
  },
};

// ==================== Agent Configuration ====================
export const AGENT_TYPES = {
  TRAFFIC: 'traffic',
  ENERGY: 'energy',
  ENVIRONMENT: 'environment',
  TRANSIT: 'transit',
} as const;

export const AGENT_LABELS = {
  [AGENT_TYPES.TRAFFIC]: 'Traffic Agent',
  [AGENT_TYPES.ENERGY]: 'Energy Agent',
  [AGENT_TYPES.ENVIRONMENT]: 'Environment Agent',
  [AGENT_TYPES.TRANSIT]: 'Public Transit Agent',
};

// ==================== Status Configuration ====================
export const STATUS_TYPES = {
  GOOD: 'good',
  NORMAL: 'normal',
  WARNING: 'warning',
  CRITICAL: 'critical',
  CONGESTION: 'congestion',
  LATE: 'late',
} as const;

export const STATUS_COLORS = {
  [STATUS_TYPES.GOOD]: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  [STATUS_TYPES.NORMAL]: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
  },
  [STATUS_TYPES.WARNING]: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
  },
  [STATUS_TYPES.CRITICAL]: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  [STATUS_TYPES.CONGESTION]: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  [STATUS_TYPES.LATE]: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
  },
};

// ==================== Thresholds ====================
export const THRESHOLDS = {
  TRAFFIC: {
    LOW: 500,
    MEDIUM: 1000,
    HIGH: 1500,
  },
  ENERGY: {
    LOW: 40,
    MEDIUM: 70,
    HIGH: 85,
  },
  AIR_QUALITY: {
    GOOD: 50,
    MODERATE: 100,
    UNHEALTHY: 150,
    VERY_UNHEALTHY: 200,
  },
  TRANSIT_DELAY: {
    ON_TIME: 5,
    MINOR_DELAY: 10,
    MAJOR_DELAY: 20,
  },
};

// ==================== Priority Levels ====================
export const PRIORITY_LEVELS = {
  CRITICAL: 10,
  HIGH: 7,
  MEDIUM: 5,
  LOW: 3,
  MINIMAL: 1,
};

// ==================== Log Types ====================
export const LOG_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const LOG_TYPE_COLORS = {
  [LOG_TYPES.INFO]: 'text-gray-400',
  [LOG_TYPES.WARNING]: 'text-yellow-400',
  [LOG_TYPES.SUCCESS]: 'text-green-400',
  [LOG_TYPES.ERROR]: 'text-red-400',
};

// ==================== Map Configuration ====================
export const MAP_CONFIG = {
  DEFAULT_ZOOM: 12,
  MIN_ZOOM: 8,
  MAX_ZOOM: 18,
  INDICATOR_TYPES: {
    LOW_CONGESTION: 'low_congestion',
    MEDIUM_CONGESTION: 'medium_congestion',
    HIGH_CONGESTION: 'high_congestion',
  },
  INDICATOR_COLORS: {
    low_congestion: '#10b981',    // Green
    medium_congestion: '#f59e0b', // Yellow
    high_congestion: '#ef4444',   // Red
  },
};

// ==================== UI Configuration ====================
export const UI_CONFIG = {
  TOAST_DURATION: 5000, // milliseconds
  ANIMATION_DURATION: 300, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds
  SCROLL_THRESHOLD: 100, // pixels
};

// ==================== Date/Time Formats ====================
export const DATE_FORMATS = {
  TIME_12H: {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    hour12: true,
  },
  TIME_24H: {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    second: '2-digit' as const,
    hour12: false,
  },
  DATE_FULL: {
    weekday: 'long' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    year: 'numeric' as const,
  },
  DATE_SHORT: {
    month: 'short' as const,
    day: 'numeric' as const,
    year: 'numeric' as const,
  },
};

// ==================== Feature Flags ====================
export const FEATURES = {
  ENABLE_WEBSOCKET: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_ANALYTICS: false,
  ENABLE_OFFLINE_MODE: false,
};

// ==================== System Messages ====================
export const MESSAGES = {
  ERRORS: {
    NETWORK: 'Network error. Please check your connection.',
    API_TIMEOUT: 'Request timed out. Please try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    SERVER_ERROR: 'Server error. Please try again later.',
  },
  SUCCESS: {
    SAVE: 'Changes saved successfully.',
    UPDATE: 'Updated successfully.',
    DELETE: 'Deleted successfully.',
  },
  INFO: {
    LOADING: 'Loading...',
    NO_DATA: 'No data available.',
    CONNECTING: 'Connecting to server...',
  },
};

// ==================== Validation Rules ====================
export const VALIDATION = {
  PRIORITY: {
    MIN: 1,
    MAX: 10,
  },
  VEHICLE_COUNT: {
    MIN: 0,
    MAX: 10000,
  },
  ENERGY_LOAD: {
    MIN: 0,
    MAX: 100,
  },
  AIR_QUALITY: {
    MIN: 0,
    MAX: 500,
  },
};

// ==================== Export Types ====================
export type AgentType = typeof AGENT_TYPES[keyof typeof AGENT_TYPES];
export type StatusType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];
export type LogType = typeof LOG_TYPES[keyof typeof LOG_TYPES];
