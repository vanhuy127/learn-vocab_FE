import { cn } from '@/lib/utils';
import { useSocketStore } from '@/store';

const Timer = () => {
  const { timer, initialTimer } = useSocketStore();
  const maxTime = Math.max(initialTimer, 1);
  const percentage = Math.max((timer / maxTime) * 100, 0);

  const getTimerColor = () => {
    if (timer > 10) return 'bg-emerald-500 shadow-[0_0_10px_#10b981]';
    if (timer > 5) return 'bg-amber-500 shadow-[0_0_10px_#f59e0b]';

    return 'bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse';
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-md space-y-2">
      <div className="flex items-end justify-between px-1">
        <span className="text-xs font-black tracking-widest text-slate-500 uppercase">Remaining Time</span>
        <div
          className={cn(
            'font-mono text-3xl font-black text-white transition-all duration-300',
            timer <= 5 && 'scale-110 text-red-500',
          )}
        >
          {timer}
          <span className="ml-0.5 text-sm text-slate-400">s</span>
        </div>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full border border-slate-700 bg-slate-800 p-[2px]">
        <div
          className={cn('h-full rounded-full transition-all duration-1000 ease-linear', getTimerColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
