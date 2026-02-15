import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { ConfirmDialog } from '@/components/confirmDialog';
import { Button } from '@/components/ui/button';
import TestQuestionCard from '@/components/user/testTaking/TestQuestionCard';
import TestTakingFooter from '@/components/user/testTaking/TestTakingFooter';
import TestTakingHeader from '@/components/user/testTaking/TestTakingHeader';
import TestTakingSidebar from '@/components/user/testTaking/TestTakingSidebar';

import { ROUTE_PATH } from '@/constants';
import { useTestService } from '@/service/test.service';
import { TestSubmitPayload } from '@/types';

const TestTaking = () => {
  const { id, attemptId } = useParams();
  const navigate = useNavigate();
  const { getTestAttempt, submitTest } = useTestService();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const autoSubmitRef = useRef(false);

  const { data: attempt, isLoading } = useQuery({
    queryKey: ['test-attempt', attemptId],
    queryFn: () => getTestAttempt(attemptId!),
    enabled: !!attemptId,
  });

  const submitMutation = useMutation({
    mutationFn: (payload: TestSubmitPayload) => submitTest(attemptId!, payload),
    onSuccess: (res) => {
      if (!res) return;
      navigate(ROUTE_PATH.USER.TEST.RESULT.LINK(id!, res.attemptId));
    },
  });

  const questions = attempt?.questions ?? [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const completedCount = useMemo(() => {
    return questions.reduce((count, q) => {
      const answer = answers[q.id];
      if (Array.isArray(answer)) {
        return answer.length > 0 ? count + 1 : count;
      }

      if (typeof answer === 'string') {
        return answer.trim().length > 0 ? count + 1 : count;
      }

      return count;
    }, 0);
  }, [answers, questions]);

  const pendingCount = totalQuestions - completedCount;

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const buildSubmitPayload = (): TestSubmitPayload => {
    const payloadAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    return {
      answers: payloadAnswers,
    };
  };

  const confirmSubmit = () => {
    setIsSubmitOpen(false);
    submitMutation.mutate(buildSubmitPayload());
  };

  const handleSubmit = (auto = false) => {
    if (submitMutation.isPending) return;
    if (auto) {
      submitMutation.mutate(buildSubmitPayload());

      return;
    }
    setIsSubmitOpen(true);
  };

  useEffect(() => {
    if (!attempt) return;
    const durationSeconds = (attempt.duration ?? 0) * 60;
    if (durationSeconds <= 0) {
      setRemainingSeconds(null);

      return;
    }

    const initial = attempt.remainingSeconds ?? durationSeconds;
    setRemainingSeconds(initial);
  }, [attempt]);

  useEffect(() => {
    if (remainingSeconds === null) return;
    if (remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null) return prev;

        return prev <= 1 ? 0 : prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds !== null]);

  useEffect(() => {
    if (remainingSeconds === null || !attempt) return;

    const durationSeconds = (attempt.duration ?? 0) * 60;
    if (durationSeconds > 0) {
      setShowTimeWarning(remainingSeconds <= Math.ceil(durationSeconds * 0.2));
    }

    if (remainingSeconds === 0 && !autoSubmitRef.current) {
      autoSubmitRef.current = true;
      handleSubmit(true);
    }
  }, [remainingSeconds, attempt]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="bg-card border-border rounded-2xl border p-8">
            <div className="bg-muted mb-4 h-6 w-2/3 animate-pulse rounded" />
            <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!attempt || !currentQuestion) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="bg-card border-border rounded-2xl border p-8 text-center">
            <p className="text-destructive mb-4">Không thể tải bài kiểm tra</p>
            <Button onClick={() => navigate(ROUTE_PATH.USER.LIBRARY)}>Quay lại thư viện</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <TestTakingHeader
          title={attempt.title}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          remainingSeconds={remainingSeconds}
          showTimeWarning={showTimeWarning}
        />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <TestTakingSidebar
            questions={questions}
            currentIndex={currentIndex}
            completedCount={completedCount}
            pendingCount={pendingCount}
            answers={answers}
            onSelectQuestion={setCurrentIndex}
          />

          <div className="space-y-6">
            <TestQuestionCard
              index={currentIndex}
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onAnswerChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            />

            <TestTakingFooter
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              isSubmitting={submitMutation.isPending}
              onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              onNext={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              onSubmit={() => handleSubmit()}
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={isSubmitOpen}
        title="Xác nhận nộp bài"
        description={
          completedCount === totalQuestions
            ? 'Bạn có muốn xác nhận nộp bài?'
            : 'Bạn chưa hoàn thành bài kiểm tra, bạn vẫn muốn nộp bài chứ?'
        }
        confirmText={completedCount === totalQuestions ? 'Xác nhận nộp bài' : 'Vẫn nộp bài'}
        cancelText={completedCount === totalQuestions ? 'Hủy' : 'Quay lại làm tiếp'}
        onConfirm={confirmSubmit}
        onCancel={() => setIsSubmitOpen(false)}
      />
    </div>
  );
};

export default TestTaking;
