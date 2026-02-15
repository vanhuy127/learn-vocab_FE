import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TriangleAlert } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import QuestionList from '@/components/user/createTest/QuestionList';
import TestInfoCard from '@/components/user/createTest/TestInfoCard';

import { ACCESS_LEVEL } from '@/constants';
import { ITestOption, ITestResponse } from '@/interface';
import { CreateTestFormValues, createTestSchema } from '@/schema/test.schema';
import { useTestService } from '@/service/test.service';
import { CreateTestPayload } from '@/types';

import Forbidden from '../Forbidden';
import NotFound from '../NotFound';

const getOptionLabel = (index: number) => String.fromCharCode(65 + index);
type QuestionFormValue = CreateTestFormValues['questions'][number];
type QuestionPayload = CreateTestPayload['questions'][number];
type EditTestPayload = Omit<CreateTestPayload, 'questions'> & {
  questions: Array<QuestionPayload & { id?: string }>;
};

const resolveTrueFalseAnswer = (options?: ITestOption[]) => {
  if (!options || options.length === 0) return 'true';

  const correct = options.find((opt) => opt.isCorrect);
  if (!correct) return 'true';

  const raw = `${correct.id ?? correct.label ?? correct.text ?? ''}`.toLowerCase();
  if (raw.includes('false') || raw.includes('sai')) return 'false';
  if (raw.includes('true') || raw.includes('đúng') || raw.includes('dung')) return 'true';

  const correctIndex = options.indexOf(correct);

  return correctIndex === 1 ? 'false' : 'true';
};

const mapTestToFormValues = (test: ITestResponse): CreateTestFormValues => {
  return {
    title: test.title ?? '',
    description: test.description ?? '',
    duration: test.duration ?? 0,
    accessLevel: test.accessLevel ?? ACCESS_LEVEL.PUBLIC,
    questions: (test.questions ?? []).map((q, qIndex) => {
      const questionType = q.questionType ?? 'CHOICE';
      const base = {
        id: q.id ?? `${qIndex + 1}`,
        questionType,
        questionText: q.questionText ?? q.question ?? '',
        points: q.points ?? 1,
      };

      if (questionType === 'FILL_IN') {
        return {
          ...base,
          answer: q.fillAnswers?.[0].answerText ?? '',
        };
      }

      if (questionType === 'T_F') {
        const answer = resolveTrueFalseAnswer(q.options);

        return {
          ...base,
          answer,
          options: [
            { id: 'true', text: 'Đúng', isCorrect: answer === 'true' },
            { id: 'false', text: 'Sai', isCorrect: answer === 'false' },
          ],
        };
      }

      return {
        ...base,
        options: (q.options ?? []).map((opt) => ({
          id: opt.id ?? opt.label ?? crypto.randomUUID(),
          text: opt.text ?? '',
          isCorrect: !!opt.isCorrect,
        })),
      };
    }),
  };
};

const removeUndefinedDeep = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => removeUndefinedDeep(item)).filter((item) => item !== undefined);
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => [key, removeUndefinedDeep(val)] as const)
      .filter(([, val]) => val !== undefined);

    return Object.fromEntries(entries);
  }

  return value === undefined ? undefined : value;
};

const mapQuestionToPayload = (question: QuestionFormValue, index: number): QuestionPayload => {
  if (question.questionType === 'FILL_IN') {
    const answer = question.answer?.trim();

    return {
      questionType: question.questionType,
      questionText: question.questionText.trim(),
      points: question.points,
      position: index + 1,
      fillAnswers: answer ? [answer] : [],
    };
  }

  const options = (question.options ?? []).map((opt, optIndex) => ({
    label: getOptionLabel(optIndex),
    text: opt.text.trim(),
    isCorrect: opt.isCorrect,
    position: optIndex + 1,
  }));

  return {
    questionType: question.questionType,
    questionText: question.questionText.trim(),
    points: question.points,
    position: index + 1,
    options,
  };
};

const mapEditTestToPayload = (data: CreateTestFormValues, originalTest?: ITestResponse): EditTestPayload => {
  const basePayload = {
    title: data.title.trim(),
    description: data.description?.trim() || undefined,
    duration: data.duration || undefined,
    accessLevel: data.accessLevel,
  };

  if (!originalTest) {
    return {
      ...basePayload,
      questions: data.questions.map((q, qIndex) => mapQuestionToPayload(q, qIndex)),
    };
  }

  const originalFormValues = mapTestToFormValues(originalTest);
  const originalIds = new Set(originalFormValues.questions.map((q) => q.id));
  const originalQuestionsById = new Map(
    originalFormValues.questions.map((q, qIndex) => [q.id, mapQuestionToPayload(q, qIndex)]),
  );

  const changedQuestions = data.questions
    .map((q, qIndex) => {
      const mapped = mapQuestionToPayload(q, qIndex);
      const isExistingQuestion = originalIds.has(q.id);

      return isExistingQuestion ? { ...mapped, id: q.id } : mapped;
    })
    .filter((question, index) => {
      const formQuestion = data.questions[index];
      const originalQuestion = originalQuestionsById.get(formQuestion.id);

      if (!originalQuestion) return true;

      const comparableQuestion = { ...question };
      delete comparableQuestion.id;

      return JSON.stringify(comparableQuestion) !== JSON.stringify(originalQuestion);
    });

  return {
    ...basePayload,
    questions: changedQuestions,
  };
};

const EditTestPage = () => {
  const { id } = useParams();
  const { getUserTestById, editTest } = useTestService();

  const { data: test, error } = useQuery({
    queryKey: ['user-test', id],
    queryFn: () => getUserTestById(id!),
    enabled: !!id,
    retry: false,
  });

  const form = useForm<CreateTestFormValues>({
    resolver: zodResolver(createTestSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      duration: 0,
      accessLevel: ACCESS_LEVEL.PUBLIC,
      questions: [],
    },
    values: test ? mapTestToFormValues(test) : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: EditTestPayload) => editTest(id!, data),
    onSuccess: () => {},
  });

  const onSubmit = (data: CreateTestFormValues) => {
    const payload = removeUndefinedDeep(mapEditTestToPayload(data, test ?? undefined)) as EditTestPayload;
    mutation.mutate(payload);
  };

  if ((error as any)?.response?.status === 403) {
    return <Forbidden />;
  }

  if ((error as any)?.response?.status === 404) {
    return <NotFound />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="container mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="mb-12">
            <h1 className="text-foreground mb-3 text-4xl font-bold md:text-5xl">Cập nhật bài kiểm tra</h1>
            <p className="text-muted-foreground text-lg">Chỉnh sửa nội dung để bài kiểm tra chính xác hơn</p>
          </div>
          <TestInfoCard />
          {test?.isLocked && (
            <Badge variant="destructive" className="text-sm">
              <TriangleAlert data-icon="inline-start" />
              Không thể chỉnh sửa cấu trúc câu hỏi vì đã có người dùng nộp bài
            </Badge>
          )}
          <QuestionList isEdit={!test?.isLocked} />

          <div className="flex justify-end">
            <Button type="submit" className="cursor-pointer" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditTestPage;
