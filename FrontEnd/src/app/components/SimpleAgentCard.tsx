import { useState } from 'react';

interface SimpleAgentCardProps {
  icon: string;
  title: string;
  metricLabel: string;
  metricValue: string | number;
  thresholdLabel: string;
  thresholdMin: number;
  thresholdMax: number;
  thresholdDefault: number;
  thresholdUnit?: string;
}

export function SimpleAgentCard({
  icon,
  title,
  metricLabel,
  metricValue,
  thresholdLabel,
  thresholdMin,
  thresholdMax,
  thresholdDefault,
  thresholdUnit = '',
}: SimpleAgentCardProps) {
  const [threshold, setThreshold] = useState(thresholdDefault);

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number(e.target.value));
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-gray-300">{title}</span>
      </div>

      {/* Metric */}
      <div className="mb-3">
        <div className="text-xs text-gray-400 mb-1">{metricLabel}</div>
        <div className="text-sm text-white font-semibold">{metricValue}</div>
      </div>

      {/* Threshold Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">{thresholdLabel}</span>
          <span className="text-xs font-semibold text-red-400">
            {threshold}
            {thresholdUnit}
          </span>
        </div>
        <input
          type="range"
          min={thresholdMin}
          max={thresholdMax}
          value={threshold}
          onChange={handleThresholdChange}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-red"
        />
      </div>

      <style>{`
        input[type="range"].slider-thumb-red::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
        
        input[type="range"].slider-thumb-red::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
