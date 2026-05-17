import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DATE_PATTERN, ROUTE_PATH } from '@/constants';
import { IUserRes } from '@/interface';
import { formatDate } from '@/utils';

interface TableDataProps {
  data?: IUserRes[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Tên người dùng</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Token</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={10} />
        ) : data && data.length > 0 ? (
          data?.map((user, index) => (
            <TableRow key={user.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>
                <Link
                  to={ROUTE_PATH.ADMIN.USERS.DETAILS.LINK(user.id)}
                  className="flex items-center gap-1 text-cyan-600 hover:underline"
                >
                  #{index + 1}
                  <ExternalLink size={14} />
                </Link>
              </TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="max-w-40 overflow-hidden text-ellipsis">
                {user.refreshTokens.length > 0 ? user.refreshTokens[0].token : '-'}
              </TableCell>
              <TableCell>{formatDate(user.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(user.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
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
