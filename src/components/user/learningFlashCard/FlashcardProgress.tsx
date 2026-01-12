interface IProps {
  current: number;
  total: number;
  learned: number;
  notLearned: number;
}

const FlashcardProgress = ({ current, total, learned, notLearned }: IProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <div
          className="from-primary to-accent h-full bg-linear-to-r transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="text-foreground">
          Thẻ <span className="text-primary font-semibold">{current}</span> trên{' '}
          <span className="text-muted-foreground">{total}</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-3 w-3 rounded-full" />
            <span className="text-muted-foreground">
              Đã thuộc: <span className="text-primary font-semibold">{learned}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-destructive h-3 w-3 rounded-full" />
            <span className="text-muted-foreground">
              Chưa thuộc: <span className="text-destructive font-semibold">{notLearned}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardProgress;
