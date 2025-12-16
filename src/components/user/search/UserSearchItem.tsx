import { BookOpen, FolderOpen, User } from 'lucide-react';

import { IUserSearch } from '@/interface';

import SearchItemLayout from './SearchItemLayout';

const UserSearchItem = ({ item }: { item: IUserSearch }) => {
  return (
    <SearchItemLayout
      icon={<User className="text-chart-2 h-6 w-6" />}
      badge={
        <span className="bg-chart-2/15 text-chart-2 border-chart-2/30 rounded-full border px-3 py-1.5 text-xs font-semibold">
          Người dùng
        </span>
      }
      title={item.userName}
      meta={
        <>
          <span className="text-muted-foreground flex items-center gap-2 font-medium">
            <FolderOpen className="h-4 w-4" />
            <span className="text-foreground">{item._count.folders}</span> thư mục
          </span>

          <span className="text-muted-foreground flex items-center gap-2 font-medium">
            <BookOpen className="h-4 w-4" />
            <span className="text-foreground">{item._count.studySets}</span> học phần
          </span>
        </>
      }
    />
  );
};

export default UserSearchItem;
