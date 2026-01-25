import React, { useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants';
import { useStudySetService } from '@/service/studySet.service';
import { Button } from '@/components/ui/button';
import ResultSummary from '@/components/user/learnReview/ResultSummary';
import QuestionDashboard from '@/components/user/learnReview/QuestionDashboard';
import QuestionCard from '@/components/user/learnReview/QuestionCard';
import { ManyAnswer } from '@/types';

type AnswerMap = Record<
  string, // itemId
  {
    selected: string;
    isCorrect: boolean;
  }
>;

const LearnReview = () => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { id } = useParams();
  const { getStudySetByIdForQuiz, submitManyStudyItem } = useStudySetService();

  const {
    data: studySet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['review-quiz', id],
    queryFn: () => getStudySetByIdForQuiz(id!),
    enabled: !!id,
  });

  const submitMutation = useMutation({
    mutationFn: ({ id, answers }: { id: string; answers: ManyAnswer }) => submitManyStudyItem(id, answers),
    onSuccess: () => { },
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
      setTimeout(() => {
        questionRefs.current[nextQuestion.itemId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 300);
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

  const { scorePercent, encouragement } = useMemo(() => {
    if (totalQuestions === 0) {
      return {
        scorePercent: 0,
        encouragement: '',
      };
    }

    const percent = Math.round((correctCount / totalQuestions) * 100);

    let message = '💪 Cố gắng thêm';
    if (percent >= 80) message = '🎯 Xuất sắc';
    else if (percent >= 50) message = '👍 Khá tốt';

    return {
      scorePercent: percent,
      encouragement: message,
    };
  }, [correctCount, totalQuestions]);

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);

    // scroll lên đầu bài
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!id) return;
    const convertData = Object.entries(answers).map(([key, value]) => ({
      itemId: key,
      isCorrect: value.isCorrect,
    }))
    submitMutation.mutate({
      id,
      answers: convertData,
    });
    setIsSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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

      {isSubmitted && (
        <ResultSummary
          correctCount={correctCount}
          wrongCount={wrongCount}
          unansweredCount={unansweredCount}
          totalQuestions={totalQuestions}
          scorePercent={scorePercent}
          encouragement={encouragement}
          onReset={handleReset}
        />
      )}

      <div className='flex gap-6 items-start'>
        {/*dash board  */}
        <QuestionDashboard
          questions={questions}
          answers={answers}
          isSubmitted={isSubmitted}
          onJump={(id) =>
            questionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        />

        {/* list ques */}
        <div className="flex-1 space-y-10">
          {questions.map((q, index) => (
            <QuestionCard
              key={q.itemId}
              index={index}
              question={q}
              result={answers[q.itemId]}
              isSubmitted={isSubmitted}
              onSelect={(answer) => handleSelectAnswer(index, q, answer)}
              refCallback={(el) => (questionRefs.current[q.itemId] = el)}
            />
          ))}
          {/* Submit Bar */}
          {!isSubmitted && (
            <div className="w-full flex justify-center">
              <Button
                size={'lg'}
                onClick={handleSubmit}
                className="cursor-pointer hover:scale-105 px-20"
              >
                Nộp bài
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnReview;
