import { FileQuestion } from 'lucide-react';

import { ITestAttemptQuestion } from '@/interface';

interface Props {
  questions: ITestAttemptQuestion[];
  currentIndex: number;
  completedCount: number;
  pendingCount: number;
  answers: Record<string, string | string[]>;
  onSelectQuestion: (index: number) => void;
}

const TestTakingSidebar = ({
  questions,
  currentIndex,
  completedCount,
  pendingCount,
  answers,
  onSelectQuestion,
}: Props) => {
  return (
    <aside className="bg-card border-border self-start rounded-2xl border p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-secondary/20 text-secondary-foreground rounded-lg p-2">
          <FileQuestion className="h-4 w-4" />
        </div>
        <div>
          <p className="text-foreground font-semibold">Bảng điều khiển</p>
          <p className="text-muted-foreground text-xs">Theo dõi tiến độ làm bài</p>
        </div>
      </div>

      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Tổng số câu</span>
          <span className="text-foreground font-semibold">{questions.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Đã làm</span>
          <span className="text-foreground font-semibold">{completedCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Chưa làm</span>
          <span className="text-foreground font-semibold">{pendingCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, index) => {
          const answer = answers[q.id];
          const isCompleted = Array.isArray(answer)
            ? answer.length > 0
            : typeof answer === 'string' && answer.trim().length > 0;

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(index)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                index === currentIndex
                  ? 'bg-primary text-primary-foreground'
                  : isCompleted
                    ? 'bg-secondary/20 text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default TestTakingSidebar;
