import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { BookOpen, Calendar, Clock, FolderOpen } from 'lucide-react';

import SkeletonList, { SearchItemSkeleton } from '@/components/Skeleton';

import { DATE_PATTERN } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useFolderService } from '@/service/folder.service';
import { formatDate } from '@/utils';

import SearchEmpty from '../SearchEmpty';
import FolderActionsDropdown from './FolderActionsDropdown';

interface IProps {
  search: string;
}

const FoldersTab = (props: IProps) => {
  const { query, setQuery } = useQueryParams();
  const { getFolderCurrent } = useFolderService();

  useEffect(() => {
    if (props.search !== query.search) {
      setQuery({
        search: props.search,
      });
    }
  }, [props.search]);

  const { data: folders, isLoading } = useQuery({
    queryKey: ['user-my-library-folder', props.search],
    queryFn: () =>
      getFolderCurrent({
        search: props.search,
      }),
  });

  if (isLoading) {
    return <SkeletonList Component={SearchItemSkeleton} />;
  }

  if (!folders || folders.length === 0) {
    return <SearchEmpty keyword={props.search} />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {folders.map((folder, index) => (
        <div
          key={folder.id}
          className="bg-card border-border hover:border-accent group relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="absolute top-4 right-4">
            <FolderActionsDropdown folderId={folder.id} />
          </div>
          <div className="mb-4 flex items-start gap-4">
            <div className="from-accent/20 to-accent/5 rounded-xl bg-linear-to-br p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <FolderOpen className="text-accent h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-card-foreground group-hover:text-accent mb-2 line-clamp-1 text-xl font-bold transition-colors">
                {folder.name}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{folder.description}</p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              <span className="text-foreground text-base font-bold">{folder._count.studySets}</span> học phần
            </span>
          </div>

          <div className="text-muted-foreground border-border flex items-center justify-between border-t pt-4 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Tạo vào {formatDate(folder.createdAt, DATE_PATTERN.DATE_TIME)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Cập nhật cuối vào {formatDate(folder.updatedAt, DATE_PATTERN.DATE_TIME)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoldersTab;
