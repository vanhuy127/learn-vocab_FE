import { useQuery } from '@tanstack/react-query';

import Pagination from '@/components/pagination';
import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { MAX_PAGE_SHOW } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { cn } from '@/lib/utils';
import { useUserService } from '@/service/user.service';
import { formatDate } from '@/utils';

import HistoryLoginAction from './HistoryLoginAction';

const HistoryLoginTab = ({ userId }: { userId: string }) => {
  const { query, setQuery } = useQueryParams();
  const { page = 1, size = MAX_PAGE_SHOW } = query;
  const { getHistoryLoginByUserId } = useUserService();

  const { data, isLoading: isStudySetsLoading } = useQuery({
    queryKey: ['admin-users-' + userId + '-history-login', page, size],
    queryFn: () =>
      getHistoryLoginByUserId(userId, {
        page,
        size,
      }),
  });

  return (
    <div className="animate-fadeIn space-y-6">
      <h3 className="text-lg font-bold">Danh sách lịch sử truy cập</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">ID</TableHead>
            <TableHead className="text-center">Token</TableHead>
            <TableHead className="text-center">Tên thiết bị</TableHead>
            <TableHead className="text-center">IP</TableHead>
            <TableHead className="text-center">Hạn sử dụng</TableHead>
            <TableHead className="text-center">Ngày tạo</TableHead>
            <TableHead className="text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isStudySetsLoading ? (
            <TableSkeleton cols={10} />
          ) : data && data.data.length > 0 ? (
            data?.data?.map((i, index) => {
              const isExpired = new Date(i.expiresAt) < new Date();

              return (
                <TableRow key={i.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
                  <TableCell> #{index + 1}</TableCell>
                  <TableCell className="max-w-40 overflow-hidden text-ellipsis">{i.token}</TableCell>
                  <TableCell className="max-w-40 overflow-hidden text-ellipsis">{i.userAgent}</TableCell>
                  <TableCell>{i.ipAddress}</TableCell>
                  <TableCell className={cn(isExpired ? 'text-rose-600' : 'text-emerald-600')}>
                    {formatDate(i.expiresAt)}
                  </TableCell>
                  <TableCell>{formatDate(i.createdAt)}</TableCell>
                  <TableCell className="text-center">
                    <HistoryLoginAction data={i} />
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

export default HistoryLoginTab;
