import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, FileQuestion } from 'lucide-react';

import SkeletonList, { SearchItemSkeleton } from '@/components/Skeleton';

import { DATE_PATTERN } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useTestService } from '@/service/test.service';
import { formatDate } from '@/utils';

import SearchEmpty from '../SearchEmpty';

interface IProps {
  search: string;
}

const TestsTab = (props: IProps) => {
  const { query, setQuery } = useQueryParams();
  const { getTestCurrent } = useTestService();

  useEffect(() => {
    if (props.search !== query.search) {
      setQuery({
        search: props.search,
      });
    }
  }, [props.search]);

  const { data: tests, isLoading } = useQuery({
    queryKey: ['user-my-library-test', props.search],
    queryFn: () =>
      getTestCurrent({
        search: props.search,
      }),
  });

  if (isLoading) {
    return <SkeletonList Component={SearchItemSkeleton} />;
  }

  if (!tests || tests.length === 0) {
    return <SearchEmpty keyword={props.search} />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {tests.map((test, index) => (
        <div
          key={test.id}
          className="bg-card border-border hover:border-secondary group cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="mb-4 flex items-start gap-4">
            <div className="from-secondary/20 to-secondary/5 rounded-xl bg-linear-to-br p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <FileQuestion className="text-secondary-foreground h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-card-foreground group-hover:text-secondary-foreground mb-2 line-clamp-1 text-xl font-bold transition-colors">
                {test.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{test.description}</p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span className="text-foreground font-bold">{test.duration || 'Không giới hạn'}</span>
            </span>
            <span className="bg-secondary/10 text-secondary-foreground border-secondary/20 rounded-lg border px-3 py-1.5 text-xs font-semibold">
              {test._count.questions} câu hỏi
            </span>
          </div>

          <div className="text-muted-foreground border-border flex items-center border-t pt-4 text-xs">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Tạo vào {formatDate(test.createdAt, DATE_PATTERN.DATE_TIME)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestsTab;
