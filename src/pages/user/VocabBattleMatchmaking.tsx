import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ROUTE_PATH } from '@/constants';
import type { VocabBattleSocketController } from '@/hooks/useVocabBattleSocket';
import { useVocabBattleStore } from '@/store';

const VocabBattleMatchmaking = () => {
  const navigate = useNavigate();
  const { joinQueue, leaveQueue } = useOutletContext<VocabBattleSocketController>();
  const { queueStatus, queueJoinedAt, room, connectionStatus, socketError, battleError, resetBattle } =
    useVocabBattleStore();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (room?.roomId) {
      navigate(ROUTE_PATH.USER.BATTLE.ROOM.LINK(room.roomId), { replace: true });
    }
  }, [navigate, room?.roomId]);

  useEffect(() => {
    return () => {
      const state = useVocabBattleStore.getState();
      if (state.queueStatus === 'queueing') {
        leaveQueue();
      }
    };
  }, [leaveQueue]);

  const waitingSeconds = useMemo(() => {
    if (!queueJoinedAt || queueStatus !== 'queueing') {
      return 0;
    }
    const joinedAt = new Date(queueJoinedAt).getTime();

    return Math.max(0, Math.floor((currentTime - joinedAt) / 1000));
  }, [currentTime, queueJoinedAt, queueStatus]);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-12">
      <div className="w-full rounded-xl border p-8">
        <h1 className="text-2xl font-semibold">Thách đấu từ vựng</h1>
        <p className="text-muted-foreground mt-2">
          Trạng thái kết nối: <span className="font-medium">{connectionStatus}</span>
        </p>
        {socketError ? <p className="mt-2 text-sm text-red-500">Socket lỗi: {socketError}</p> : null}
        {battleError ? <p className="mt-2 text-sm text-red-500">Battle lỗi: {battleError}</p> : null}

        <div className="mt-6 rounded-lg border p-6">
          {queueStatus === 'queueing' ? (
            <>
              <p className="text-lg font-medium">Đang tìm đối thủ...</p>
              <p className="text-muted-foreground mt-1">Thời gian chờ: {waitingSeconds}s</p>
              <Button className="mt-4" variant="destructive" onClick={leaveQueue}>
                Hủy tìm trận
              </Button>
            </>
          ) : (
            <>
              <p className="text-lg font-medium">Sẵn sàng ghép trận</p>
              <p className="text-muted-foreground mt-1">Nhấn nút bên dưới để vào hàng chờ.</p>
              <div className="mt-4 flex gap-3">
                <Button onClick={joinQueue}>Ghép trận</Button>
                <Button variant="outline" onClick={resetBattle}>
                  Làm mới trạng thái
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabBattleMatchmaking;
