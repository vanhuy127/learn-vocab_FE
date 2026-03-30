import BattleControls from '@/components/user/vocabBattle/BattleControls';

import { useBattleSocket } from '@/hooks/useVocabBattleSocket';

const VocabBattleMatchmaking = () => {
  useBattleSocket();

  return (
    <div className="p-6">
      <BattleControls />
    </div>
  );
};

export default VocabBattleMatchmaking;
