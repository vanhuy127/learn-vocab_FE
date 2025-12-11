import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN } from '@/constants';
import { IUser } from '@/interface';
import { formatDate, getUserStatusBadge } from '@/utils';

import Action from './Action';

interface TableDataProps {
  data?: IUser[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Họ và tên</TableHead>
          <TableHead className="text-center">Tên người dùng</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Trạng thái</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={10} />
        ) : data && data.length > 0 ? (
          data?.map((user, index) => (
            <TableRow key={user.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>#{index + 1}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getUserStatusBadge(user.account.isLocked)}</TableCell>
              <TableCell>{formatDate(user.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(user.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell className="text-center">
                <Action user={user} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="text-center">
              Không tìm thấy dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
