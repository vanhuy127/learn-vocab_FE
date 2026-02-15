import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ROUTE_PATH } from '@/constants';

type Props = {
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  totalQuestions: number;
  scorePercent: number;
  encouragement: string;
  onReset: () => void;
};

const ResultBox = ({ label, value, color }: { label: string; value: number; color?: 'green' | 'red' }) => {
  const colorClass =
    color === 'green'
      ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
      : color === 'red'
        ? 'bg-red-100 text-red-600 dark:bg-red-900/20'
        : 'bg-muted';

  return (
    <div className={`rounded-md p-4 text-center ${colorClass}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
};

const ResultSummary = ({
  correctCount,
  wrongCount,
  unansweredCount,
  totalQuestions,
  scorePercent,
  encouragement,
  onReset,
}: Props) => {
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <div className="bg-card my-6 space-y-4 rounded-lg border p-6 shadow-sm">
      <h2 className="text-center text-xl font-bold">Kết quả bài làm</h2>

      <p className="text-lg font-semibold">
        Điểm số:{' '}
        <span className="text-primary">
          {correctCount}/{totalQuestions}
        </span>
      </p>

      <p className="text-lg font-semibold">
        Tỉ lệ làm bài: <span className="text-primary">{scorePercent}%</span> — {encouragement}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResultBox label="Câu đúng" value={correctCount} color="green" />
        <ResultBox label="Câu sai" value={wrongCount} color="red" />
        <ResultBox label="Chưa trả lời" value={unansweredCount} />
      </div>

      <div className="flex flex-col justify-center gap-5 sm:flex-row">
        <Button onClick={onReset} size={'lg'} className="cursor-pointer px-32">
          Làm lại
        </Button>
        <Button
          onClick={() => navigate(ROUTE_PATH.USER.STUDY_SET.DETAILS.LINK(id!))}
          size={'lg'}
          variant={'destructive'}
          className="cursor-pointer px-32"
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default ResultSummary;
