/**
 * Utility functions for formatting data in the Smart City Dashboard
 */

import { DATE_FORMATS } from '../config/constants';

// ==================== Number Formatting ====================

/**
 * Format large numbers with commas (e.g., 1234567 -> 1,234,567)
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Format number as percentage (e.g., 0.68 -> 68%)
 */
export const formatPercentage = (num: number, decimals: number = 0): string => {
  return `${(num * 100).toFixed(decimals)}%`;
};

/**
 * Format number with unit suffix (e.g., 1500 -> 1.5K, 2500000 -> 2.5M)
 */
export const formatNumberWithSuffix = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Format bytes to human readable size (e.g., 1024 -> 1 KB)
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

// ==================== Date/Time Formatting ====================

/**
 * Format timestamp to time string (e.g., "14:30:45")
 */
export const formatTime = (date: Date | string, format: '12h' | '24h' = '24h'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const options = format === '12h' ? DATE_FORMATS.TIME_12H : DATE_FORMATS.TIME_24H;
  return dateObj.toLocaleTimeString('en-US', options);
};

/**
 * Format date to readable string (e.g., "Monday, March 19, 2026")
 */
export const formatDate = (date: Date | string, format: 'full' | 'short' = 'full'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const options = format === 'full' ? DATE_FORMATS.DATE_FULL : DATE_FORMATS.DATE_SHORT;
  return dateObj.toLocaleDateString('en-US', options);
};

/**
 * Format relative time (e.g., "2 minutes ago", "just now")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return formatDate(dateObj, 'short');
};

/**
 * Format duration in seconds to readable string (e.g., "2h 30m")
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};

// ==================== Status Formatting ====================

/**
 * Get status label based on value and thresholds
 */
export const getTrafficStatus = (vehicleCount: number): string => {
  if (vehicleCount < 500) return 'Low';
  if (vehicleCount < 1000) return 'Moderate';
  if (vehicleCount < 1500) return 'High';
  return 'Congestion';
};

export const getEnergyStatus = (loadPercentage: number): string => {
  if (loadPercentage < 40) return 'Low';
  if (loadPercentage < 70) return 'Normal';
  if (loadPercentage < 85) return 'High';
  return 'Critical';
};

export const getAirQualityStatus = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const getTransitStatus = (delayMinutes: number): string => {
  if (delayMinutes < 5) return 'On Time';
  if (delayMinutes < 10) return 'Minor Delay';
  if (delayMinutes < 20) return 'Delayed';
  return 'Major Delay';
};

// ==================== Priority Formatting ====================

/**
 * Get priority label and color based on priority number
 */
export const formatPriority = (priority: number): { label: string; color: string } => {
  if (priority >= 8) return { label: 'Critical', color: 'text-red-400' };
  if (priority >= 6) return { label: 'High', color: 'text-orange-400' };
  if (priority >= 4) return { label: 'Medium', color: 'text-yellow-400' };
  return { label: 'Low', color: 'text-green-400' };
};

// ==================== Chart Data Formatting ====================

/**
 * Transform API data to chart format
 */
export interface ChartDataPoint {
  value: number;
  timestamp?: string;
  label?: string;
}

export const transformToChartData = (
  data: Array<{ value: number; timestamp: string }>,
  maxPoints: number = 30
): ChartDataPoint[] => {
  // Take last N points
  const sliced = data.slice(-maxPoints);
  
  return sliced.map((point) => ({
    value: point.value,
    timestamp: point.timestamp,
  }));
};

/**
 * Calculate moving average for smoothing chart data
 */
export const calculateMovingAverage = (
  data: ChartDataPoint[],
  windowSize: number = 3
): ChartDataPoint[] => {
  return data.map((_, index, array) => {
    const start = Math.max(0, index - windowSize + 1);
    const window = array.slice(start, index + 1);
    const average = window.reduce((sum, point) => sum + point.value, 0) / window.length;
    
    return {
      ...array[index],
      value: Math.round(average),
    };
  });
};

// ==================== Validation Helpers ====================

/**
 * Check if a value is within valid range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// ==================== Text Formatting ====================

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

/**
 * Capitalize first letter of each word
 */
export const titleCase = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Convert snake_case to Title Case
 */
export const snakeToTitleCase = (text: string): string => {
  return text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// ==================== Color Utilities ====================

/**
 * Get color based on value and thresholds
 */
export const getColorByValue = (
  value: number,
  thresholds: { low: number; medium: number; high: number }
): string => {
  if (value < thresholds.low) return '#10b981'; // Green
  if (value < thresholds.medium) return '#f59e0b'; // Yellow
  if (value < thresholds.high) return '#fb923c'; // Orange
  return '#ef4444'; // Red
};

/**
 * Get opacity based on intensity (0-1)
 */
export const getOpacityByIntensity = (intensity: number): number => {
  return Math.max(0.1, Math.min(1, intensity));
};

// ==================== Array Utilities ====================

/**
 * Group array items by key
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Sort array by priority (descending)
 */
export const sortByPriority = <T extends { priority: number }>(array: T[]): T[] => {
  return [...array].sort((a, b) => b.priority - a.priority);
};

// ==================== Example Usage ====================

/*
import { formatNumber, formatTime, getAirQualityStatus } from './formatters';

// Number formatting
formatNumber(1245); // "1,245"
formatPercentage(0.68); // "68%"
formatNumberWithSuffix(1500000); // "1.5M"

// Time formatting
formatTime(new Date()); // "14:30:45"
formatRelativeTime(new Date(Date.now() - 300000)); // "5 minutes ago"

// Status formatting
getAirQualityStatus(165); // "Unhealthy for Sensitive Groups"
getTrafficStatus(1245); // "High"

// Chart data
transformToChartData(apiData, 30); // Convert to chart format
calculateMovingAverage(chartData, 3); // Smooth the data
*/
