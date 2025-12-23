import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { FolderFormValues, folderSchema } from '@/schema/folder.schema';
import { useFolderService } from '@/service/folder.service';
import { useModalStore } from '@/store';

import FormItemCustom from '../formItem';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const CreateFolderModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { createFolder } = useFolderService();
  const queryClient = useQueryClient();

  const form = useForm<FolderFormValues>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FolderFormValues) => createFolder(data),
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
              <DialogTitle>Tạo thư mục mới</DialogTitle>
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
              <Button disabled={mutation.isPending} className="">
                {mutation.isPending ? 'Đang tạo...' : 'Tạo thư mục'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderModal;
