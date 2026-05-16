'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SearchInput from '@/components/admin/searchInput';
import Pagination from '@/components/pagination';

import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useStudySetService } from '@/service/studySet.service';

import { TableData } from './components/Table';
import StatusFilter from '@/components/admin/statusFilter';

const index = () => {
  const { query, setQuery } = useQueryParams();
  const { getAdminStudySets } = useStudySetService();
  const { page = 1, search = '', isDeleted = 'all', size = MAX_PAGE_SHOW } = query;
  const [searchInput, setSearchInput] = useState(search);
  const [isDeletedFilter, setIsDeletedFilter] = useState(isDeleted);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== query.search || isDeletedFilter !== query.isDeleted) {
      setQuery({ search: debouncedSearch, isDeleted: isDeletedFilter, page: 1 });
    }
  }, [debouncedSearch, isDeletedFilter]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-study-sets', page, debouncedSearch, isDeletedFilter, size],
    queryFn: () =>
      getAdminStudySets({
        page,
        search: debouncedSearch,
        isDeleted: isDeletedFilter,
        size,
      }),
  });

  const isDeletedOptions = useMemo(
    () => [
      { label: 'Tất cả', value: 'all' },
      { label: 'Đã xóa', value: 'true' },
      { label: 'Chưa xóa', value: 'false' },
    ],
    [],
  );

  const handleIsDeletedChange = useCallback((value: string) => {
    setIsDeletedFilter(value);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Danh sách học phần</h1>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-1 md:grid-cols-3">
        {/* search */}
        <div className="w-full">
          <SearchInput placeholder="Tìm kiếm học phần" searchTerm={searchInput} onChange={setSearchInput} />
        </div>

        <div className="w-full">
          <StatusFilter
            placeholder="Trạng thái xóa"
            statusFilter={isDeletedFilter}
            setStatusFilter={handleIsDeletedChange}
            options={isDeletedOptions}
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
