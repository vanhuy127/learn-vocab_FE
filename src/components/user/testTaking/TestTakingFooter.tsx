import { Button } from '@/components/ui/button';

interface Props {
  currentIndex: number;
  totalQuestions: number;
  isSubmitting: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const TestTakingFooter = ({ currentIndex, totalQuestions, isSubmitting, onPrev, onNext, onSubmit }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <Button variant="outline" disabled={currentIndex === 0} onClick={onPrev}>
          Câu trước
        </Button>
        <Button variant="outline" disabled={currentIndex === totalQuestions - 1} onClick={onNext}>
          Câu tiếp
        </Button>
      </div>

      <Button className="cursor-pointer" onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
      </Button>
    </div>
  );
};

export default TestTakingFooter;
