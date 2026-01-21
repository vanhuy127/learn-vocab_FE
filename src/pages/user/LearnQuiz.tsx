import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { MODAL_TYPE, ROUTE_PATH } from '@/constants';
import { useStudySetService } from '@/service/studySet.service';
import { useModalStore } from '@/store';

const LearnQuiz = () => {
  const { id } = useParams();
  const { getStudySetByIdForQuiz, submitStudyItem } = useStudySetService();
  const { openModal } = useModalStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const {
    data: studySet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-study-set-quiz', id],
    queryFn: () => getStudySetByIdForQuiz(id!),
    enabled: !!id,
  });

  const submitMutation = useMutation({
    mutationFn: ({ id, isCorrect }: { id: string; isCorrect: boolean }) => submitStudyItem(id, isCorrect),
    onSuccess: () => {},
  });

  const questions = studySet?.items ?? [];
  const totalQuestions = questions.length;

  const currentQuestion = questions[currentIndex];

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isQuizComplete = isAnswered && isLastQuestion;

  const progressPercent = useMemo(() => {
    if (!totalQuestions) return 0;

    return ((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100;
  }, [currentIndex, isAnswered, totalQuestions]);

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const goToNextQuestion = () => {
    if (isLastQuestion) return;
    setCurrentIndex((prev) => prev + 1);
    resetQuestionState();
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered || !currentQuestion) return;

    const isCorrect = currentQuestion.correctAnswer === answer;
    const nextScore = isCorrect ? score + 1 : score;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    setScore(nextScore);

    submitMutation.mutate({ id: currentQuestion.itemId, isCorrect: isCorrect });

    if (isLastQuestion) {
      openModal(MODAL_TYPE.REVIEW_QUIZ_COMPLETE, {
        score: nextScore,
        maxScore: totalQuestions,
        id,
      });

      return;
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space' && isAnswered && !isLastQuestion) {
        e.preventDefault();
        goToNextQuestion();
      }
    },
    [isAnswered, isLastQuestion],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <div className="text-center">
            <div className="border-primary inline-block h-8 w-8 animate-spin rounded-full border-b-2"></div>
            <p className="text-muted-foreground mt-4">Đang tải...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !studySet || !currentQuestion) {
    return (
      <div className="bg-background min-h-screen">
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">{error?.message || 'Failed to load quiz'}</p>
            <Link to={ROUTE_PATH.USER.LIBRARY} className="text-primary hover:underline">
              Quay lại thư viện
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      <div className="mx-auto max-w-2xl px-4">
        {/* Header with progress */}
        <div className="mb-8">
          <Link
            to={ROUTE_PATH.USER.STUDY_SET.DETAILS.LINK(studySet.id)}
            className="text-primary mb-4 inline-flex items-center gap-2 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
          <h1 className="text-foreground mb-2 text-3xl font-bold">{studySet.name}</h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Câu {currentIndex + 1} trên {studySet.items.length}
            </p>
            <p className="text-primary font-semibold">
              Điểm: {score}/{studySet.items.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="bg-muted mt-4 h-2 overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card border-border mb-8 rounded-lg border p-8 shadow-sm">
          <h2 className="text-foreground mb-8 text-2xl font-semibold">
            Nghĩa của từ {`"${currentQuestion.question}"`}?
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map(({ id: label, text }) => {
              const isCorrect = text === currentQuestion.correctAnswer;
              const isSelectedCorrect = selectedAnswer === text;

              return (
                <button
                  key={label}
                  onClick={() => handleAnswerSelect(text)}
                  disabled={isAnswered}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left font-medium transition-all ${
                    isCorrect && isAnswered
                      ? 'border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100'
                      : isSelectedCorrect
                        ? 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100'
                        : isAnswered
                          ? 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                          : 'border-border bg-card text-foreground hover:border-primary hover:bg-secondary/10 cursor-pointer'
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-current">
                    {label.toUpperCase()}
                  </span>
                  <span className="grow">{text}</span>
                  {isAnswered && isCorrect && <CheckCircle className="h-5 w-5 shrink-0" />}
                  {isAnswered && isSelectedCorrect && !isCorrect && <XCircle className="h-5 w-5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue prompt or Results */}
        {isAnswered && (
          <div className="text-center">
            {isQuizComplete || (
              <div className="text-muted-foreground">
                <p className="mb-2 text-lg">
                  {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-sm">
                  Press <kbd className="bg-muted border-border rounded border px-2 py-1">Space</kbd> to continue
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnQuiz;
