// API Service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        return {
          error: errorData.message || errorData.error || 'Request failed',
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async validateToken() {
    return this.request<{ valid: boolean; user?: any }>('/auth/validate');
  }

  // Dashboard
  async getDashboardKPIs() {
    return this.request<any>('/dashboard/kpis');
  }

  async getDashboardData() {
    return this.request<any>('/dashboard');
  }

  async getDashboardAnalytics() {
    return this.request<any>('/dashboard/analytics');
  }

  // Sensors
  async getSensors() {
    return this.request<any[]>('/sensors');
  }

  async createSensor(sensor: any) {
    return this.request<any>('/sensors', {
      method: 'POST',
      body: JSON.stringify(sensor),
    });
  }

  async getSensor(id: string) {
    return this.request<any>(`/sensors/${id}`);
  }

  // Cameras
  async getCameras() {
    return this.request<any[]>('/cameras');
  }

  async createCamera(camera: any) {
    return this.request<any>('/cameras', {
      method: 'POST',
      body: JSON.stringify(camera),
    });
  }

  // Vehicles
  async getVehicles() {
    return this.request<any[]>('/vehicles');
  }

  async createVehicle(vehicle: any) {
    return this.request<any>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicle),
    });
  }

  // Assets
  async getAssets() {
    return this.request<any[]>('/assets');
  }

  async createAsset(asset: any) {
    return this.request<any>('/assets', {
      method: 'POST',
      body: JSON.stringify(asset),
    });
  }

  // Events
  async ingestEvent(event: any) {
    return this.request<any>('/events/ingest', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async ingestBatchEvents(events: any[]) {
    return this.request<any>('/events/batch', {
      method: 'POST',
      body: JSON.stringify({ events }),
    });
  }

  // Users
  async getUsers() {
    return this.request<any[]>('/users');
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  async createUser(user: any) {
    return this.request<any>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }
}

export const apiService = new ApiService();
export default apiService;

