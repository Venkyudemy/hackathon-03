import { Moon, Sun, Bell, Shield, Database, Wifi, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    incidents: true,
    traffic: true,
    airQuality: false,
    system: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Settings
        </h2>
        <p className="text-slate-400">Configure your Smart City AI preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              {theme === 'dark' ? <Moon className="text-cyan-400" size={20} /> : <Sun className="text-yellow-400" size={20} />}
            </div>
            <h3 className="text-xl font-semibold text-white">Appearance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <div>
                <p className="font-medium text-white mb-1">Theme Mode</p>
                <p className="text-sm text-slate-400">Switch between light and dark mode</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <div>
                <p className="font-medium text-white mb-1">High Contrast</p>
                <p className="text-sm text-slate-400">Increase color contrast for better visibility</p>
              </div>
              <button className="relative w-14 h-8 rounded-full bg-slate-600">
                <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="font-medium text-white mb-3">Text Size</p>
              <input
                type="range"
                min="12"
                max="20"
                defaultValue="16"
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Bell className="text-cyan-400" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-white">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <div>
                <p className="font-medium text-white mb-1">Incident Alerts</p>
                <p className="text-sm text-slate-400">Get notified about new incidents</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, incidents: !notifications.incidents})}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications.incidents ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.incidents ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <div>
                <p className="font-medium text-white mb-1">Traffic Updates</p>
                <p className="text-sm text-slate-400">Receive traffic flow notifications</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, traffic: !notifications.traffic})}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications.traffic ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.traffic ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <div>
                <p className="font-medium text-white mb-1">Air Quality Warnings</p>
                <p className="text-sm text-slate-400">Alert when air quality deteriorates</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, airQuality: !notifications.airQuality})}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications.airQuality ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.airQuality ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <div>
                <p className="font-medium text-white mb-1">System Alerts</p>
                <p className="text-sm text-slate-400">Important system notifications</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, system: !notifications.system})}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications.system ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.system ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Shield className="text-cyan-400" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-white">Security</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="font-medium text-white mb-3">Two-Factor Authentication</p>
              <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors w-full">
                Enable 2FA
              </button>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="font-medium text-white mb-3">Change Password</p>
              <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors w-full">
                Update Password
              </button>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="font-medium text-white mb-1">Session Timeout</p>
              <p className="text-sm text-slate-400 mb-3">Automatically log out after inactivity</p>
              <select className="w-full px-3 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>Never</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Database className="text-cyan-400" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-white">Data & Storage</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-white">Storage Used</p>
                <span className="text-cyan-400 font-semibold">42 GB / 100 GB</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="font-medium text-white mb-3">Data Retention</p>
              <select className="w-full px-3 py-2 bg-slate-700 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50">
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
                <option>1 year</option>
              </select>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="font-medium text-white mb-3">Export Data</p>
              <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors w-full">
                Download Archive
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Wifi className="text-cyan-400" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-white">System Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="text-sm text-slate-400 mb-1">System Version</p>
              <p className="text-lg font-semibold text-white">v2.4.1</p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="text-sm text-slate-400 mb-1">Last Update</p>
              <p className="text-lg font-semibold text-white">2 days ago</p>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/10">
              <p className="text-sm text-slate-400 mb-1">API Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-lg font-semibold text-green-400">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors font-medium">
          Reset to Defaults
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-medium flex items-center gap-2">
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

