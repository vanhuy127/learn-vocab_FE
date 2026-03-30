import { AnimatePresence, motion } from 'framer-motion';
import { Brain, RotateCcw, Shield, Swords, Target, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ROUTE_PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuthStore, useSocketStore } from '@/store';

const VocabularyBattleStart = () => {
  const navigate = useNavigate();
  const { socket, status, leaderboard, resetBattle } = useSocketStore();
  const { user } = useAuthStore();

  const joinQueue = () => socket?.emit('battle:queue:join');
  const leaveQueue = () => socket?.emit('battle:queue:leave');

  const players = Object.entries(leaderboard);
  const currentPlayer = players.find(
    ([playerId, player]) => playerId === user?.id || player.name === user?.userName,
  )?.[1];

  const topScore = players.length > 0 ? Math.max(...players.map(([, player]) => player.score)) : null;
  const leadersCount = topScore === null ? 0 : players.filter(([, player]) => player.score === topScore).length;

  const battleResult =
    status === 'finished' && currentPlayer && topScore !== null
      ? currentPlayer.score === topScore
        ? leadersCount > 1
          ? {
              label: 'Hòa',
              description: 'Hai người chơi đang ngang điểm. Trận này bất phân thắng bại.',
              className: 'border-amber-400/60 text-amber-200',
            }
          : {
              label: 'Thắng',
              description: 'Chúc mừng bạn đã chiến thắng trận đấu này! Hãy tiếp tục giữ vững phong độ nhé.',
              className: 'border-emerald-400/60 text-emerald-200',
            }
        : {
            label: 'Thua',
            description: 'Bạn chưa vượt qua đối thủ trong trận đấu này. Đừng nản lòng, hãy thử lại nhé!',
            className: 'border-rose-400/60 text-rose-200',
          }
      : null;

  const handleReset = () => {
    resetBattle();
    navigate(ROUTE_PATH.USER.BATTLE.MATCHMAKING);
  };

  return (
    <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden p-6 font-sans select-none">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[120px]"
        />
      </div>

      <Card className="relative z-10 w-full max-w-sm overflow-hidden rounded-[2.5rem] border-slate-800 bg-slate-950/60 shadow-2xl backdrop-blur-2xl">
        {/* Thanh trang trí trên đầu Card */}
        <div className="h-1.5 w-full bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-60" />

        <CardContent className="flex flex-col items-center p-8">
          {/* Tiêu đề Đấu Trường */}
          <div className="mb-10 space-y-1 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.3em] text-indigo-400 uppercase"
            >
              <Target className="h-3 w-3" /> Chế độ Xếp Hạng
            </motion.div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic drop-shadow-sm">
              ĐẤU TRƯỜNG <span className="text-indigo-500">TỪ VỰNG</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {/* --- TRẠNG THÁI CHỜ (IDLE) --- */}
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex w-full flex-col items-center"
              >
                {/* Icon Trung Tâm */}
                <div className="relative mb-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-4 rounded-full border border-dashed border-indigo-500/20"
                  />
                  <div className="relative rounded-4xl border border-indigo-500/20 bg-linear-to-br from-indigo-500/10 to-purple-500/10 p-8 shadow-inner">
                    <Brain className="h-14 w-14 fill-indigo-400/10 text-indigo-400" />
                  </div>
                </div>

                {/* NÚT BẮT ĐẦU MỚI */}
                <Button
                  onClick={joinQueue}
                  className="group relative h-20 w-full cursor-pointer overflow-hidden rounded-2xl bg-indigo-600 p-0 shadow-[0_0_30px_-5px_rgba(79,70,229,0.6)] transition-all duration-300 hover:bg-indigo-500"
                >
                  {/* Lớp phủ linear khi Hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Nội dung nút */}
                  <span className="relative z-10 flex items-center justify-center gap-3 text-2xl font-black tracking-tight text-white uppercase italic">
                    <Swords className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
                    Bắt đầu ngay
                  </span>

                  {/* Hiệu ứng tia sáng quét qua */}
                  <motion.div
                    initial={{ left: '-100%' }}
                    animate={{ left: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1 }}
                    className="absolute top-0 z-0 h-full w-20 skew-x-[-20deg] bg-white/20 blur-sm"
                  />
                </Button>

                <p className="mt-4 text-[11px] text-slate-500 italic">Tìm đối thủ xứng tầm chỉ trong vài giây</p>
              </motion.div>
            )}

            {/* --- TRẠNG THÁI ĐANG TÌM TRẬN (QUEUE) --- */}
            {status === 'queue' && (
              <motion.div
                key="queue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full flex-col items-center"
              >
                <div className="relative mb-8 flex h-36 w-36 items-center justify-center">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.5, scale: 0.5 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                      className="absolute inset-0 rounded-full border-2 border-indigo-500/30"
                    />
                  ))}
                  <div className="relative z-10 rounded-full border border-indigo-500/50 bg-slate-900 p-5 shadow-lg">
                    <Shield className="h-10 w-10 animate-pulse text-indigo-400" />
                  </div>
                </div>

                <div className="mb-8 space-y-2 text-center">
                  <h3 className="text-lg font-bold tracking-widest text-white uppercase italic">
                    Đang tìm đối thủ
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      ...
                    </motion.span>
                  </h3>
                  <p className="text-[11px] text-slate-500">Hệ thống đang ghép cặp ngẫu nhiên...</p>
                </div>

                <Button
                  variant="outline"
                  onClick={leaveQueue}
                  className="h-12 w-full rounded-xl border-slate-800 bg-transparent text-xs font-bold tracking-widest text-slate-400 uppercase transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Hủy tìm trận
                </Button>
              </motion.div>
            )}

            {/* --- TRẠNG THÁI ĐÃ TÌM THẤY ĐỐI THỦ (MATCHED) --- */}
            {status === 'matched' && <h1 className="text-center text-3xl">Đã tìm thấy trận đấu!</h1>}

            {/* --- TRẠNG THÁI KẾT THÚC (FINISHED) --- */}
            {status === 'finished' && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full flex-col items-center"
              >
                {battleResult && (
                  <div className={cn('mb-5 text-center', battleResult.className)}>
                    <h3 className="text-xl font-black text-white uppercase italic">Trận đấu kết thúc!</h3>
                    <p className="text-xs font-black tracking-[0.35em] uppercase">Kết quả</p>
                    {<p className="mt-2 text-4xl font-black uppercase">{battleResult.label}</p>}
                  </div>
                )}

                <Button
                  onClick={handleReset}
                  className="h-16 w-full rounded-xl bg-emerald-600 text-lg font-black text-white uppercase italic shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-500"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Tái đấu ngay
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default VocabularyBattleStart;
