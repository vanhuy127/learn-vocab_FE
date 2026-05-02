import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SearchInput from '@/components/admin/searchInput';
import Pagination from '@/components/pagination';
import { TableSkeleton } from '@/components/tableSkeleton';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { ACCESS_LEVEL_SHOWS, MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useUserService } from '@/service/user.service';
import { formatDate } from '@/utils';

const TestCreatedTab = ({ userId }: { userId: string }) => {
  const { query, setQuery } = useQueryParams();
  const { getTestsByUserId } = useUserService();
  const { page = 1, size = MAX_PAGE_SHOW, search = '' } = query;
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search) {
      setQuery({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users-' + userId + '-tests', page, debouncedSearch, size],
    queryFn: () =>
      getTestsByUserId(userId, {
        page,
        size,
        search: debouncedSearch,
      }),
  });

  return (
    <div className="animate-fadeIn space-y-6">
      <h3 className="text-lg font-bold">Danh sách bài kiểm tra đã tạo</h3>

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
            <TableHead className="text-center">Thời gian</TableHead>
            <TableHead className="text-center">Quyền truy cập</TableHead>
            <TableHead className="text-center">Trạng thái khóa</TableHead>
            <TableHead className="text-center">Số bài nộp</TableHead>
            <TableHead className="text-center">Ngày tạo</TableHead>
            <TableHead className="text-center">Cập nhật cuối</TableHead>
            <TableHead className="text-center">Trạng thái xóa</TableHead>
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
                  <TableCell>{i.title}</TableCell>
                  <TableCell>{i.duration ? `${i.duration} phút` : 'Không giới hạn'}</TableCell>
                  <TableCell>{ACCESS_LEVEL_SHOWS[i.accessLevel]?.value}</TableCell>
                  <TableCell>
                    <Badge variant={i.isLocked ? 'destructive' : 'outline'} className="font-medium">
                      {i.isLocked ? 'Đã khóa' : 'Chưa khóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>{i._count.results}</TableCell>
                  <TableCell>{formatDate(i.createdAt)}</TableCell>
                  <TableCell>{formatDate(i.updatedAt)}</TableCell>
                  <TableCell>
                    <Badge variant={i.isDeleted ? 'destructive' : 'outline'} className="font-medium">
                      {i.isDeleted ? 'Đã xóa' : 'Chưa xóa'}
                    </Badge>
                  </TableCell>
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

export default TestCreatedTab;
