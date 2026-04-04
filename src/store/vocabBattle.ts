import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { envConfig } from '@/config/env';

import { SocketState } from './../types/vocabBattle';

const socketURL = envConfig.VITE_SOCKET_URL;
const battleStateDefaults = {
  status: 'idle',
  question: null,
  totalQuestions: 0,
  leaderboard: {},
  timer: 30,
  initialTimer: 30,
  matchId: null,
} as const;

export const useSocketStore = create<SocketState>()(
  persist(
    (set, get) => ({
      socket: null,
      ...battleStateDefaults,

      connectSocket: (accessToken) => {
        const existingSocket = get().socket;

        if (existingSocket) {
          const currentToken =
            existingSocket.auth && typeof existingSocket.auth === 'object' && 'token' in existingSocket.auth
              ? existingSocket.auth.token
              : null;

          if (currentToken === accessToken) return;

          existingSocket.disconnect();
        }

        const socket: Socket = io(socketURL, {
          auth: { token: accessToken },
          transports: ['websocket'],
        });

        set({ socket });

        socket.on('connect', () => {
          console.warn('Connected to socket server');
        });
      },
      disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
          socket.disconnect();
          set({ socket: null });
          get().resetBattle();

          console.warn('Disconnected from socket server');
        }
      },
      setStatus: (status) => set({ status }),
      setQuestion: (question) => set({ question }),
      setTotalQuestions: (totalQuestions) => set({ totalQuestions }),
      setLeaderboard: (leaderboard) => set({ leaderboard }),
      setTimer: (timer) => set({ timer, initialTimer: timer }),
      decrementTimer: () => set((state) => ({ timer: Math.max(state.timer - 1, 0) })),
      setMatchId: (matchId) => set({ matchId }),
      resetBattle: () =>
        set({
          ...battleStateDefaults,
        }),
    }),
    {
      name: 'vocab-battle-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        status: state.status,
        question: state.question,
        totalQuestions: state.totalQuestions,
        leaderboard: state.leaderboard,
        timer: state.timer,
        initialTimer: state.initialTimer,
        matchId: state.matchId,
      }),
    },
  ),
);
