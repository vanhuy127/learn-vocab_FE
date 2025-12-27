import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import SetInfoCard from '@/components/user/createStudySet/SetInfoCard';
import TermsHeader from '@/components/user/createStudySet/TermsHeader';
import TermsList from '@/components/user/createStudySet/TermsList';

import { ACCESS_LEVEL } from '@/constants';
import { CreateStudySetFormValues, createStudySetSchema } from '@/schema/studySet.schema';
import { useStudySetService } from '@/service/studySet.service';

const CreateSetPage = () => {
  const { id } = useParams();
  const { editStudySet, getStudySetById } = useStudySetService();

  const { data: studySet } = useQuery({
    queryKey: ['user-study-set', id],
    queryFn: () => getStudySetById(id!),
    enabled: !!id,
  });

  const form = useForm<CreateStudySetFormValues>({
    resolver: zodResolver(createStudySetSchema),
    defaultValues: {
      title: '',
      description: '',
      accessLevel: ACCESS_LEVEL.PUBLIC,
      languageId: '',
      folderId: 'none',
      items: [
        { id: '1', word: '', meaning: '', note: '' },
        { id: '2', word: '', meaning: '', note: '' },
      ],
    },
    values: studySet
      ? {
          title: studySet.name,
          description: studySet.description,
          accessLevel: studySet.accessLevel,
          languageId: studySet.language.id,
          folderId: studySet.folder?.id || 'none',
          items: studySet.items.map((i) => ({
            id: i.id,
            word: i.word,
            meaning: i.meaning,
            note: i.note || '',
          })),
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: CreateStudySetFormValues) => editStudySet(id!, data),
    onSuccess: () => {},
  });

  const onSubmit = (data: CreateStudySetFormValues) => {
    const payload = {
      ...data,
      items: data.items.map((item, index) => ({
        ...item,
        position: index + 1,
      })),
    };

    mutation.mutate(payload);
  };

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="container mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="mb-12">
            <h1 className="text-foreground mb-3 text-4xl font-bold md:text-5xl">Cập nhật thông tin học phần</h1>
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
                word: '',
                meaning: '',
              })
            }
          />

          <TermsList fields={fields} onRemove={remove} onMove={move} />
          <div className="flex justify-end">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateSetPage;
