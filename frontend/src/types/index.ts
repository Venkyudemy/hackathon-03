export interface Incident {
  id: string;
  type: 'traffic' | 'emergency' | 'pollution' | 'infrastructure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved';
  location: string;
  coordinates: [number, number];
  description: string;
  timestamp: string;
  assignedTo?: string;
}

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  stream: string;
  incidents: number;
}

export interface Metric {
  label: string;
  value: string | number;
  change: number;
  status: 'good' | 'warning' | 'critical';
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
}

export interface MapMarker {
  id: string;
  type: 'traffic' | 'pollution' | 'emergency' | 'camera';
  coordinates: [number, number];
  severity?: 'low' | 'medium' | 'high';
  label: string;
}

