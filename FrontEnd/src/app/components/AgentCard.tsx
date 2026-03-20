import { Car, Zap, Leaf, Bus, ChevronUp, AlertCircle, Clock } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface AgentCardProps {
  type: 'traffic' | 'energy' | 'environment' | 'transit';
  title: string;
  metric: string;
  value: string | number;
  status?: 'congestion' | 'normal' | 'good' | 'warning' | 'late';
  statusLabel?: string;
  chartData: Array<{ value: number }>;
  chartColor: string;

  // 🔥 CONTROLLED PROPS (NEW)
  thresholdLabel: string;
  thresholdMin: number;
  thresholdMax: number;
  thresholdValue: number;
  onThresholdChange: (value: number) => void;
  thresholdUnit?: string;
}

export function AgentCard({
  type,
  title,
  metric,
  value,
  status,
  statusLabel,
  chartData,
  chartColor,
  thresholdLabel,
  thresholdMin,
  thresholdMax,
  thresholdValue,
  onThresholdChange,
  thresholdUnit
}: AgentCardProps) {

  const icons = {
    traffic: Car,
    energy: Zap,
    environment: Leaf,
    transit: Bus,
  };

  const Icon = icons[type];

  const statusIcons = {
    congestion: AlertCircle,
    warning: AlertCircle,
    late: Clock,
  };

  const statusColors = {
    congestion: 'bg-red-500/20 text-red-400 border-red-500/30',
    normal: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    good: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    late: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  const StatusIcon = status && statusIcons[status as keyof typeof statusIcons];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-sm text-gray-300">{title}</span>
        </div>
        <ChevronUp className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors" />
      </div>

      {/* VALUE */}
      <div className="mb-2">
        <div className="text-xs text-gray-400 mb-1">{metric}</div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl text-white font-semibold">{value}</span>

          {status && statusLabel && (
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${statusColors[status]}`}>
              {StatusIcon && <StatusIcon className="w-3 h-3" />}
              <span>{statusLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* CHART */}
      <div className="h-20 mt-3 relative w-full">
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#gradient-${type})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 FIXED SLIDER (CONNECTED TO APP) */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">{thresholdLabel}</span>
          <span className="text-sm font-semibold text-red-400">
            {thresholdValue}{thresholdUnit}
          </span>
        </div>

        <input
          type="range"
          min={thresholdMin}
          max={thresholdMax}
          value={thresholdValue}
          onChange={(e) => onThresholdChange(Number(e.target.value))}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-red"
        />
      </div>

      {/* STYLE */}
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
      `}</style>
    </div>
  );
}