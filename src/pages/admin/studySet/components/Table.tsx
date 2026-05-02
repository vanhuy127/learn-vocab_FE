import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { ACCESS_LEVEL_SHOWS, DATE_PATTERN, ROUTE_PATH } from '@/constants';
import { IStudySetAdmin } from '@/interface';
import { formatDate } from '@/utils';

import Action from './Action';

interface TableDataProps {
  data?: IStudySetAdmin[];
  isLoading: boolean;
}

export const TableData = ({ data, isLoading = false }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="text-center">Tên học phần</TableHead>
          <TableHead className="text-center">Ngôn ngữ</TableHead>
          <TableHead className="text-center">Quyền truy cập</TableHead>
          <TableHead className="text-center">Email người dùng</TableHead>
          <TableHead className="text-center">Số từ</TableHead>
          <TableHead className="text-center">Ngày tạo</TableHead>
          <TableHead className="text-center">Cập nhật cuối</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton cols={10} />
        ) : data && data.length > 0 ? (
          data?.map((i, index) => (
            <TableRow key={i.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
              <TableCell>
                <Link
                  to={ROUTE_PATH.ADMIN.STUDY_SETS.DETAILS.LINK(i.id)}
                  className="flex items-center gap-1 text-cyan-600 hover:underline"
                >
                  #{index + 1}
                  <ExternalLink size={14} />
                </Link>
              </TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.language.name}</TableCell>
              <TableCell>{ACCESS_LEVEL_SHOWS[i.accessLevel]?.value}</TableCell>
              <TableCell>{i.user.email}</TableCell>
              <TableCell>{i._count.items}</TableCell>
              <TableCell>{formatDate(i.createdAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell>{formatDate(i.updatedAt, DATE_PATTERN.DATE_TIME)}</TableCell>
              <TableCell className="text-center">
                <Action data={i} />
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
