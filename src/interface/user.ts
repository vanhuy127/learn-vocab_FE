import type { Role } from '@/types';

export interface IUserAccount {
  id: string;
  email: string;
  userName: string;
  role: Role;
}

export interface IUserAccountResponse extends IUserAccount {
  accessToken: string;
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

export interface IUserRes extends IUser {
  role: Role;
  resetPwToken: string | null;
  resetPwExpireAt: Date;
  refreshTokens: IRefreshTokenRes[];
}

export interface IRefreshTokenRes {
  id: string;
  token: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  createdAt: Date;
}
