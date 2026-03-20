import { CheckCircle, AlertCircle, ArrowRight, Activity } from 'lucide-react';

interface LogEntry {
  time: string;
  agent: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  priority?: number;
}

const logEntries: LogEntry[] = [
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

export function SystemLog() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm text-gray-300">Real-Time System Log</h3>
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>

      <div className="space-y-2 flex-1 overflow-auto custom-scrollbar">
        {logEntries.map((entry, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 text-xs py-2 hover:bg-gray-800/30 rounded px-2 transition-colors"
          >
            <span className="text-gray-500 font-mono shrink-0">{entry.time}</span>
            <div className="flex-1">
              <span className="text-gray-300 font-medium">{entry.agent}:</span>{' '}
              {entry.type === 'success' && (
                <CheckCircle className="inline w-3 h-3 text-green-400 mr-1" />
              )}
              {entry.type === 'warning' && entry.priority && (
                <span className="text-yellow-400 mr-1">⚠️</span>
              )}
              <span className={
                entry.type === 'success' ? 'text-green-400' :
                entry.type === 'warning' ? 'text-yellow-400' :
                'text-gray-400'
              }>
                {entry.message.includes('APPROVE') || entry.message.includes('APPROVED') ? (
                  <span className="text-green-400 font-semibold">{entry.message}</span>
                ) : entry.message.includes('→') ? (
                  <span>
                    Action: Signal timing increased - <span className="text-gray-400">1 min</span> <ArrowRight className="inline w-3 h-3 mx-1" /> <span className="text-white">3 min</span>
                  </span>
                ) : (
                  entry.message
                )}
              </span>
              {entry.priority && (
                <span className="text-gray-500 ml-1">(Priority {entry.priority})</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}