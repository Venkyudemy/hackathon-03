import { useEffect, useState } from 'react';
import { TrendingUp, Activity, Wind, Zap, AlertTriangle, Download } from 'lucide-react';
import { analyticsData as defaultAnalyticsData } from '../data/mockData';
import apiService from '../services/api';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(defaultAnalyticsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await apiService.getDashboardAnalytics();
        if (response.data) {
          const data = response.data;

          const transformSeries = (
            series: any,
            fallback: { labelKey: string; valueKey: string; data: any[] }
          ) => {
            if (!Array.isArray(series)) {
              return fallback.data;
            }
            return series
              .map((item: any) => ({
                label: item.label ?? item[fallback.labelKey],
                value:
                  typeof item.value === 'number'
                    ? item.value
                    : Number(item[fallback.valueKey] ?? 0),
              }))
              .filter((item: { label: string | undefined }) => !!item.label);
          };

          const transformed = {
            trafficFlow: transformSeries(data.trafficFlow, {
              labelKey: 'hour',
              valueKey: 'value',
              data: defaultAnalyticsData.trafficFlow.map((d) => ({
                label: d.hour,
                value: d.value,
              })),
            }).map((item) => ({
              hour: item.label,
              value: item.value,
            })),
            energyUsage: transformSeries(data.energyUsage, {
              labelKey: 'day',
              valueKey: 'value',
              data: defaultAnalyticsData.energyUsage.map((d) => ({
                label: d.day,
                value: d.value,
              })),
            }).map((item) => ({
              day: item.label,
              value: item.value,
            })),
            airQuality: transformSeries(data.airQuality, {
              labelKey: 'time',
              valueKey: 'value',
              data: defaultAnalyticsData.airQuality.map((d) => ({
                label: d.time,
                value: d.value,
              })),
            }).map((item) => ({
              time: item.label,
              value: item.value,
            })),
            incidentsByType: transformSeries(data.incidentsByType, {
              labelKey: 'type',
              valueKey: 'count',
              data: defaultAnalyticsData.incidentsByType.map((d) => ({
                label: d.type,
                value: d.count,
              })),
            }).map((item) => ({
              type: item.label,
              count: Math.round(item.value),
            })),
          };

          setAnalytics(transformed);
        }
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        // Keep using default data
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyan-400">Loading analytics data...</div>
      </div>
    );
  }

  const incidentsTotal = analytics.incidentsByType.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-slate-400">Comprehensive city metrics and insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors">
          <Download size={20} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-cyan-400" size={28} />
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-slate-300 text-sm mb-2">Avg Traffic Flow</p>
          <p className="text-3xl font-bold text-white">85%</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Wind className="text-green-400" size={28} />
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-slate-300 text-sm mb-2">Air Quality</p>
          <p className="text-3xl font-bold text-white">Good</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-500/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Zap className="text-yellow-400" size={28} />
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-slate-300 text-sm mb-2">Energy Efficiency</p>
          <p className="text-3xl font-bold text-white">92%</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="text-purple-400" size={28} />
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-slate-300 text-sm mb-2">Response Time</p>
          <p className="text-3xl font-bold text-white">4.2m</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Traffic Flow - 24 Hours</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {analytics.trafficFlow.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg transition-all hover:from-cyan-400 hover:to-blue-400 relative group" style={{ height: `${data.value}%` }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.value}%
                  </div>
                </div>
                <span className="text-xs text-slate-400">{data.hour}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Energy Usage - Weekly</h3>
          <div className="h-64 flex items-end justify-between gap-3">
            {analytics.energyUsage.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t-lg transition-all hover:from-yellow-400 hover:to-orange-400 relative group" style={{ height: `${(data.value / 3) * 100}%` }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.value} GW
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Air Quality Index</h3>
          <div className="space-y-4">
            {analytics.airQuality.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">{data.time}</span>
                  <span className="text-sm font-semibold text-white">{data.value} AQI</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      data.value < 50
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : data.value < 100
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-orange-500 to-red-500'
                    }`}
                    style={{ width: `${data.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Incidents by Type</h3>
          <div className="space-y-4">
            {analytics.incidentsByType.map((data, index) => {
              const colors = ['cyan', 'orange', 'yellow', 'purple'];
              const color = colors[index];
              const percentage = incidentsTotal ? ((data.count / incidentsTotal) * 100).toFixed(1) : '0.0';

              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{data.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">{percentage}%</span>
                      <span className="text-sm font-semibold text-white">{data.count}</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Peak Hours</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Morning Rush</span>
              <span className="text-cyan-400 font-semibold">7-9 AM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Lunch Time</span>
              <span className="text-cyan-400 font-semibold">12-2 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-300">Evening Rush</span>
              <span className="text-cyan-400 font-semibold">5-7 PM</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Resource Usage</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Water</span>
              <span className="text-green-400 font-semibold">Normal</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Electricity</span>
              <span className="text-yellow-400 font-semibold">High</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-300">Gas</span>
              <span className="text-green-400 font-semibold">Normal</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Cameras Online</span>
              <span className="text-green-400 font-semibold">98%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Sensors Active</span>
              <span className="text-green-400 font-semibold">100%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-300">Network Status</span>
              <span className="text-green-400 font-semibold">Stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

