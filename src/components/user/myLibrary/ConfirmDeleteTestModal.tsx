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

import { useModalStore } from '@/store';
import { useTestService } from '@/service/test.service';

const ConfirmDeleteTestModal = () => {
  const { isOpen, data, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { deleteTest } = useTestService();

  const testId = data?.testId;

  const mutation = useMutation({
    mutationFn: () => deleteTest(testId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-my-library-test'],
      });
      closeModal();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa bài kiểm tra</DialogTitle>
          <DialogDescription>
            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa bài kiểm tra này này?
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

export default ConfirmDeleteTestModal;
