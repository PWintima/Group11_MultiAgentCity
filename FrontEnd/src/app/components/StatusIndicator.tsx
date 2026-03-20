interface StatusIndicatorProps {
  status: 'online' | 'warning' | 'error' | 'idle';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusIndicator({ status, label, size = 'md' }: StatusIndicatorProps) {
  const colors = {
    online: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
    idle: 'bg-gray-400',
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizes[size]} ${colors[status]} rounded-full animate-pulse`} />
      {label && <span className="text-xs text-gray-400">{label}</span>}
    </div>
  );
}
