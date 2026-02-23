export type BattleAnswerOption = 'A' | 'B' | 'C' | 'D';

export interface BattleReadyPayload {
  userId: string;
}

export interface BattleQueueJoinedPayload {
  queuedAt: string;
}

export interface BattleQueueLeftPayload {
  leftAt: string;
}

export interface BattlePlayer {
  userId: string;
  userName: string;
}

export interface BattleMatchFoundPayload {
  roomId: string;
  matchId: string;
  players: BattlePlayer[];
  totalQuestions: number;
  questionTimeLimitSeconds: number;
}

export interface BattleQuestionOption {
  label: BattleAnswerOption;
  text: string;
}

export interface BattleQuestion {
  id: string;
  questionText: string;
  position: number;
  options: BattleQuestionOption[];
}

export interface BattleQuestionPayload {
  roomId: string;
  question: BattleQuestion;
  durationSeconds: number;
  deadlineAt: number;
}

export interface BattleAnswerResultPayload {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  scoreDelta: number;
  score: number;
}

export interface BattleLeaderboardEntry {
  userId: string;
  userName: string;
  score: number;
}

export interface BattleScoreUpdatePayload {
  roomId: string;
  leaderboard: BattleLeaderboardEntry[];
}

export interface BattleFinishedPayload {
  roomId: string;
  matchId: string;
  status: 'FINISHED' | 'CANCELLED';
  winnerId: string | null;
  isDraw: boolean;
  leaderboard: BattleLeaderboardEntry[];
}

export interface BattleOpponentLeftPayload {
  roomId: string;
  message: string;
}

export interface BattleErrorPayload {
  message: string;
}

export interface BattleAnswerRequestPayload {
  roomId: string;
  questionId: string;
  selectedOption: BattleAnswerOption;
}

export interface BattleServerToClientEvents {
  'battle:ready': (payload: BattleReadyPayload) => void;
  'battle:queue:joined': (payload: BattleQueueJoinedPayload) => void;
  'battle:queue:left': (payload: BattleQueueLeftPayload) => void;
  'battle:match:found': (payload: BattleMatchFoundPayload) => void;
  'battle:question': (payload: BattleQuestionPayload) => void;
  'battle:answer:result': (payload: BattleAnswerResultPayload) => void;
  'battle:score:update': (payload: BattleScoreUpdatePayload) => void;
  'battle:finished': (payload: BattleFinishedPayload) => void;
  'battle:opponent:left': (payload: BattleOpponentLeftPayload) => void;
  'battle:error': (payload: BattleErrorPayload) => void;
}

export interface BattleClientToServerEvents {
  'battle:queue:join': () => void;
  'battle:queue:leave': () => void;
  'battle:answer': (payload: BattleAnswerRequestPayload) => void;
}
