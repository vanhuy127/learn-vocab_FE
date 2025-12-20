import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { BookOpen, Calendar } from 'lucide-react';

import SkeletonList, { SearchItemSkeleton } from '@/components/Skeleton';

import { DATE_PATTERN } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useStudySetService } from '@/service/studySet.service';
import { formatDate } from '@/utils';

import SearchEmpty from '../SearchEmpty';

interface IProps {
  search: string;
}

const StudySetsTab = (props: IProps) => {
  const { query, setQuery } = useQueryParams();
  const { getStudySetCurrent } = useStudySetService();

  useEffect(() => {
    if (props.search !== query.search) {
      setQuery({
        search: props.search,
      });
    }
  }, [props.search]);

  const { data: studySets, isLoading } = useQuery({
    queryKey: ['user-my-library-study-set', props.search],
    queryFn: () =>
      getStudySetCurrent({
        search: props.search,
      }),
  });

  if (isLoading) {
    return <SkeletonList Component={SearchItemSkeleton} />;
  }

  if (!studySets || studySets.length === 0) {
    return <SearchEmpty keyword={props.search} />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {studySets.map((set, index) => (
        <div
          key={set.id}
          className="bg-card border-border hover:border-primary group cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="mb-4 flex items-start gap-4">
            <div className="from-primary/20 to-primary/5 rounded-xl bg-linear-to-br p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <BookOpen className="text-primary h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-card-foreground group-hover:text-primary mb-2 line-clamp-1 text-xl font-bold transition-colors">
                {set.name}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{set.description}</p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <span className="text-foreground text-base font-bold">{set._count.items}</span> từ
            </span>
            <span className="bg-primary/10 text-primary border-primary/20 rounded-lg border px-3 py-1.5 text-xs font-semibold">
              {set.language}
            </span>
          </div>

          <div className="text-muted-foreground border-border flex items-center justify-between border-t pt-4 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Tạo vào {formatDate(set.createdAt, DATE_PATTERN.DATE_TIME)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudySetsTab;
