import { BookOpen } from 'lucide-react';

import { IStudySetSearch } from '@/interface';

import SearchItemLayout from './SearchItemLayout';

const StudySetSearchItem = ({ item }: { item: IStudySetSearch }) => {
  return (
    <SearchItemLayout
      icon={<BookOpen className="text-primary h-6 w-6" />}
      badge={
        <span className="bg-primary/15 text-primary border-primary/30 rounded-full border px-3 py-1.5 text-xs font-semibold">
          Học phần
        </span>
      }
      title={item.name}
      description={item.description}
      meta={
        <>
          <span className="text-muted-foreground flex items-center gap-2 font-medium">
            <span className="text-foreground font-bold">{item._count.items}</span> từ
          </span>

          <span className="bg-primary/10 text-primary border-primary/20 rounded-lg border px-3 py-1 text-xs font-semibold">
            {item.language.name}
          </span>
        </>
      }
    />
  );
};

export default StudySetSearchItem;
