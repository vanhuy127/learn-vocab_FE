import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SearchInput from '@/components/admin/searchInput';
import Pagination from '@/components/pagination';
import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useUserService } from '@/service/user.service';
import { calculateDuration, formatDate } from '@/utils';

const TestResultsTab = ({ userId }: { userId: string }) => {
  const { query, setQuery } = useQueryParams();
  const { getTestResultsByUserId } = useUserService();
  const { page = 1, size = MAX_PAGE_SHOW, search = '' } = query;
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search) {
      setQuery({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users-' + userId + '-test-results', page, debouncedSearch, size],
    queryFn: () =>
      getTestResultsByUserId(userId, {
        page,
        size,
        search: debouncedSearch,
      }),
  });

  return (
    <div className="animate-fadeIn space-y-6">
      <h3 className="text-lg font-bold">Danh sách bài kiểm tra đã làm</h3>

      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-1 md:grid-cols-3">
        {/* search */}
        <div className="w-full">
          <SearchInput placeholder="Tìm kiếm bài kiểm tra" searchTerm={searchInput} onChange={setSearchInput} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">ID</TableHead>
            <TableHead className="text-center">Tên bài kiểm tra</TableHead>
            <TableHead className="text-center">Điểm</TableHead>
            <TableHead className="text-center">Số câu đúng</TableHead>
            <TableHead className="text-center">Thời gian làm bài</TableHead>
            <TableHead className="text-center">Thời gian quy định</TableHead>
            <TableHead className="text-center">Ngày tạo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton cols={10} />
          ) : data && data.data.length > 0 ? (
            data?.data?.map((i, index) => {
              return (
                <TableRow key={i.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
                  <TableCell> #{index + 1}</TableCell>
                  <TableCell>{i.test.title}</TableCell>
                  <TableCell>{i.score}</TableCell>
                  <TableCell>
                    {i.correctAnswers} / {i.totalQuestions}
                  </TableCell>
                  <TableCell>{calculateDuration(i.startedAt, i.finishedAt, 'minute')} phút</TableCell>
                  <TableCell> {i.test.duration ? i.test.duration + ' phút' : '-'}</TableCell>
                  <TableCell>{formatDate(i.createdAt)}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                Không tìm thấy dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={data?.pagination.totalPages || page}
        onPageChange={(page) => setQuery({ page: page })}
      />
    </div>
  );
};

export default TestResultsTab;
