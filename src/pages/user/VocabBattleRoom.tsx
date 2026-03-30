import { Navigate, useParams } from 'react-router-dom';

import BattleControls from '@/components/user/vocabBattle/BattleControls';
import Leaderboard from '@/components/user/vocabBattle/Leaderboard';
import QuestionCard from '@/components/user/vocabBattle/QuestionCard';
import Timer from '@/components/user/vocabBattle/Timer';

import { ROUTE_PATH } from '@/constants/router';
import { useBattleSocket } from '@/hooks/useVocabBattleSocket';
import { useSocketStore } from '@/store';

const VocabBattleRoom = () => {
  const { id } = useParams();
  const { status, question } = useSocketStore();

  useBattleSocket(id);

  if (!id || ['idle', 'ready', 'queue'].includes(status)) {
    return <Navigate to={ROUTE_PATH.USER.BATTLE.MATCHMAKING} replace />;
  }

  return (
    <div className="space-y-4 p-6">
      {(status === 'matched' || status === 'finished') && <BattleControls />}

      {status === 'playing' && (
        <>
          <Timer />
          <QuestionCard />
        </>
      )}

      {(status === 'matched' || status === 'playing' || status === 'finished') && <Leaderboard />}

      {status === 'matched' && !question && (
        <p className="text-center text-sm text-slate-400">Dang khoi phuc tran dau...</p>
      )}
    </div>
  );
};

export default VocabBattleRoom;
