import { useState, useEffect } from 'react';

export function useRealtimeData(initialValue: number, min: number, max: number, interval: number = 5000) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(prev => {
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.max(min, Math.min(max, prev + change));
        return Math.round(newValue);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [min, max, interval]);

  return value;
}

export function useRealtimeChartData(length: number, min: number, max: number) {
  const [data, setData] = useState(() => 
    Array.from({ length }, () => ({
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), {
          value: Math.floor(Math.random() * (max - min + 1)) + min,
        }];
        return newData;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [min, max]);

  return data;
}
