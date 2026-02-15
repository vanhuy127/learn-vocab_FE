import { AlertTriangle, Clock } from 'lucide-react';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

interface Props {
  title: string;
  currentIndex: number;
  totalQuestions: number;
  remainingSeconds: number | null;
  showTimeWarning: boolean;
}

const TestTakingHeader = ({ title, currentIndex, totalQuestions, remainingSeconds, showTimeWarning }: Props) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">
          Câu {currentIndex + 1} / {totalQuestions}
        </p>
      </div>
      {remainingSeconds !== null && (
        <div className="flex items-center gap-3">
          <div className="bg-secondary/10 text-secondary-foreground flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold">
            <Clock className="h-4 w-4" />
            {formatTime(remainingSeconds)}
          </div>
          {showTimeWarning && (
            <div className="text-destructive flex items-center gap-2 text-sm font-semibold">
              <AlertTriangle className="h-4 w-4" />
              Sắp hết giờ
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestTakingHeader;
