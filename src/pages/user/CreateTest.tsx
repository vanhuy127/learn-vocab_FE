import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import QuestionList from '@/components/user/createTest/QuestionList';
import TestInfoCard from '@/components/user/createTest/TestInfoCard';

import { ACCESS_LEVEL } from '@/constants';
import { CreateTestFormValues, createTestSchema } from '@/schema/test.schema';
import { useTestService } from '@/service/test.service';
import { CreateTestPayload } from '@/types';

const getOptionLabel = (index: number) => String.fromCharCode(65 + index);

const CreateTestPage = () => {
  const navigate = useNavigate();
  const { createTest } = useTestService();

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
  });

  const mutation = useMutation({
    mutationFn: (data: CreateTestPayload) => createTest(data),
    onSuccess: (res) => {
      // navigate(ROUTE_PATH.USER.TEST.EDIT.LINK(res.id));
    },
  });

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

  const mapCreateTestToPayload = (data: CreateTestFormValues): CreateTestPayload => {
    return {
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
      duration: data.duration || undefined,
      accessLevel: data.accessLevel,
      questions: data.questions.map((q, qIndex) => {
        if (q.questionType === 'FILL_IN') {
          const answer = q.answer?.trim();

          return {
            questionType: q.questionType,
            questionText: q.questionText.trim(),
            points: q.points,
            position: qIndex + 1,
            fillAnswers: answer ? [answer] : [],
          };
        }

        const options = (q.options ?? []).map((opt, optIndex) => ({
          label: getOptionLabel(optIndex),
          text: opt.text.trim(),
          isCorrect: opt.isCorrect,
          position: optIndex + 1,
        }));

        return {
          questionType: q.questionType,
          questionText: q.questionText.trim(),
          points: q.points,
          position: qIndex + 1,
          options,
        };
      }),
    };
  };

  const onSubmit = (data: CreateTestFormValues) => {
    const payload = removeUndefinedDeep(mapCreateTestToPayload(data)) as CreateTestPayload;
    mutation.mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="container mx-auto max-w-6xl space-y-6 px-6 py-8">
          <TestInfoCard />
          <QuestionList isEdit={true} />

          <div className="flex justify-end">
            <Button type="submit" className="cursor-pointer" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang tạo...' : 'Tạo bài kiểm tra'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateTestPage;
