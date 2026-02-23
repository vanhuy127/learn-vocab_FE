import { useCallback, useEffect, useRef } from 'react';

import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

import { envConfig } from '@/config/env';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { useAuthStore, useVocabBattleStore } from '@/store';
import type {
  BattleAnswerRequestPayload,
  BattleClientToServerEvents,
  BattleServerToClientEvents,
} from '@/types/vocabBattle';
import { getLocalStorage, removeLocalStorage } from '@/utils';

type BattleSocket = Socket<BattleServerToClientEvents, BattleClientToServerEvents>;

let battleSocket: BattleSocket | null = null;
let subscriberCount = 0;

const isAuthSocketError = (message: string) => {
  const normalized = message.toLowerCase();

  return normalized.includes('auth') || normalized.includes('unauthorized') || normalized.includes('token');
};

const getSocketUrl = () => import.meta.env.VITE_SOCKET_URL || envConfig.VITE_API_URL;

const getOrCreateBattleSocket = (token: string): BattleSocket => {
  if (!battleSocket) {
    battleSocket = io(getSocketUrl(), {
      autoConnect: false,
      reconnection: true,
      auth: {
        token,
      },
    }) as BattleSocket;

    return battleSocket;
  }

  battleSocket.auth = { token };

  return battleSocket;
};

const handleAuthFailure = (onAuthError?: () => void) => {
  removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  removeLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  useAuthStore.getState().setUser(null);
  useVocabBattleStore.getState().resetBattle();
  toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
  onAuthError?.();
};

interface UseVocabBattleSocketOptions {
  onAuthError?: () => void;
}

export interface VocabBattleSocketController {
  joinQueue: () => void;
  leaveQueue: () => void;
  submitAnswer: (payload: BattleAnswerRequestPayload) => void;
  getSocket: () => BattleSocket | null;
}

