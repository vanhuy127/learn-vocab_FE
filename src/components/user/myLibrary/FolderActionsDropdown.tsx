import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MODAL_TYPE } from '@/constants';
import { useModalStore } from '@/store';

interface Props {
  folderId: string;
}

const FolderActionsDropdown = ({ folderId }: Props) => {
  const { openModal } = useModalStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:bg-muted h-8 w-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            openModal(MODAL_TYPE.EDIT_FOLDER, { folderId });
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            openModal(MODAL_TYPE.CONFIRM_DELETE_FOLDER, { folderId });
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderActionsDropdown;
