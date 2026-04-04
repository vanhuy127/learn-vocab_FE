import { Socket } from 'socket.io-client';

export type SocketState = {
  socket: Socket | null;
  status: BattleStatus;
  question: Question | null;
  totalQuestions: number;
  leaderboard: Record<string, { name: string; score: number }>;
  timer: number;
  initialTimer: number;
  matchId: string | null;

  connectSocket: (accessToken: string) => void;
  disconnectSocket: () => void;
  setStatus: (s: SocketState['status']) => void;
  setQuestion: (q: Question | null) => void;
  setTotalQuestions: (n: number) => void;
  setLeaderboard: (l: Record<string, { name: string; score: number }>) => void;
  setTimer: (t: number) => void;
  decrementTimer: () => void;
  setMatchId: (id: string | null) => void;
  resetBattle: () => void;
};

export type BattleStatus = 'idle' | 'ready' | 'queue' | 'matched' | 'playing' | 'finished';

export type Question = {
  id: string;
  options: Option[];
  position: number;
  questionText: string;
};

export type Option = {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
};

export type RejoinPayload = {
  leaderboard?: Record<string, { name: string; score: number }>;
  matchId?: string;
  question?: unknown;
  roomId?: string;
  status?: 'matched' | 'playing' | 'finished';
  timeLimit?: number;
  timer?: number;
  totalQuestions?: number;
};