export const useVocabBattleSocket = ({
  onAuthError,
}: UseVocabBattleSocketOptions = {}): VocabBattleSocketController => {
  const onAuthErrorRef = useRef(onAuthError);
  onAuthErrorRef.current = onAuthError;

  const {
    setConnectionStatus,
    setReconnectAttempt,
    setSocketError,
    setReady,
    setQueueJoined,
    setQueueLeft,
    setMatchFound,
    setQuestion,
    setAnswerResult,
    setScoreUpdate,
    setFinished,
    setOpponentLeft,
    setBattleError,
    setAnswerSubmitted,
    resetBattle,
  } = useVocabBattleStore();

  useEffect(() => {
    const accessToken = getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (!accessToken) {
      setConnectionStatus('disconnected');

      return;
    }

    const socket = getOrCreateBattleSocket(accessToken);
    subscriberCount += 1;
    setConnectionStatus(socket.connected ? 'connected' : 'connecting');

    const onConnect = () => {
      setConnectionStatus('connected');
      setSocketError(null);
    };

    const onDisconnect = (reason: string) => {
      if (reason === 'io server disconnect') {
        setConnectionStatus('reconnecting');
        socket.connect();

        return;
      }
      setConnectionStatus('disconnected');
    };

    const onConnectError = (error: Error) => {
      const message = error.message || 'Socket connection failed';
      setSocketError(message);
      if (isAuthSocketError(message)) {
        handleAuthFailure(onAuthErrorRef.current);
        socket.disconnect();

        return;
      }
      setConnectionStatus('reconnecting');
    };

    const onReconnectAttempt = (attempt: number) => {
      setReconnectAttempt(attempt);
      setConnectionStatus('reconnecting');
    };

    const onReady = ({ userId }: { userId: string }) => setReady(userId);
    const onQueueJoined = (payload: Parameters<BattleServerToClientEvents['battle:queue:joined']>[0]) =>
      setQueueJoined(payload);
    const onQueueLeft = (payload: Parameters<BattleServerToClientEvents['battle:queue:left']>[0]) =>
      setQueueLeft(payload);
    const onMatchFound = (payload: Parameters<BattleServerToClientEvents['battle:match:found']>[0]) =>
      setMatchFound(payload);
    const onQuestion = (payload: Parameters<BattleServerToClientEvents['battle:question']>[0]) => setQuestion(payload);
    const onAnswerResult = (payload: Parameters<BattleServerToClientEvents['battle:answer:result']>[0]) =>
      setAnswerResult(payload);
    const onScoreUpdate = (payload: Parameters<BattleServerToClientEvents['battle:score:update']>[0]) =>
      setScoreUpdate(payload);
    const onFinished = (payload: Parameters<BattleServerToClientEvents['battle:finished']>[0]) => setFinished(payload);
    const onOpponentLeft = (payload: Parameters<BattleServerToClientEvents['battle:opponent:left']>[0]) => {
      setOpponentLeft(payload.message);
      toast.error(payload.message);
    };
    const onBattleError = (payload: Parameters<BattleServerToClientEvents['battle:error']>[0]) => {
      setBattleError(payload.message);
      toast.error(payload.message);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.io.on('reconnect_attempt', onReconnectAttempt);
    socket.io.on('reconnect', onConnect);
    socket.on('battle:ready', onReady);
    socket.on('battle:queue:joined', onQueueJoined);
    socket.on('battle:queue:left', onQueueLeft);
    socket.on('battle:match:found', onMatchFound);
    socket.on('battle:question', onQuestion);
    socket.on('battle:answer:result', onAnswerResult);
    socket.on('battle:score:update', onScoreUpdate);
    socket.on('battle:finished', onFinished);
    socket.on('battle:opponent:left', onOpponentLeft);
    socket.on('battle:error', onBattleError);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.io.off('reconnect_attempt', onReconnectAttempt);
      socket.io.off('reconnect', onConnect);
      socket.off('battle:ready', onReady);
      socket.off('battle:queue:joined', onQueueJoined);
      socket.off('battle:queue:left', onQueueLeft);
      socket.off('battle:match:found', onMatchFound);
      socket.off('battle:question', onQuestion);
      socket.off('battle:answer:result', onAnswerResult);
      socket.off('battle:score:update', onScoreUpdate);
      socket.off('battle:finished', onFinished);
      socket.off('battle:opponent:left', onOpponentLeft);
      socket.off('battle:error', onBattleError);

      subscriberCount -= 1;
      if (subscriberCount <= 0) {
        socket.disconnect();
        battleSocket = null;
        subscriberCount = 0;
        resetBattle();
        setConnectionStatus('disconnected');
      }
    };
  }, [
    setAnswerResult,
    setBattleError,
    setConnectionStatus,
    setFinished,
    setMatchFound,
    setOpponentLeft,
    setQuestion,
    setQueueJoined,
    setQueueLeft,
    setReady,
    setReconnectAttempt,
    setScoreUpdate,
    setSocketError,
    resetBattle,
  ]);

  const joinQueue = useCallback(() => {
    const socket = battleSocket;
    if (!socket || !socket.connected) {
      toast.error('Mất kết nối tới máy chủ. Đang thử kết nối lại.');

      return;
    }
    socket.emit('battle:queue:join');
  }, []);

  const leaveQueue = useCallback(() => {
    const socket = battleSocket;
    if (!socket || !socket.connected) {
      return;
    }
    socket.emit('battle:queue:leave');
  }, []);

  const submitAnswer = useCallback(
    (payload: BattleAnswerRequestPayload) => {
      const socket = battleSocket;
      if (!socket || !socket.connected) {
        toast.error('Kết nối đang gián đoạn. Không thể gửi đáp án.');

        return;
      }
      setAnswerSubmitted(payload.questionId, payload.selectedOption);
      socket.emit('battle:answer', payload);
    },
    [setAnswerSubmitted],
  );

  return {
    joinQueue,
    leaveQueue,
    submitAnswer,
    getSocket: () => battleSocket,
  };
};
