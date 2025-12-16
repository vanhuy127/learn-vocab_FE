import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SkeletonList, { SearchItemSkeleton } from '@/components/Skeleton';
import Pagination from '@/components/pagination';
import SearchEmpty from '@/components/user/SearchEmpty';
import SearchBar from '@/components/user/search/SearchBar';
import SearchResultList from '@/components/user/search/SearchResultList';

import { MAX_PAGE_SHOW } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useSearchService } from '@/service/search.service';
import { FilterType } from '@/types/search';

const Search = () => {
  const { query, setQuery } = useQueryParams();
  const { getUserSearch } = useSearchService();

  const { page = 1, search = '', type = 'study-set', size = MAX_PAGE_SHOW } = query;

  const [searchInput, setSearchInput] = useState(search);
  const [typeFilter, setTypeFilter] = useState<FilterType>(type);

  const debouncedSearch = useDebounce(searchInput);
  useEffect(() => {
    if (debouncedSearch !== query.search || typeFilter !== query.type) {
      setQuery({
        search: debouncedSearch,
        page: 1,
        type: typeFilter,
      });
    }
  }, [debouncedSearch, typeFilter]);

  const { data: searchData, isLoading } = useQuery({
    queryKey: ['user-search', page, debouncedSearch, size, typeFilter],
    queryFn: () =>
      getUserSearch({
        page,
        search: debouncedSearch,
        size,
        type: typeFilter,
      }),
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleTypeChange = useCallback((type: FilterType) => {
    setTypeFilter(type);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Search Form */}
        <SearchBar
          searchTerm={searchInput}
          onSearchChange={handleSearchChange}
          option={typeFilter}
          onOptionChange={handleTypeChange}
        />

        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground text-2xl font-medium">
              Đã tìm thấy <span className="text-foreground text-4xl font-bold">{searchData?.pagination.total}</span> kết
              quả
            </p>
          </div>

          <div className="mb-6 grid gap-5">
            {isLoading && <SkeletonList Component={SearchItemSkeleton} />}

            {!isLoading && searchData && searchData.data.data.length > 0 ? (
              <SearchResultList data={searchData.data} />
            ) : (
              <SearchEmpty keyword={debouncedSearch} />
            )}
          </div>
          {searchData && searchData?.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Pagination
                currentPage={page}
                totalPages={searchData?.pagination.totalPages || page}
                onPageChange={(page) => setQuery({ page: page })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
