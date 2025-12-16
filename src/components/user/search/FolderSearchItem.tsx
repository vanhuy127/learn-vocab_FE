import { BookOpen, FolderOpen } from 'lucide-react';

import { IFolderSearch } from '@/interface';

import SearchItemLayout from './SearchItemLayout';

const FolderSearchItem = ({ item }: { item: IFolderSearch }) => {
  return (
    <SearchItemLayout
      icon={<FolderOpen className="text-accent h-6 w-6" />}
      badge={
        <span className="bg-accent/15 text-accent border-accent/30 rounded-full border px-3 py-1.5 text-xs font-semibold">
          Thư mục
        </span>
      }
      title={item.name}
      description={item.description}
      meta={
        <>
          <span className="text-muted-foreground flex items-center gap-2 font-medium">
            <BookOpen className="h-4 w-4" />
            <span className="text-foreground">{item._count.studySets}</span> học phần
          </span>

          <span className="text-muted-foreground ml-auto text-xs">
            bởi <span className="text-foreground font-semibold">{item.user.userName}</span>
          </span>
        </>
      }
    />
  );
};

export default FolderSearchItem;
