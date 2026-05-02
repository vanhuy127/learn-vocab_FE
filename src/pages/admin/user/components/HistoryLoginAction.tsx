import { memo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisVertical, Trash } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { ConfirmDialog } from '@/components/confirmDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IRefreshTokenRes } from '@/interface';
import { useAuthService } from '@/service/auth.service';

const Action = ({ data }: { data: IRefreshTokenRes }) => {
  const { id } = useParams();
  const { tokenRecovery } = useAuthService();
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => tokenRecovery(data.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users-' + id + '-history-login'] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
    setOpenConfirm(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant="outline" className="cursor-pointer border">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem
            className="text-destructive flex cursor-pointer items-center px-2 py-1.5"
            onClick={() => setOpenConfirm(true)}
          >
            <Trash className="text-destructive mr-2 h-4 w-4" /> Thu hồi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog xác nhận xóa */}
      <ConfirmDialog
        open={openConfirm}
        title="Thu hồi token"
        description={
          <>
            Bạn có chắc muốn thu hồi token này không?
            <br />
            <span className="font-semibold text-red-500">Hành động này không thể hoàn tác.</span>
          </>
        }
        confirmText="Thu hồi"
        cancelText="Hủy"
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
};

export default memo(Action);
