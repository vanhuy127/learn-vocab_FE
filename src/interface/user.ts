import type { Role } from '@/types';

export interface IUserAccount {
  id: string;
  email: string;
  role: Role;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
