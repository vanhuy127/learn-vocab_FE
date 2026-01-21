import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { ROUTE_PATH } from '@/constants';
import { useModalStore } from '@/store';

const ReviewQuizCompleteDialog = () => {
  const { isOpen, data, closeModal } = useModalStore();
  const navigate = useNavigate();
  const score = data?.score || 0;
  const maxScore = data?.maxScore || 0;

  const accuracy = Math.round((score / maxScore) * 100);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">🎉 Chúc mừng!</DialogTitle>
          <p className="text-muted-foreground text-center">Bạn đã hoàn thành phiên ôn tập</p>
        </DialogHeader>
        <p className="text-muted-foreground mb-6">
          Bạn đã trả lời đúng{' '}
          <span className="text-rose-600">
            {score}/{maxScore}
          </span>{' '}
          câu với tỉ lệ <span className="text-rose-600">{accuracy}%</span> tổng số câu hỏi
        </p>

        <DialogFooter className="flex gap-2">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            Ôn tập lại
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              closeModal();
              navigate(ROUTE_PATH.USER.STUDY_SET.DETAILS.LINK(data!.id));
            }}
          >
            Quay về danh sách
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewQuizCompleteDialog;
