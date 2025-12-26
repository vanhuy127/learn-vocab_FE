import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import SetInfoCard from '@/components/user/createStudySet/SetInfoCard';
import TermsHeader from '@/components/user/createStudySet/TermsHeader';
import TermsList from '@/components/user/createStudySet/TermsList';

import { ACCESS_LEVEL, ROUTE_PATH } from '@/constants';
import { CreateStudySetFormValues, createStudySetSchema } from '@/schema/studySet.schema';
import { useStudySetService } from '@/service/studySet.service';

const CreateSetPage = () => {
  const { createStudySet } = useStudySetService();
  const navigate = useNavigate();
  const form = useForm<CreateStudySetFormValues>({
    resolver: zodResolver(createStudySetSchema),
    defaultValues: {
      title: '',
      description: '',
      accessLevel: ACCESS_LEVEL.PUBLIC,
      language: '',
      folderId: 'none',
      terms: [
        { id: '1', term: '', definition: '', note: '' },
        { id: '2', term: '', definition: '', note: '' },
      ],
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateStudySetFormValues) => createStudySet(data),
    onSuccess: (res) => {
      form.reset();
      navigate(ROUTE_PATH.USER.STUDY_SET.EDIT.LINK(res!.id));
    },
  });

  const onSubmit = (data: CreateStudySetFormValues) => {
    mutation.mutate(data);
  };

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'terms',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="container mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="mb-12">
            <h1 className="text-foreground mb-3 text-4xl font-bold md:text-5xl">Tạo học phần mới</h1>
            <p className="text-muted-foreground text-lg">
              Thêm từ vựng và định nghĩa để bắt đầu hành trình học tập của bạn
            </p>
          </div>

          <SetInfoCard />

          <TermsHeader
            total={fields.length}
            onAdd={() =>
              append({
                id: Date.now().toString(),
                term: '',
                definition: '',
              })
            }
          />

          <TermsList fields={fields} onRemove={remove} onMove={move} />
          <div className="flex justify-end">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang tạo...' : 'Tạo học phần'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateSetPage;
