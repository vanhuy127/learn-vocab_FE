import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MODAL_TYPE, ROUTE_PATH } from '@/constants';
import { useModalStore } from '@/store';

interface Props {
  id: string;
}

const StudySetActionsDropdown = ({ id }: Props) => {
  const { openModal } = useModalStore();
  const navigate = useNavigate();

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
            navigate(ROUTE_PATH.USER.STUDY_SET.DETAILS.LINK(id));
          }}
        >
          <Eye className="mr-2 h-4 w-4" />
          Xem
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigate(ROUTE_PATH.USER.STUDY_SET.EDIT.LINK(id));
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            openModal(MODAL_TYPE.CONFIRM_DELETE_STUDY_SET, { id });
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StudySetActionsDropdown;
