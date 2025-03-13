import { User, UserListResponse } from '../types/user';

const mockUsers: User[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 3 === 0 ? 'Admin' : 'User',
  status: index % 4 === 0 ? 'inactive' : 'active',
  lastLogin: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

export const getMockUsers = (
  page: number = 1,
  pageSize: number = 10
): UserListResponse => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: mockUsers.slice(start, end),
    total: mockUsers.length,
    success: true,
  };
};