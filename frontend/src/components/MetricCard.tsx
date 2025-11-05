import { TrendingUp, TrendingDown } from 'lucide-react';
import { Metric } from '../types';

interface MetricCardProps {
  metric: Metric;
  icon: React.ReactNode;
}

export default function MetricCard({ metric, icon }: MetricCardProps) {
  const isPositive = metric.change > 0;
  const statusColors = {
    good: 'from-green-500/20 to-emerald-500/20 border-green-500/50',
    warning: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50',
    critical: 'from-red-500/20 to-rose-500/20 border-red-500/50'
  };

  return (
    <div className={`bg-gradient-to-br ${statusColors[metric.status]} backdrop-blur-xl border rounded-xl p-6 hover:scale-105 transition-transform`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-900/50 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(metric.change)}%
        </div>
      </div>
      <p className="text-slate-400 text-sm mb-2">{metric.label}</p>
      <p className="text-3xl font-bold text-white">{metric.value}</p>
    </div>
  );
}

