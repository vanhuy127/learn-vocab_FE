import { BookPlus, FolderPlus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MODAL_TYPE } from '@/constants';
import { useModalStore } from '@/store';

const AddControl = () => {
  const { openModal } = useModalStore();

  const handleAddFolder = () => {
    openModal(MODAL_TYPE.CREATE_FOLDER);
  };

  const handleAddStudySet = () => {
    // mở modal tạo học phần
    //TODO: link to study set
    console.log('Add new study set');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Thêm
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleAddFolder} className="flex cursor-pointer items-center gap-2">
          <FolderPlus className="text-primary h-4 w-4" />
          Thêm thư mục
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleAddStudySet} className="flex cursor-pointer items-center gap-2">
          <BookPlus className="text-primary h-4 w-4" />
          Thêm học phần
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddControl;
