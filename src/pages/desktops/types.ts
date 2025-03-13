export interface Desktop {
  id: string;
  name: string;
  createdAt: string;
  status: 'running' | 'stopped' | 'error';
  deviceName: string;
  deviceId: string;
  userName?: string;
  connectionInfo?: string;
}

export interface DesktopInfo {
  id: string;
  name: string;
  ip: string;
  port: number;
  protocol: string;
  resolution: string;
  bandwidth: string;
  lastConnection: string;
  activeUsers: number;
  performance: {
    cpu: number;
    memory: number;
    network: string;
  };
}

export interface DesktopConnection {
  id: string;
  ip: string;
  browser: string;
  status: 'running' | 'stopped' | 'error';
  createdAt: string;
}

export interface CreateDesktopForm {
  name: string;
  deviceId: string;
}