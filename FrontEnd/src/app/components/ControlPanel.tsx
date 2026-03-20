import { ChevronUp } from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

export function ControlPanel() {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">ACTIVE SYSTEM CONTROLS</span>
          <ChevronUp className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between px-3 py-2.5 bg-gray-800/50 rounded-md border border-gray-700">
          <span className="text-sm text-white">Priority Thresholds</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 bg-gray-800/50 rounded-md border border-gray-700">
          <span className="text-sm text-white">Automatic Load Balancing</span>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-3">
          <span className="text-xs text-gray-400">MANUAL OVERRIDE</span>
        </div>
        <div className="px-3 py-2.5 bg-gray-800/50 rounded-md border border-gray-700 mb-3">
          <span className="text-sm text-white">Prioritize Traffic Clearance</span>
        </div>
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          size="sm"
        >
          OVERRIDE
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-gray-700 rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" fill="currentColor" className="text-gray-400" />
              <rect x="14" y="3" width="7" height="7" fill="currentColor" className="text-gray-400" />
              <rect x="3" y="14" width="7" height="7" fill="currentColor" className="text-gray-400" />
              <rect x="14" y="14" width="7" height="7" fill="currentColor" className="text-gray-400" />
            </svg>
          </div>
          <span className="text-xs text-gray-400">External Libraries</span>
        </div>
      </div>
    </div>
  );
}