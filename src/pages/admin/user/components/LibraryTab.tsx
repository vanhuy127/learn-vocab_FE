import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import SearchInput from '@/components/admin/searchInput';
import Pagination from '@/components/pagination';
import { TableSkeleton } from '@/components/tableSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { ACCESS_LEVEL_SHOWS, MAX_PAGE_SHOW, ROUTE_PATH } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useUserService } from '@/service/user.service';
import { formatDate } from '@/utils';

const LibraryTab = ({ userId }: { userId: string }) => {
  const { query, setQuery } = useQueryParams();
  const { spage = 1, fpage = 1, search = '', ssize = MAX_PAGE_SHOW, fsize = MAX_PAGE_SHOW } = query;
  const { getStudySetsByUserId, getFoldersByUserId } = useUserService();
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch !== query.search) {
      setQuery({
        ...query,
        search: debouncedSearch,
        spage: 1,
        fpage: 1,
      });
    }
  }, [debouncedSearch]);

  const { data: studySets, isLoading: isStudySetsLoading } = useQuery({
    queryKey: ['admin-users-' + userId + '-study-sets', spage, debouncedSearch, ssize],
    queryFn: () =>
      getStudySetsByUserId(userId, {
        page: spage,
        search: debouncedSearch,
        size: ssize,
      }),
  });

  const { data: folders, isLoading: isFoldersLoading } = useQuery({
    queryKey: ['admin-users-' + userId + '-folders', fpage, debouncedSearch, fsize],
    queryFn: () =>
      getFoldersByUserId(userId, {
        page: fpage,
        search: debouncedSearch,
        size: fsize,
      }),
  });

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-1 md:grid-cols-3">
        {/* search */}
        <div className="w-full">
          <SearchInput placeholder="Tìm tên cần tìm kiếm" searchTerm={searchInput} onChange={setSearchInput} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold">Danh sách học phần đã tạo</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">ID</TableHead>
              <TableHead className="text-center">Tên học phần</TableHead>
              <TableHead className="text-center">Thư mục</TableHead>
              <TableHead className="text-center">Quyền truy cập</TableHead>
              <TableHead className="text-center">Ngôn ngữ</TableHead>
              <TableHead className="text-center">Ngày tạo</TableHead>
              <TableHead className="text-center">Cập nhật cuối</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isStudySetsLoading ? (
              <TableSkeleton cols={10} />
            ) : studySets && studySets.data.length > 0 ? (
              studySets?.data?.map((i, index) => (
                <TableRow key={i.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
                  <TableCell>
                    <Link to={ROUTE_PATH.ADMIN.USERS.DETAILS.LINK(i.id)}> #{index + 1}</Link>
                  </TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.folder ? i.folder.name : '-'}</TableCell>
                  <TableCell>{ACCESS_LEVEL_SHOWS[i.accessLevel]?.value}</TableCell>
                  <TableCell>{i.language.name}</TableCell>
                  <TableCell>{formatDate(i.createdAt)}</TableCell>
                  <TableCell>{formatDate(i.updatedAt)}</TableCell>
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

        <Pagination
          currentPage={spage}
          totalPages={studySets?.pagination.totalPages || spage}
          onPageChange={(page) => setQuery({ spage: page })}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold">Danh sách thư mục đã tạo</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">ID</TableHead>
              <TableHead className="text-center">Tên thư mục</TableHead>
              <TableHead className="text-center">Số học phần</TableHead>
              <TableHead className="text-center">Ngày tạo</TableHead>
              <TableHead className="text-center">Cập nhật cuối</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFoldersLoading ? (
              <TableSkeleton cols={10} />
            ) : folders && folders.data.length > 0 ? (
              folders?.data?.map((i, index) => (
                <TableRow key={i.id} className="hover:bg-cyan-50/50 dark:hover:bg-gray-700">
                  <TableCell>
                    <Link to={ROUTE_PATH.ADMIN.USERS.DETAILS.LINK(i.id)}> #{index + 1}</Link>
                  </TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i._count.studySets}</TableCell>
                  <TableCell>{formatDate(i.createdAt)}</TableCell>
                  <TableCell>{formatDate(i.updatedAt)}</TableCell>
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

        <Pagination
          currentPage={fpage}
          totalPages={folders?.pagination.totalPages || fpage}
          onPageChange={(page) => setQuery({ fpage: page })}
        />
      </div>
    </div>
  );
};

export default LibraryTab;
