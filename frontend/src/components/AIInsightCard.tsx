import { Brain, AlertCircle, Lightbulb } from 'lucide-react';
import { AIInsight } from '../types';

interface AIInsightCardProps {
  insight: AIInsight;
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  const icons = {
    prediction: Brain,
    recommendation: Lightbulb,
    alert: AlertCircle
  };

  const colors = {
    prediction: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-blue-400',
    recommendation: 'from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-400',
    alert: 'from-orange-500/20 to-red-500/20 border-orange-500/50 text-orange-400'
  };

  const Icon = icons[insight.type];

  return (
    <div className={`bg-gradient-to-br ${colors[insight.type]} backdrop-blur-xl border rounded-xl p-4 hover:scale-[1.02] transition-all`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-slate-900/50 rounded-lg">
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-white">{insight.title}</h4>
            <span className="text-xs bg-slate-900/50 px-2 py-1 rounded-full">{insight.confidence}%</span>
          </div>
          <p className="text-sm text-slate-300 mb-2">{insight.description}</p>
          <p className="text-xs text-slate-500">{new Date(insight.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

