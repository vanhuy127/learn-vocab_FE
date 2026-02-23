import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';

import { envConfig } from '@/config/env';

import { SocketState } from './../types/vocabBattle';

const socketURL = envConfig.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,

  status: 'idle',
  question: null,
  totalQuestions: 0,
  leaderboard: {},
  timer: 30,
  initialTimer: 30,
  matchId: null,

  connectSocket: () => {
    const accessToken = localStorage.getItem('accessToken');
    const existingSocket = get().socket;

    if (existingSocket) return;

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
}));
