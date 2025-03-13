import type { Desktop, DesktopConnection, DesktopInfo } from './types';

export const mockDevices = [
  { id: 'device-1', name: '登录节点-1' },
  { id: 'device-2', name: '登录节点-2' },
  { id: 'device-3', name: '登录节点-3' },
];

export const mockUsers = [
  { id: 'user-1', name: '用户-1' },
  { id: 'user-2', name: '用户-2' },
  { id: 'user-3', name: '用户-3' },
];

export const initialMockDesktops: Desktop[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `desktop-${index + 1}`,
    name: `桌面-${index + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    status: ['running', 'stopped', 'error'][
      Math.floor(Math.random() * 3)
    ] as Desktop['status'],
    deviceId: mockDevices[Math.floor(Math.random() * mockDevices.length)].id,
    deviceName:
      mockDevices[Math.floor(Math.random() * mockDevices.length)].name,
    userName: mockUsers[Math.floor(Math.random() * mockUsers.length)].name,
    connectionInfo: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}:3389`,
  })
);

export const generateMockConnections = (desktopId: string): DesktopConnection[] => {
  const connectionCount = Math.floor(Math.random() * 5) + 1;
  return Array.from({ length: connectionCount }, (_, index) => ({
    id: `conn-${desktopId}-${index + 1}`,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}`,
    browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][
      Math.floor(Math.random() * 4)
    ],
    status: ['running', 'stopped', 'error'][
      Math.floor(Math.random() * 3)
    ] as DesktopConnection['status'],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

export const getMockDesktopInfo = (id: string): DesktopInfo => ({
  id,
  name: initialMockDesktops.find((d) => d.id === id)?.name || '',
  ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}`,
  port: 3389,
  protocol: 'RDP',
  resolution: '1920x1080',
  bandwidth: `${Math.floor(Math.random() * 100)}Mbps`,
  lastConnection: new Date(
    Date.now() - Math.random() * 86400000 * 7
  ).toISOString(),
  activeUsers: Math.floor(Math.random() * 5),
  performance: {
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    network: `${Math.floor(Math.random() * 1000)}KB/s`,
  },
});