import BattleControls from '@/components/user/vocabBattle/BattleControls';
import Leaderboard from '@/components/user/vocabBattle/Leaderboard';
import QuestionCard from '@/components/user/vocabBattle/QuestionCard';
import Timer from '@/components/user/vocabBattle/Timer';

import { useBattleSocket } from '@/hooks/useVocabBattleSocket';
import { useSocketStore } from '@/store';

const BattlePage = () => {
  useBattleSocket();

  const { status } = useSocketStore();

  return (
    <div className="space-y-4 p-6">
      <BattleControls />

      {status === 'playing' && (
        <>
          <Timer />
          <QuestionCard />
        </>
      )}

      {(status === 'playing' || status === 'finished') && <Leaderboard />}
    </div>
  );
};

export default BattlePage;
