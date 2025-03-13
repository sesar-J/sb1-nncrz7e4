export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface UserListResponse {
  data: User[];
  total: number;
  success: boolean;
}

export interface CurrentUser {
  name: string;
  avatar: string;
  email: string;
  role: string;
}

export interface LoginForm {
  username: string;
  password: string;
}