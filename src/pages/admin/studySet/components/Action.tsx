import { memo } from 'react';

import { EllipsisVertical, Unlock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IStudySetAdmin } from '@/interface';

const Action = ({ data }: { data: IStudySetAdmin }) => {
  // const { lockAccount, unlockAccount } = useAuthService();
  // const queryClient = useQueryClient();
  // const lockMutation = useMutation({
  //   mutationFn: () => lockAccount(user.accountId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  //   },
  // });

  // const unlockMutation = useMutation({
  //   mutationFn: () => unlockAccount(user.accountId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  //   },
  // });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant="outline" className="cursor-pointer border">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem className="text-rose-600">
          <Unlock className="mr-2 h-4 w-4" /> Thu hồi token
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(Action);
