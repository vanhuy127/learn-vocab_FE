import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useAuthStore, useSocketStore } from '@/store';

const Leaderboard = () => {
  const { leaderboard, totalQuestions } = useSocketStore();
  const { user } = useAuthStore();
  const players = Object.entries(leaderboard);

  return (
    <div className="mx-auto flex w-full max-w-4xl items-center justify-between rounded-2xl border-b-4 border-indigo-500 bg-slate-950 px-4 py-8">
      {players.map(([playerId, player], index) => {
        const isCurrentUser = playerId === user?.id || player.name === user?.userName;
        const progress = totalQuestions > 0 ? Math.min((player.score / totalQuestions) * 100, 100) : 0;

        return (
          <div
            key={playerId}
            className={cn(
              'flex items-center gap-6 rounded-2xl px-4 py-3 transition-all duration-300',
              index === 1 && 'flex-row-reverse text-right',
              isCurrentUser && 'bg-cyan-500/10 shadow-[0_0_24px_rgba(34,211,238,0.18)] ring-2 ring-cyan-400/70',
            )}
          >
            <div className="relative">
              <div
                className={cn(
                  'h-16 w-16 overflow-hidden rounded-full border-2 bg-slate-800',
                  isCurrentUser ? 'border-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.45)]' : 'border-cyan-400',
                )}
              >
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} alt="avatar" />
              </div>
              <div className="absolute -right-2 -bottom-2 rounded-full bg-cyan-500 px-2 py-0.5 text-[10px] font-bold text-black">
                LV.99
              </div>
              {isCurrentUser && (
                <div className="absolute -top-2 -left-2 rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-black tracking-wide text-slate-950 uppercase">
                  You
                </div>
              )}
            </div>

            <div>
              <p className="mb-1 text-xs tracking-widest text-slate-400 uppercase">
                {isCurrentUser ? 'Current Player' : 'Player'}
              </p>
              <h4 className={cn('text-xl font-black text-white uppercase', isCurrentUser && 'text-cyan-300')}>
                {player.name}
              </h4>
              <div
                className={cn(
                  'mt-2 h-3 w-32 overflow-hidden rounded-full border bg-slate-800',
                  isCurrentUser ? 'border-cyan-400/60' : 'border-slate-700',
                )}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className={cn(
                    'h-full',
                    isCurrentUser
                      ? 'bg-linear-to-r from-amber-300 via-cyan-300 to-blue-500'
                      : 'bg-linear-to-r from-cyan-400 to-blue-500',
                  )}
                />
              </div>
              <p className={cn('mt-1 font-mono text-cyan-400', isCurrentUser && 'font-black text-amber-300')}>
                {player.score} PTS
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;
