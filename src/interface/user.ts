import type { Role } from '@/types';

export interface IUserAccount {
  id: string;
  email: string;
  userName: string;
  role: Role;
}

export interface IUserAccountResponse extends IUserAccount {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: string;
  email: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserSearch extends IUser {
  _count: {
    folders: number;
    studySets: number;
  };
}
