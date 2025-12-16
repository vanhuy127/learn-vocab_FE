import React, { useCallback, useMemo, useState } from 'react';

import { ChevronDown, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { FilterType } from '@/types/search';

interface SelectProps {
  value: FilterType;
  onChange: (value: FilterType) => void;
  placeholder?: string;
}

const SelectBar = React.memo(({ value, onChange, placeholder = 'Chọn loại' }: SelectProps) => {
  const [open, setOpen] = useState(false);

  const OPTIONS = useMemo(
    () => [
      { id: 1, label: 'Học phần', value: 'study-set' },
      { id: 2, label: 'Thư mục', value: 'folder' },
      { id: 3, label: 'Bài kiểm tra', value: 'test' },
      { id: 4, label: 'Người dùng', value: 'user' },
    ],
    [],
  );

  const selectedLabel = OPTIONS.find((o) => o.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'h-14 w-full justify-between rounded-xl px-4 text-base',
            'bg-accent text-accent-foreground border-border',
            'hover:bg-accent/70 focus:ring-ring focus:ring-2',
          )}
        >
          <span className={cn(!value && 'text-muted-foreground')}>{selectedLabel || placeholder}</span>

          <div className="flex items-center gap-2">
            <ChevronDown className="h-4 w-4 opacity-70" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className={cn('w-[200px] p-1', 'bg-popover text-popover-foreground border-border')}>
        <ul className="space-y-1">
          {OPTIONS.map((option) => (
            <li
              key={option.id}
              onClick={() => {
                onChange(option.value as FilterType);
                setOpen(false);
              }}
              className={cn(
                'cursor-pointer rounded-lg px-3 py-2 text-sm',
                'hover:bg-accent/70',
                value === option.value && 'bg-accent text-primary-foreground',
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
});

SelectBar.displayName = 'SelectBar';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  option: FilterType;
  onOptionChange: (value: FilterType) => void;
  className?: string;
}

const SearchBar = React.memo(({ searchTerm, onSearchChange, option, onOptionChange, className }: SearchBarProps) => {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange],
  );

  return (
    <div
      className={cn(
        'mx-auto mb-5 max-w-6xl rounded-2xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80',
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative sm:col-span-1 lg:col-span-3">
          <Search className="absolute top-4 left-4 z-10 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Tìm kiếm tên học phần, thư mục, bài kiểm tra, người dùng..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-14 rounded-xl border-gray-200 bg-gray-50 pl-12 text-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-400"
          />
        </div>

        {/* Location Select */}
        <div className="relative">
          <SelectBar value={option} onChange={onOptionChange} />
        </div>
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
