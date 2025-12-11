'use client';

import { memo } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const StatusFilter = ({ statusFilter, setStatusFilter, options, placeholder = 'Lọc theo trạng thái' }: Props) => {
  return (
    <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="border-2 sm:w-48 dark:bg-gray-800 dark:text-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(StatusFilter);
