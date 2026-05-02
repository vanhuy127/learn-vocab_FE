import { IUser } from './user';

export type BattleStatus = 'WAITING' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';
export interface IBattleMatch {
  id: string;
  status: BattleStatus;
  winnerId: string;
  startedAt: Date;
  endedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBattlePlayer {
  id: string;
  score: number;
  isWinner: boolean;
  joinedAt: Date;
  leftAt: Date;
  user: IUser;
}

export interface IAdminBattle extends IBattlePlayer {
  match: IBattleMatch;
}
