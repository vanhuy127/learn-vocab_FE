import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useFolderService } from '@/service/folder.service';
import { useModalStore } from '@/store';

const ConfirmDeleteFolderModal = () => {
  const { isOpen, data, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { deleteFolder } = useFolderService();

  const folderId = data?.folderId;

  const mutation = useMutation({
    mutationFn: () => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-my-library-folder'],
      });
      closeModal();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa thư mục</DialogTitle>
          <DialogDescription>
            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa thư mục này?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteFolderModal;
