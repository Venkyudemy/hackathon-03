import { AlertTriangle, CheckCircle, Clock, Filter, Search, UserCircle } from 'lucide-react';
import { incidents } from '../data/mockData';
import { useState } from 'react';
import { Incident } from '../types';

export default function IncidentManagement() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIncidents = incidents.filter(incident => {
    const matchesFilter = filter === 'all' || incident.status === filter;
    const matchesSearch = incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  const typeIcons = {
    traffic: '🚦',
    emergency: '🚨',
    pollution: '🌫️',
    infrastructure: '🏗️'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Incident Management
        </h2>
        <p className="text-slate-400">Track, assign, and resolve city incidents</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'open', 'in-progress', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-3 rounded-lg transition-all font-medium ${
                filter === status
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-slate-900/50 text-slate-400 border border-cyan-500/20 hover:border-cyan-500/30'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className={`bg-slate-900/50 backdrop-blur-xl border rounded-xl p-6 cursor-pointer transition-all ${
                selectedIncident?.id === incident.id
                  ? 'border-cyan-500/50 ring-2 ring-cyan-500/20'
                  : 'border-cyan-500/20 hover:border-cyan-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{typeIcons[incident.type]}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white">{incident.location}</h3>
                      <span className={`px-2 py-1 rounded-md border text-xs font-medium ${severityColors[incident.severity]}`}>
                        {incident.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{incident.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[incident.status]}`}>
                  {incident.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <p className="text-slate-300 mb-4">{incident.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} />
                  {new Date(incident.timestamp).toLocaleString()}
                </div>
                {incident.assignedTo && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <UserCircle size={16} />
                    {incident.assignedTo}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {selectedIncident ? (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Incident Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Incident ID</label>
                  <p className="text-white font-medium">{selectedIncident.id}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Type</label>
                  <p className="text-white font-medium capitalize">{selectedIncident.type}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Location</label>
                  <p className="text-white font-medium">{selectedIncident.location}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Coordinates</label>
                  <p className="text-white font-mono text-sm">{selectedIncident.coordinates.join(', ')}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Assign To</label>
                  <select className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50">
                    <option>Traffic Dept.</option>
                    <option>Fire Dept.</option>
                    <option>Police Dept.</option>
                    <option>Utilities</option>
                    <option>Environmental</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Status</label>
                  <select className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50">
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div className="pt-4 space-y-2">
                  <button className="w-full px-4 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors font-medium">
                    Update Incident
                  </button>
                  <button className="w-full px-4 py-3 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-colors font-medium flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
              <div className="text-center py-12">
                <AlertTriangle className="text-slate-600 mx-auto mb-3" size={48} />
                <p className="text-slate-400">Select an incident to view details</p>
              </div>
            </div>
          )}

          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Incidents</span>
                <span className="text-2xl font-bold text-white">{incidents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Open</span>
                <span className="text-xl font-bold text-orange-400">{incidents.filter(i => i.status === 'open').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">In Progress</span>
                <span className="text-xl font-bold text-blue-400">{incidents.filter(i => i.status === 'in-progress').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Resolved</span>
                <span className="text-xl font-bold text-green-400">{incidents.filter(i => i.status === 'resolved').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

