import { Activity, Wind, Zap, AlertCircle } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import AIInsightCard from '../components/AIInsightCard';
import { metrics, aiInsights, incidents } from '../data/mockData';

export default function Dashboard() {
  const recentIncidents = incidents.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Command Center
        </h2>
        <p className="text-slate-400">Real-time city operations overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard metric={metrics[0]} icon={<Activity className="text-cyan-400" size={24} />} />
        <MetricCard metric={metrics[1]} icon={<Wind className="text-green-400" size={24} />} />
        <MetricCard metric={metrics[2]} icon={<Zap className="text-yellow-400" size={24} />} />
        <MetricCard metric={metrics[3]} icon={<AlertCircle className="text-red-400" size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Recent Incidents</h3>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                {incidents.filter(i => i.status !== 'resolved').length} Active
              </span>
            </div>
            <div className="space-y-3">
              {recentIncidents.map((incident) => {
                const severityColors = {
                  low: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
                  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
                  high: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
                  critical: 'bg-red-500/20 text-red-400 border-red-500/50'
                };

                const statusColors = {
                  open: 'bg-slate-700 text-slate-300',
                  'in-progress': 'bg-blue-500/20 text-blue-400',
                  resolved: 'bg-green-500/20 text-green-400'
                };

                return (
                  <div key={incident.id} className="bg-slate-800/50 border border-cyan-500/10 rounded-lg p-4 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-md border text-xs font-medium ${severityColors[incident.severity]}`}>
                          {incident.severity.toUpperCase()}
                        </span>
                        <span className="text-slate-400 text-sm">{incident.id}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[incident.status]}`}>
                        {incident.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-semibold text-white mb-1">{incident.location}</h4>
                    <p className="text-sm text-slate-400 mb-2">{incident.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{new Date(incident.timestamp).toLocaleString()}</span>
                      {incident.assignedTo && <span className="text-cyan-400">{incident.assignedTo}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">City Heat Map</h3>
            <div className="relative h-64 bg-slate-800/50 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="City Map"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                <Activity className="text-cyan-400" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight) => (
                <AIInsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

