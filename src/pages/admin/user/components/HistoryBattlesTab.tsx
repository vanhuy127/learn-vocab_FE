import { useQuery } from '@tanstack/react-query';

import Pagination from '@/components/pagination';
import { TableSkeleton } from '@/components/tableSkeleton';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { BATTLE_STATUS_SHOWS, MAX_PAGE_SHOW } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useUserService } from '@/service/user.service';
import { formatDate } from '@/utils';

const HistoryBattlesTab = ({ userId }: { userId: string }) => {
  const { query, setQuery } = useQueryParams();
  const { page = 1, size = MAX_PAGE_SHOW } = query;
  const { getHistoryBattlesByUserId } = useUserService();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users-' + userId + '-history-battles', page, size],
    queryFn: () =>
      getHistoryBattlesByUserId(userId, {
        page,
        size,
      }),
  });

  return (
    <div className="animate-fadeIn space-y-6">
      <h3 className="text-lg font-bold">Danh sách trận đấu đã tham gia</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">ID</TableHead>
            <TableHead className="text-center">Điểm</TableHead>
            <TableHead className="text-center">Kết quả</TableHead>
            <TableHead className="text-center">Thời gian vào trận</TableHead>
            <TableHead className="text-center">Thời gian rời trận</TableHead>
            <TableHead className="text-center">Trạng thái trận đấu</TableHead>
            <TableHead className="text-center">Thời gian kết thúc trận</TableHead>
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
                  <TableCell>{i.score}</TableCell>
                  <TableCell>
                    <Badge variant={i.isWinner ? 'default' : 'destructive'} className="font-medium">
                      {i.isWinner ? 'Thắng' : 'Thua'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(i.joinedAt)}</TableCell>
                  <TableCell>{i.leftAt ? formatDate(i.leftAt) : '-'}</TableCell>
                  <TableCell>{BATTLE_STATUS_SHOWS[i.match.status]}</TableCell>
                  <TableCell>{i.match.endedAt ? formatDate(i.match.endedAt) : '-'}</TableCell>
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

export default HistoryBattlesTab;
