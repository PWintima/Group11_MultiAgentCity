import { Activity } from 'lucide-react';

interface LogEntry {
  message: string;
}

export function SystemLog({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm h-full flex flex-col">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm text-gray-300">Real-Time System Log</h3>
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>

      {/* Logs */}
      <div className="space-y-2 flex-1 overflow-auto custom-scrollbar">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-xs">No logs yet...</p>
        ) : (
          logs.map((entry, index) => (
            <div key={index} className="text-xs text-gray-300">
              {entry.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}