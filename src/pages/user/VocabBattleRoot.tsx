import { useCallback } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants';
import { useVocabBattleSocket } from '@/hooks/useVocabBattleSocket';

const VocabBattleRoot = () => {
  const navigate = useNavigate();
  const handleAuthError = useCallback(() => {
    navigate(ROUTE_PATH.AUTH.LOGIN, { replace: true });
  }, [navigate]);

  const battleSocket = useVocabBattleSocket({
    onAuthError: handleAuthError,
  });

  return <Outlet context={battleSocket} />;
};

export default VocabBattleRoot;
