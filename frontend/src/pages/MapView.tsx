import { MapPin, Camera, AlertTriangle, Wind, Navigation } from 'lucide-react';
import { mapMarkers } from '../data/mockData';
import { useState } from 'react';

export default function MapView() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const markerIcons = {
    traffic: <AlertTriangle size={16} className="text-orange-400" />,
    pollution: <Wind size={16} className="text-yellow-400" />,
    emergency: <AlertTriangle size={16} className="text-red-400" />,
    camera: <Camera size={16} className="text-cyan-400" />
  };

  const markerColors = {
    traffic: 'bg-orange-500',
    pollution: 'bg-yellow-500',
    emergency: 'bg-red-500',
    camera: 'bg-cyan-500'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Live City Map
          </h2>
          <p className="text-slate-400">Real-time incident and sensor monitoring</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors">
          <Navigation size={20} />
          Center Map
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden h-[600px]">
            <img
              src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="City Map"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80"></div>

            {mapMarkers.map((marker, index) => {
              const randomTop = 20 + (index * 15) % 60;
              const randomLeft = 15 + (index * 20) % 70;

              return (
                <div
                  key={marker.id}
                  style={{ top: `${randomTop}%`, left: `${randomLeft}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setSelectedMarker(marker.id)}
                >
                  <div className={`${markerColors[marker.type]} w-8 h-8 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-${marker.type}-500/50 hover:scale-110 transition-transform`}>
                    {markerIcons[marker.type]}
                  </div>
                  {selectedMarker === marker.id && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-cyan-500/50 rounded-lg p-3 whitespace-nowrap z-10 animate-in fade-in slide-in-from-top-2">
                      <p className="text-sm font-semibold text-white">{marker.label}</p>
                      {marker.severity && (
                        <p className="text-xs text-slate-400 capitalize">{marker.severity} severity</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-cyan-500/20 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-slate-300">Emergency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-slate-300">Traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-slate-300">Pollution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs text-slate-300">Camera</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Active Markers</h3>
            <div className="space-y-3">
              {mapMarkers.map((marker) => (
                <div
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedMarker === marker.id
                      ? 'bg-cyan-500/20 border-cyan-500/50'
                      : 'bg-slate-800/50 border-cyan-500/10 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`${markerColors[marker.type]} w-6 h-6 rounded-full flex items-center justify-center`}>
                      {markerIcons[marker.type]}
                    </div>
                    <span className="text-sm font-medium text-white">{marker.label}</span>
                  </div>
                  <p className="text-xs text-slate-400 capitalize">{marker.type}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Total Markers</span>
                <span className="text-lg font-bold text-cyan-400">{mapMarkers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Cameras</span>
                <span className="text-lg font-bold text-cyan-400">{mapMarkers.filter(m => m.type === 'camera').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Incidents</span>
                <span className="text-lg font-bold text-orange-400">{mapMarkers.filter(m => m.type !== 'camera').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

