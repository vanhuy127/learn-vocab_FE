import { useEffect } from 'react';

import { toast } from 'sonner';

import { useSocketStore } from '@/store';

export const useBattleSocket = () => {
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
  } = useSocketStore();

  useEffect(() => {
    if (!socket) return;

    // queue
    socket.on('battle:queue:joined', () => {
      setStatus('queue');
    });

    socket.on('battle:queue:left', () => {
      setStatus('idle');
    });

    // match
    socket.on('battle:match:found', ({ matchId }) => {
      setMatchId(matchId);
      setStatus('matched');
    });

    socket.on('battle:match:started', ({ roomId, totalQuestions }) => {
      setStatus('playing');
      setTotalQuestions(totalQuestions);
    });

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
      socket.off('battle:start');
      socket.off('battle:question');
      socket.off('battle:score:update');
      socket.off('battle:match:finished');
      socket.off('battle:error');
    };
  }, [socket]);

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
