import { Incident, CameraFeed, Metric, AIInsight, MapMarker } from '../types';

export const metrics: Metric[] = [
  { label: 'Traffic Flow', value: '87%', change: 5.2, status: 'good' },
  { label: 'Air Quality Index', value: '42', change: -8.1, status: 'good' },
  { label: 'Energy Usage', value: '2.4 GW', change: -3.5, status: 'good' },
  { label: 'Active Incidents', value: 12, change: 15.3, status: 'warning' }
];

export const incidents: Incident[] = [
  {
    id: 'INC-001',
    type: 'traffic',
    severity: 'high',
    status: 'open',
    location: 'Highway 101 North',
    coordinates: [37.7749, -122.4194],
    description: 'Heavy congestion detected, estimated 45min delay',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    assignedTo: 'Traffic Dept.'
  },
  {
    id: 'INC-002',
    type: 'emergency',
    severity: 'critical',
    status: 'in-progress',
    location: 'Downtown Plaza',
    coordinates: [37.7849, -122.4094],
    description: 'Fire alarm triggered at commercial building',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    assignedTo: 'Fire Dept.'
  },
  {
    id: 'INC-003',
    type: 'pollution',
    severity: 'medium',
    status: 'open',
    location: 'Industrial District',
    coordinates: [37.7649, -122.4294],
    description: 'Elevated particulate matter levels detected',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString()
  },
  {
    id: 'INC-004',
    type: 'infrastructure',
    severity: 'low',
    status: 'resolved',
    location: 'Water Treatment Plant 3',
    coordinates: [37.7549, -122.4394],
    description: 'Pump maintenance completed',
    timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
    assignedTo: 'Utilities'
  }
];

export const cameraFeeds: CameraFeed[] = [
  { id: 'CAM-001', name: 'Highway 101 North', location: 'Mile Marker 42', status: 'online', stream: 'https://images.pexels.com/photos/2255441/pexels-photo-2255441.jpeg', incidents: 3 },
  { id: 'CAM-002', name: 'Downtown Plaza', location: 'Main & 5th', status: 'online', stream: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg', incidents: 1 },
  { id: 'CAM-003', name: 'Central Station', location: 'Transit Hub', status: 'online', stream: 'https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg', incidents: 0 },
  { id: 'CAM-004', name: 'Industrial Zone', location: 'Sector 7', status: 'online', stream: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg', incidents: 2 },
  { id: 'CAM-005', name: 'Park Central', location: 'Green District', status: 'offline', stream: '', incidents: 0 },
  { id: 'CAM-006', name: 'Harbor Bridge', location: 'Waterfront', status: 'online', stream: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', incidents: 1 }
];

export const aiInsights: AIInsight[] = [
  {
    id: 'AI-001',
    type: 'prediction',
    title: 'Traffic Surge Predicted',
    description: 'Heavy traffic expected on Highway 101 between 5-7 PM. Recommend alternate routes.',
    confidence: 94,
    timestamp: new Date(Date.now() - 10 * 60000).toISOString()
  },
  {
    id: 'AI-002',
    type: 'recommendation',
    title: 'Energy Optimization',
    description: 'Street lighting in District 4 can be reduced by 15% without safety impact.',
    confidence: 87,
    timestamp: new Date(Date.now() - 30 * 60000).toISOString()
  },
  {
    id: 'AI-003',
    type: 'alert',
    title: 'Air Quality Anomaly',
    description: 'Unusual pollution spike detected near Industrial District. Investigating source.',
    confidence: 92,
    timestamp: new Date(Date.now() - 45 * 60000).toISOString()
  },
  {
    id: 'AI-004',
    type: 'prediction',
    title: 'Maintenance Required',
    description: 'Water pump at Plant 3 showing degradation patterns. Schedule maintenance within 48h.',
    confidence: 88,
    timestamp: new Date(Date.now() - 60 * 60000).toISOString()
  }
];

export const mapMarkers: MapMarker[] = [
  { id: 'M-001', type: 'traffic', coordinates: [37.7749, -122.4194], severity: 'high', label: 'Heavy Traffic' },
  { id: 'M-002', type: 'emergency', coordinates: [37.7849, -122.4094], severity: 'high', label: 'Fire Alert' },
  { id: 'M-003', type: 'pollution', coordinates: [37.7649, -122.4294], severity: 'medium', label: 'Air Quality' },
  { id: 'M-004', type: 'camera', coordinates: [37.7749, -122.4194], label: 'CAM-001' },
  { id: 'M-005', type: 'camera', coordinates: [37.7849, -122.4094], label: 'CAM-002' },
  { id: 'M-006', type: 'camera', coordinates: [37.7649, -122.4294], label: 'CAM-004' }
];

export const analyticsData = {
  trafficFlow: [
    { hour: '00:00', value: 45 },
    { hour: '04:00', value: 25 },
    { hour: '08:00', value: 85 },
    { hour: '12:00', value: 70 },
    { hour: '16:00', value: 90 },
    { hour: '20:00', value: 65 },
    { hour: '23:59', value: 50 }
  ],
  energyUsage: [
    { day: 'Mon', value: 2.3 },
    { day: 'Tue', value: 2.5 },
    { day: 'Wed', value: 2.4 },
    { day: 'Thu', value: 2.6 },
    { day: 'Fri', value: 2.7 },
    { day: 'Sat', value: 2.1 },
    { day: 'Sun', value: 1.9 }
  ],
  airQuality: [
    { time: '6 AM', value: 35 },
    { time: '9 AM', value: 45 },
    { time: '12 PM', value: 52 },
    { time: '3 PM', value: 48 },
    { time: '6 PM', value: 58 },
    { time: '9 PM', value: 42 }
  ],
  incidentsByType: [
    { type: 'Traffic', count: 145 },
    { type: 'Emergency', count: 23 },
    { type: 'Pollution', count: 67 },
    { type: 'Infrastructure', count: 89 }
  ]
};

