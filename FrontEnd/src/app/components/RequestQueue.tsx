import { ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from './ui/badge';

interface QueueItem {
  title: string;
  priority: number;
  status: 'approve' | 'pending';
}

const queueItems: QueueItem[] = [
  { title: 'Traffic Congestion', priority: 7, status: 'approve' },
  { title: 'Peak Energy Load', priority: 6, status: 'approve' },
  { title: 'High Air Pollution', priority: 5, status: 'approve' },
];

const currentQueue = [
  { title: 'Traffic Congestion', status: 'approve', priority: 7 },
  { title: 'Peak Energy Load', status: 'approve', priority: 6 },
];

export function RequestQueue() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">REQUEST QUEUE</span>
          <ChevronUp className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {queueItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between px-3 py-2.5 bg-gray-800/50 rounded-md border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex-1">
              <div className="text-sm text-white">{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">Priority {item.priority}</div>
            </div>
            <Badge 
              variant="outline" 
              className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2"
            >
              {item.status === 'approve' ? 'Approve' : 'Pending'} {item.status === 'approve' ? item.priority - 3 : ''}
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Queue Size</span>
          </div>
          <div className="flex gap-2">
            <span className="text-white">8</span>
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-2">
          {currentQueue.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-gray-400">{item.title}</span>
              <div className="flex gap-2">
                <Badge 
                  variant="outline" 
                  className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs h-5 px-2"
                >
                  Priority {item.priority}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="bg-green-500/20 text-green-400 border-green-500/30 text-xs h-5 px-2"
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
