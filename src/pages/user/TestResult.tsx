import { useQuery } from '@tanstack/react-query';
import { CheckCircle, FileQuestion } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ROUTE_PATH } from '@/constants';
import { useTestService } from '@/service/test.service';
import { formatDuration } from '@/utils';

const TestResult = () => {
  const { id, attemptId } = useParams();
  const navigate = useNavigate();
  const { getTestResult } = useTestService();

  const { data: result, isLoading } = useQuery({
    queryKey: ['test-result', attemptId],
    queryFn: () => getTestResult(attemptId!),
    enabled: !!attemptId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-5xl px-6 py-16">
          <div className="bg-card border-border rounded-2xl border p-8">
            <div className="bg-muted mb-4 h-6 w-2/3 animate-pulse rounded" />
            <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-5xl px-6 py-16">
          <div className="bg-card border-border rounded-2xl border p-8 text-center">
            <p className="text-destructive mb-4">Không thể tải kết quả</p>
            <Button onClick={() => navigate(ROUTE_PATH.USER.LIBRARY)}>Quay lại thư viện</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-16">
        <div className="bg-card border-border rounded-2xl border p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-secondary/20 text-secondary-foreground rounded-xl p-3">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-3xl font-bold">Chúc mừng! Bạn đã hoàn thành bài kiểm tra</h1>
              <p className="text-muted-foreground">Dưới đây là kết quả của bạn</p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="border-border rounded-xl border p-4">
              <p className="text-muted-foreground text-sm">Tổng điểm</p>
              <p className="text-foreground text-2xl font-bold">
                {result.score} / {result.totalPoints}
              </p>
            </div>
            <div className="border-border rounded-xl border p-4">
              <p className="text-muted-foreground text-sm">Số câu đúng</p>
              <p className="text-foreground text-2xl font-bold">
                {result.correctCount} / {result.totalQuestions}
              </p>
            </div>
            <div className="border-border rounded-xl border p-4">
              <p className="text-muted-foreground text-sm">Thời gian hoàn thành</p>
              <p className="text-foreground text-2xl font-bold">{formatDuration(result.timeSpentSeconds)}</p>
            </div>
          </div>

          {result.allowReview && result.questions && (
            <div className="space-y-4">
              <h2 className="text-foreground text-xl font-semibold">Chi tiết từng câu</h2>
              {result.questions.map((q, index) => (
                <div key={q.id} className="border-border rounded-xl border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="bg-secondary/20 text-secondary-foreground inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-foreground font-medium">{q.questionText}</p>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <p>
                      Đáp án của bạn:{' '}
                      {Array.isArray(q.userAnswer) ? q.userAnswer.join(', ') : q.userAnswer || 'Chưa trả lời'}
                    </p>
                    <p>
                      Đáp án đúng:{' '}
                      {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer || 'Không có'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
                    {q.isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-500">
                        <CheckCircle className="h-4 w-4" />
                        Đúng
                      </span>
                    ) : (
                      <span className="text-destructive flex items-center gap-1">
                        <FileQuestion className="h-4 w-4" />
                        Sai
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => navigate(ROUTE_PATH.USER.TEST.OVERVIEW.LINK(id!))}>Quay lại tổng quan</Button>
            <Button variant="outline" onClick={() => navigate(ROUTE_PATH.USER.LIBRARY)}>
              Về thư viện
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
