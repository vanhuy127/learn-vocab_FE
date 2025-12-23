import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import FormItemCustom from '@/components/formItem';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { FolderFormValues, folderSchema } from '@/schema/folder.schema';
import { useFolderService } from '@/service/folder.service';
import { useModalStore } from '@/store';

const EditFolderModal = () => {
  const { isOpen, data, closeModal } = useModalStore();
  const { editFolder, getFolderById } = useFolderService();
  const queryClient = useQueryClient();

  const id = data?.folderId;

  const { data: folder } = useQuery({
    queryKey: ['user-my-library-folder', id],
    queryFn: () => getFolderById(id!),
    enabled: !!id,
  });

  const form = useForm<FolderFormValues>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: '',
      description: '',
    },
    values: folder
      ? {
          name: folder.name,
          description: folder.description || '',
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: FolderFormValues) => editFolder(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-my-library-folder'] });
      form.reset();
      closeModal();
    },
  });

  const submitHandler = (data: FolderFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <DialogHeader>
              <DialogTitle>Cập nhật thông tin thư mục </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormItemCustom
                form={form}
                name="name"
                label="Tên thư mục"
                renderInput={(field) => <Input {...field} value={field.value} placeholder="Nhập tên thư mục" />}
              />
              <FormItemCustom
                form={form}
                name="description"
                label="Mô tả thư mục"
                renderInput={(field) => <Textarea {...field} value={field.value} placeholder="Nhập mô tả thư mục" />}
              />
            </div>

            <DialogFooter>
              <Button
                className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                onClick={(e) => {
                  e.preventDefault();
                  form.reset();
                  closeModal();
                }}
                disabled={mutation.isPending}
              >
                Hủy
              </Button>
              <Button disabled={mutation.isPending}>
                {mutation.isPending ? 'Đang cập nhật...' : 'Cập nhật thư mục'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFolderModal;
