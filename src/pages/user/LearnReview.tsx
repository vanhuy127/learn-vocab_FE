import React, { useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants';
import { useStudySetService } from '@/service/studySet.service';

type AnswerMap = Record<
  string, // itemId
  {
    selected: string | null;
    isCorrect: boolean | null;
  }
>;

const LearnReview = () => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { id } = useParams();
  const { getStudySetByIdForQuiz, submitStudyItem } = useStudySetService();

  const {
    data: studySet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['review-quiz', id],
    queryFn: () => getStudySetByIdForQuiz(id!),
    enabled: !!id,
  });

  const questions = studySet?.items ?? [];
  const totalQuestions = questions.length;

  const handleSelectAnswer = (questionIndex: number, question: any, answer: string) => {
    if (isSubmitted) return;

    const isCorrect = answer === question.correctAnswer;

    setAnswers((prev) => ({
      ...prev,
      [question.itemId]: {
        selected: answer,
        isCorrect,
      },
    }));

    // auto scroll xuống câu tiếp theo
    const nextQuestion = questions[questionIndex + 1];
    if (nextQuestion) {
      questionRefs.current[nextQuestion.itemId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const { correctCount, wrongCount, unansweredCount } = useMemo(() => {
    let correct = 0;
    let wrong = 0;

    questions.forEach((q) => {
      const result = answers[q.itemId];
      if (!result) return;
      if (result.isCorrect) correct++;
      else wrong++;
    });

    return {
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: totalQuestions - correct - wrong,
    };
  }, [answers, questions, totalQuestions]);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Đang tải...</div>
      </div>
    );
  }

  if (error || !studySet) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Không tải được dữ liệu</p>
          <Link to={ROUTE_PATH.USER.LIBRARY} className="text-primary hover:underline">
            Quay lại thư viện
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={ROUTE_PATH.USER.STUDY_SET.DETAILS.LINK(studySet.id)}
          className="text-primary mb-4 inline-flex items-center gap-2 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Link>

        <h1 className="text-foreground mb-2 text-3xl font-bold">{studySet.name}</h1>
        <p className="text-muted-foreground">Ôn tập • {totalQuestions} câu hỏi</p>
      </div>

      {/* Question List */}
      <div className="space-y-10 pb-32">
        {questions.map((q, index) => {
          const result = answers[q.itemId];

          return (
            <div
              key={q.itemId}
              ref={(el) => {
                questionRefs.current[q.itemId] = el;
              }}
              className="border-border bg-card rounded-lg border p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">
                Câu {index + 1}: {q.question}
              </h3>

              <div className="space-y-2">
                {q.options.map(({ id, text }) => {
                  const isSelected = result?.selected === text;
                  const isCorrect = text === q.correctAnswer;

                  return (
                    <button
                      key={id}
                      disabled={isSubmitted}
                      onClick={() => handleSelectAnswer(index, q, text)}
                      className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                        !isSubmitted && isSelected ? 'border-primary bg-primary/10' : ''
                      } ${isSubmitted && isCorrect ? 'border-green-500 bg-green-100 dark:bg-green-900/20' : ''} ${
                        isSubmitted && isSelected && !isCorrect ? 'border-red-500 bg-red-100 dark:bg-red-900/20' : ''
                      } ${
                        isSubmitted && !isSelected && !isCorrect ? 'border-border bg-muted text-muted-foreground' : ''
                      } `}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Bar */}
      {!isSubmitted && (
        <div className="border-border bg-background fixed right-0 bottom-0 left-0 border-t p-4">
          <div className="mx-auto max-w-6xl text-right">
            <button
              onClick={() => setIsSubmitted(true)}
              className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-semibold"
            >
              Nộp bài
            </button>
          </div>
        </div>
      )}

      {/* Result Dashboard */}
      {isSubmitted && (
        <div className="border-border bg-card fixed top-24 right-6 w-72 rounded-lg border p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-bold">Kết quả</h3>

          <div className="mb-4 space-y-1 text-sm">
            <p className="text-green-600">✔ Đúng: {correctCount}</p>
            <p className="text-red-600">✘ Sai: {wrongCount}</p>
            <p className="text-muted-foreground">• Chưa làm: {unansweredCount}</p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, index) => {
              const r = answers[q.itemId];

              return (
                <button
                  key={q.itemId}
                  onClick={() =>
                    questionRefs.current[q.itemId]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    })
                  }
                  className={`h-9 w-9 rounded-full text-sm font-semibold ${
                    r?.isCorrect === true
                      ? 'bg-green-500 text-white'
                      : r?.isCorrect === false
                        ? 'bg-red-500 text-white'
                        : 'bg-muted text-muted-foreground'
                  } `}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnReview;
