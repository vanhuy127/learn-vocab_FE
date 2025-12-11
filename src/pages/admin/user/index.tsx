'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SearchInput from '@/components/admin/searchInput';
import StatusFilter from '@/components/admin/statusFilter';
import Pagination from '@/components/pagination';

import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useUserService } from '@/service/user.service';

import { TableData } from './components/Table';

const index = () => {
  const { query, setQuery } = useQueryParams();
  const { getUsers } = useUserService();
  const { page = 1, search = '', status = '-1', size = MAX_PAGE_SHOW } = query;
  const [searchInput, setSearchInput] = useState(search);
  const [statusFilter, setStatusFilter] = useState(status.toString());
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search || statusFilter !== query.status) {
      setQuery({ search: debouncedSearch, page: 1, status: statusFilter });
    }
  }, [debouncedSearch, statusFilter]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', page, debouncedSearch, size, statusFilter],
    queryFn: () =>
      getUsers({
        page,
        search: debouncedSearch,
        size,
        status: Number(statusFilter),
      }),
  });

  return (
    <div className="space-y-6 dark:bg-black dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Danh sách người dùng</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* search */}
        <div className="flex-3">
          <SearchInput placeholder="Tìm kiếm người dùng" searchTerm={searchInput} onChange={setSearchInput} />
        </div>
        <div className="flex-1">
          <StatusFilter
            placeholder="Lọc"
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            options={[
              { label: 'Tất cả', value: '-1' },
              { label: 'Hoạt động', value: '1' },
              { label: 'Không hoạt động', value: '0' },
            ]}
          />
        </div>
      </div>

      {/* table */}
      <TableData data={data?.data} isLoading={isLoading} />
      {/* pagination */}
      <Pagination
        currentPage={page}
        totalPages={data?.pagination.totalPages || page}
        onPageChange={(page) => setQuery({ page: page })}
      />
    </div>
  );
};
export default index;
