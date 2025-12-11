import { memo } from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface Props {
  placeholder: string;
  searchTerm: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, searchTerm, onChange }: Props) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 pl-10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};

export default memo(SearchInput);
