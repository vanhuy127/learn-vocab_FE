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

import { useStudySetService } from '@/service/studySet.service';
import { useModalStore } from '@/store';

const ConfirmDeleteStudySetModal = () => {
  const { isOpen, data, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { deleteStudySet } = useStudySetService();

  const studySetId = data?.id;

  const mutation = useMutation({
    mutationFn: () => deleteStudySet(studySetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-my-library-study-set'],
      });
      closeModal();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa học phần</DialogTitle>
          <DialogDescription>
            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa học phần này?
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

export default ConfirmDeleteStudySetModal;
