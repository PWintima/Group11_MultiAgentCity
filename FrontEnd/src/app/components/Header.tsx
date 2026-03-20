import { Eye, Settings, User } from 'lucide-react';

export function Header() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="flex items-start justify-between px-6 py-4 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Eye className="text-gray-400 w-6 h-6" />
        <div>
          <h1 className="text-xl text-white font-semibold">Smart City Command Center</h1>
          <p className="text-sm text-gray-400">Integrated Multi-Agent Smart City Management System</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Simulated Time:</span>
            <span className="text-white">{currentTime}</span>
            <span>|</span>
            <span className="text-white">{currentDate}</span>
          </div>
        </div>
        <Settings className="text-gray-400 w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700 transition-colors">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-white">Admin</span>
        </div>
      </div>
    </header>
  );
}