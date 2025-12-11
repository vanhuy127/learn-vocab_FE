import { memo } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Lock, Unlock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IUser } from '@/interface';
import { useAuthService } from '@/service/auth.service';

const Action = ({ user }: { user: IUser }) => {
  const { lockAccount, unlockAccount } = useAuthService();
  const queryClient = useQueryClient();
  const lockMutation = useMutation({
    mutationFn: () => lockAccount(user.accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });

  const unlockMutation = useMutation({
    mutationFn: () => unlockAccount(user.accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-28 border text-cyan-800 dark:bg-gray-800 dark:text-cyan-600">
          Hành động
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {user.account.isLocked ? (
          <DropdownMenuItem onClick={() => unlockMutation.mutate()} className="text-green-600">
            <Unlock className="mr-2 h-4 w-4" /> Mở khóa
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => lockMutation.mutate()} className="text-red-600">
            <Lock className="mr-2 h-4 w-4" /> Khóa
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(Action);
