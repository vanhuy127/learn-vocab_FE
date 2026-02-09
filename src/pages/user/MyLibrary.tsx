import { useEffect, useState } from 'react';

import { BookOpen, FileQuestion, FolderOpen } from 'lucide-react';

import SearchInput from '@/components/admin/searchInput';
import FoldersTab from '@/components/user/myLibrary/FoldersTab';
import StudySetsTab from '@/components/user/myLibrary/StudySetsTab';
import TestsTab from '@/components/user/myLibrary/TestsTab';

import { useDebounce } from '@/hooks/useDebounce';
import { useQueryParams } from '@/hooks/useQueryParams';
import { MyLibraryTabType } from '@/types';

const DEFAULT_TAB: MyLibraryTabType = 'study-set';

const MyLibrary = () => {
  const { query, setQuery } = useQueryParams<{ search?: string; tab?: MyLibraryTabType }>();
  const { search = '' } = query;

  const [activeTab, setActiveTab] = useState<MyLibraryTabType>(DEFAULT_TAB);
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput);

  const tabs = [
    { value: 'study-set', label: 'Học phần', icon: BookOpen },
    { value: 'folder', label: 'Thư mục', icon: FolderOpen },
    { value: 'test', label: 'Bài kiểm tra', icon: FileQuestion },
  ] as const;

  const normalizeTab = (value?: string) => {
    const valid = tabs.some((tab) => tab.value === value);

    return (valid ? value : DEFAULT_TAB) as MyLibraryTabType;
  };

  useEffect(() => {
    if (debouncedSearch !== search) {
      setQuery({ search: debouncedSearch });
    }
  }, [debouncedSearch, search, setQuery]);

  useEffect(() => {
    const nextTab = normalizeTab(query.tab);
    if (!query.tab) {
      setQuery({ tab: DEFAULT_TAB });

      return;
    }
    if (nextTab !== activeTab) {
      setActiveTab(nextTab);
    }
  }, [query.tab, activeTab, setQuery]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-foreground mb-3 text-4xl font-bold md:text-5xl">Thư viện của tôi</h1>
          <p className="text-muted-foreground text-lg">Quản lý tất cả nội dung học tập của bạn</p>
        </div>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row">
          <SearchInput placeholder="Nhập từ khóa tìm kiếm" searchTerm={searchInput} onChange={setSearchInput} />
        </div>
        {/* Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="border-border flex min-w-max gap-2 border-b-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    setQuery({ tab: tab.value });
                  }}
                  className={`relative flex items-center gap-3 px-6 py-4 font-semibold transition-all ${activeTab === tab.value ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.value && (
                    <div className="bg-primary absolute right-0 bottom-0 left-0 h-1 rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-in fade-in slide-in-from-bottom-3">
          {activeTab === 'study-set' && <StudySetsTab search={search} />}
          {activeTab === 'folder' && <FoldersTab search={search} />}
          {activeTab === 'test' && <TestsTab search={search} />}
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;
