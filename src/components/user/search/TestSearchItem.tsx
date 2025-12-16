import { AlarmClock, FileQuestion } from 'lucide-react';

import { ITestSearch } from '@/interface';

import SearchItemLayout from './SearchItemLayout';

const TestSearchItem = ({ item }: { item: ITestSearch }) => {
  return (
    <SearchItemLayout
      icon={<FileQuestion className="text-secondary-foreground h-6 w-6" />}
      badge={
        <span className="bg-secondary/15 text-secondary-foreground border-secondary/30 rounded-full border px-3 py-1.5 text-xs font-semibold">
          Bài kiểm tra
        </span>
      }
      title={item.title}
      description={item.description}
      meta={
        <>
          <span className="text-muted-foreground flex items-center gap-2 font-medium">
            <AlarmClock className="h-4 w-4" />
            <span className="text-foreground font-bold">
              {item.duration ? `${item.duration} phút` : 'Không giới hạn'}
            </span>
          </span>

          <span className="text-muted-foreground ml-auto text-xs">
            bởi <span className="text-foreground font-semibold">{item.user.userName}</span>
          </span>
        </>
      }
    />
  );
};

export default TestSearchItem;
