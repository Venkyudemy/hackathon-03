import { Camera, Video, AlertCircle, Play, Pause, Maximize2 } from 'lucide-react';
import { cameraFeeds } from '../data/mockData';
import { useState } from 'react';

export default function CCTVMonitoring() {
  const [selectedCamera, setSelectedCamera] = useState<string>(cameraFeeds[0].id);
  const [recording, setRecording] = useState(false);

  const selectedFeed = cameraFeeds.find(cam => cam.id === selectedCamera);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            CCTV Monitoring
          </h2>
          <p className="text-slate-400">Live camera feeds and incident recording</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {cameraFeeds.filter(c => c.status === 'online').length} / {cameraFeeds.length} Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden">
            <div className="bg-slate-800/50 border-b border-cyan-500/20 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Camera className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedFeed?.name}</h3>
                    <p className="text-sm text-slate-400">{selectedFeed?.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <Play size={20} className="text-slate-300" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <Pause size={20} className="text-slate-300" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <Maximize2 size={20} className="text-slate-300" />
                  </button>
                  <button
                    onClick={() => setRecording(!recording)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      recording
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <Video size={18} />
                    {recording ? 'Recording' : 'Record'}
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              {selectedFeed?.status === 'online' ? (
                <>
                  <img
                    src={selectedFeed.stream}
                    alt={selectedFeed.name}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">LIVE</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <span className="text-white text-sm font-mono">{new Date().toLocaleTimeString()}</span>
                  </div>
                  {recording && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-red-500/80 backdrop-blur-sm px-3 py-2 rounded-lg animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-white text-sm font-medium">Recording</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-[500px] bg-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="text-red-400 mx-auto mb-3" size={48} />
                    <p className="text-xl font-semibold text-red-400">Camera Offline</p>
                    <p className="text-slate-400 text-sm mt-2">Unable to connect to feed</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {cameraFeeds.slice(0, 3).map((feed) => (
              <div
                key={feed.id}
                onClick={() => setSelectedCamera(feed.id)}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedCamera === feed.id
                    ? 'border-cyan-500 ring-2 ring-cyan-500/50'
                    : 'border-cyan-500/20 hover:border-cyan-500/50'
                }`}
              >
                {feed.status === 'online' ? (
                  <img src={feed.stream} alt={feed.name} className="w-full h-24 object-cover" />
                ) : (
                  <div className="w-full h-24 bg-slate-800 flex items-center justify-center">
                    <AlertCircle className="text-red-400" size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-1 left-2">
                  <p className="text-white text-xs font-medium">{feed.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">All Cameras</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {cameraFeeds.map((feed) => (
                <div
                  key={feed.id}
                  onClick={() => setSelectedCamera(feed.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedCamera === feed.id
                      ? 'bg-cyan-500/20 border-cyan-500/50'
                      : 'bg-slate-800/50 border-cyan-500/10 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Camera size={16} className="text-cyan-400" />
                      <span className="text-sm font-medium text-white">{feed.name}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        feed.status === 'online'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {feed.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{feed.location}</p>
                  {feed.incidents > 0 && (
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                      <AlertCircle size={12} />
                      {feed.incidents} incident{feed.incidents > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

