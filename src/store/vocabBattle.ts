import { create } from 'zustand';

import type {
  BattleAnswerOption,
  BattleAnswerResultPayload,
  BattleFinishedPayload,
  BattleLeaderboardEntry,
  BattleMatchFoundPayload,
  BattleQuestionPayload,
  BattleQueueJoinedPayload,
  BattleQueueLeftPayload,
  BattleScoreUpdatePayload,
} from '@/types/vocabBattle';

type BattleConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';
type BattleQueueStatus = 'idle' | 'queueing';

interface VocabBattleState {
  connectionStatus: BattleConnectionStatus;
  reconnectAttempt: number;
  socketError: string | null;
  queueStatus: BattleQueueStatus;
  queueJoinedAt: string | null;
  queueLeftAt: string | null;
  room: BattleMatchFoundPayload | null;
  currentQuestion: BattleQuestionPayload['question'] | null;
  questionDurationSeconds: number | null;
  questionDeadlineAt: number | null;
  submittedQuestionId: string | null;
  submittedOption: BattleAnswerOption | null;
  answerResult: BattleAnswerResultPayload | null;
  leaderboard: BattleLeaderboardEntry[];
  finished: BattleFinishedPayload | null;
  opponentLeftMessage: string | null;
  battleError: string | null;
  readyUserId: string | null;
  setConnectionStatus: (status: BattleConnectionStatus) => void;
  setReconnectAttempt: (attempt: number) => void;
  setSocketError: (message: string | null) => void;
  setReady: (userId: string) => void;
  setQueueJoined: (payload: BattleQueueJoinedPayload) => void;
  setQueueLeft: (payload: BattleQueueLeftPayload) => void;
  setMatchFound: (payload: BattleMatchFoundPayload) => void;
  setQuestion: (payload: BattleQuestionPayload) => void;
  setAnswerSubmitted: (questionId: string, selectedOption: BattleAnswerOption) => void;
  setAnswerResult: (payload: BattleAnswerResultPayload) => void;
  setScoreUpdate: (payload: BattleScoreUpdatePayload) => void;
  setFinished: (payload: BattleFinishedPayload) => void;
  setOpponentLeft: (message: string) => void;
  setBattleError: (message: string | null) => void;
  resetBattle: () => void;
}

const initialBattleState = {
  queueStatus: 'idle' as const,
  queueJoinedAt: null,
  queueLeftAt: null,
  room: null,
  currentQuestion: null,
  questionDurationSeconds: null,
  questionDeadlineAt: null,
  submittedQuestionId: null,
  submittedOption: null,
  answerResult: null,
  leaderboard: [] as BattleLeaderboardEntry[],
  finished: null,
  opponentLeftMessage: null,
  battleError: null,
};

export const useVocabBattleStore = create<VocabBattleState>((set) => ({
  connectionStatus: 'disconnected',
  reconnectAttempt: 0,
  socketError: null,
  readyUserId: null,
  ...initialBattleState,
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setReconnectAttempt: (attempt) => set({ reconnectAttempt: attempt }),
  setSocketError: (message) => set({ socketError: message }),
  setReady: (userId) => set({ readyUserId: userId }),
  setQueueJoined: ({ queuedAt }) =>
    set({
      queueStatus: 'queueing',
      queueJoinedAt: queuedAt,
      queueLeftAt: null,
      room: null,
      finished: null,
      battleError: null,
      opponentLeftMessage: null,
    }),
  setQueueLeft: ({ leftAt }) =>
    set({
      queueStatus: 'idle',
      queueLeftAt: leftAt,
      queueJoinedAt: null,
    }),
  setMatchFound: (payload) =>
    set({
      queueStatus: 'idle',
      queueJoinedAt: null,
      queueLeftAt: null,
      room: payload,
      currentQuestion: null,
      questionDurationSeconds: null,
      questionDeadlineAt: null,
      submittedQuestionId: null,
      submittedOption: null,
      answerResult: null,
      finished: null,
      battleError: null,
      opponentLeftMessage: null,
      leaderboard: payload.players.map((player) => ({
        userId: player.userId,
        userName: player.userName,
        score: 0,
      })),
    }),
  setQuestion: ({ question, durationSeconds, deadlineAt }) =>
    set({
      currentQuestion: question,
      questionDurationSeconds: durationSeconds,
      questionDeadlineAt: deadlineAt,
      submittedQuestionId: null,
      submittedOption: null,
      answerResult: null,
      battleError: null,
    }),
  setAnswerSubmitted: (questionId, selectedOption) =>
    set({
      submittedQuestionId: questionId,
      submittedOption: selectedOption,
    }),
  setAnswerResult: (payload) =>
    set({
      answerResult: payload,
      submittedQuestionId: payload.questionId,
      submittedOption: payload.selectedOption as BattleAnswerOption,
    }),
  setScoreUpdate: ({ leaderboard }) => set({ leaderboard }),
  setFinished: (payload) =>
    set({
      finished: payload,
      leaderboard: payload.leaderboard,
      currentQuestion: null,
      questionDurationSeconds: null,
      questionDeadlineAt: null,
      submittedQuestionId: null,
      submittedOption: null,
      answerResult: null,
    }),
  setOpponentLeft: (message) =>
    set({
      opponentLeftMessage: message,
    }),
  setBattleError: (message) => set({ battleError: message }),
  resetBattle: () =>
    set({
      ...initialBattleState,
      socketError: null,
      reconnectAttempt: 0,
      readyUserId: null,
    }),
}));
