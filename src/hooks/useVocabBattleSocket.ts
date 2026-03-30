import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ROUTE_PATH } from '@/constants/router';
import { useSocketStore } from '@/store';
import { RejoinPayload } from '@/types';

export const useBattleSocket = (roomId?: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    socket,
    status,
    timer,
    decrementTimer,
    setStatus,
    setQuestion,
    setTotalQuestions,
    setLeaderboard,
    setTimer,
    setMatchId,
    resetBattle,
  } = useSocketStore();

  const syncBattleRoom = ({ roomId: nextRoomId, matchId }: { roomId?: string; matchId?: string }) => {
    const battleId = nextRoomId ?? matchId;

    if (!battleId) return;

    setMatchId(battleId);
    navigate(ROUTE_PATH.USER.BATTLE.ROOM.LINK(battleId));
  };

  const handleMatchRejoined = (data: RejoinPayload) => {
    const battleId = data.roomId ?? data.matchId;

    if (battleId) {
      setMatchId(battleId);

      if (location.pathname !== ROUTE_PATH.USER.BATTLE.ROOM.LINK(battleId)) {
        navigate(ROUTE_PATH.USER.BATTLE.ROOM.LINK(battleId));
      }
    }

    if (typeof data.totalQuestions === 'number') {
      setTotalQuestions(data.totalQuestions);
    }

    if (data.question) {
      setQuestion(data.question as Parameters<typeof setQuestion>[0]);
    }

    if (data.leaderboard) {
      setLeaderboard(data.leaderboard);
    }

    const nextTimer = typeof data.timeLimit === 'number' ? data.timeLimit : data.timer;

    if (typeof nextTimer === 'number') {
      setTimer(nextTimer);
    }

    setStatus(data.status ?? 'playing');
  };

  useEffect(() => {
    if (!socket) return;

    // queue
    socket.on('battle:queue:joined', () => {
      setStatus('queue');
    });

    socket.on('battle:queue:left', () => {
      resetBattle();

      if (location.pathname !== ROUTE_PATH.USER.BATTLE.MATCHMAKING) {
        navigate(ROUTE_PATH.USER.BATTLE.MATCHMAKING);
      }
    });

    // match
    socket.on('battle:match:found', ({ matchId }) => {
      setStatus('matched');
      syncBattleRoom({ matchId });
    });

    socket.on('battle:match:started', ({ roomId, totalQuestions }) => {
      setStatus('playing');
      setTotalQuestions(totalQuestions);
      syncBattleRoom({ roomId });
    });

    socket.on('battle:match:rejoined', handleMatchRejoined);

    socket.on('battle:start', () => {
      setStatus('playing');
    });

    // question
    socket.on('battle:question', ({ question, timeLimit }) => {
      setQuestion(question);
      setTimer(timeLimit);
    });

    // score
    socket.on('battle:score:update', ({ scores }) => {
      setLeaderboard(scores);
    });

    // finish
    socket.on('battle:match:finished', (data) => {
      setLeaderboard(data.leaderboard);
      setStatus('finished');
    });

    // error
    socket.on('battle:error', (err) => {
      toast.error(err.message);
      console.error(err.message);
    });

    return () => {
      socket.off('battle:queue:joined');
      socket.off('battle:queue:left');
      socket.off('battle:match:found');
      socket.off('battle:match:started');
      socket.off('battle:match:rejoined');
      socket.off('battle:start');
      socket.off('battle:question');
      socket.off('battle:score:update');
      socket.off('battle:match:finished');
      socket.off('battle:error');
    };
  }, [
    location.pathname,
    navigate,
    resetBattle,
    setLeaderboard,
    setMatchId,
    setQuestion,
    setStatus,
    setTimer,
    setTotalQuestions,
    socket,
  ]);

  useEffect(() => {
    if (!socket || !roomId) return;

    setMatchId(roomId);

    const requestRejoin = () => {
      socket.emit('battle:match:rejoin', { matchId: roomId });
    };

    if (socket.connected) {
      requestRejoin();
    }

    socket.on('connect', requestRejoin);

    return () => {
      socket.off('connect', requestRejoin);
    };
  }, [roomId, setMatchId, socket]);

  useEffect(() => {
    if (status !== 'playing' || timer <= 0) return;

    const countdown = window.setInterval(() => {
      const currentTimer = useSocketStore.getState().timer;

      if (currentTimer <= 0) {
        window.clearInterval(countdown);

        return;
      }

      useSocketStore.getState().decrementTimer();
    }, 1000);

    return () => {
      window.clearInterval(countdown);
    };
  }, [status, timer, decrementTimer]);
};
