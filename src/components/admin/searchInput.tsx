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
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        className="bg-card text-foreground placeholder:text-foreground border-border focus-visible:ring-ring focus-visible:border-ring rounded-lg border pl-10 shadow-sm focus-visible:ring-2"
      />
    </div>
  );
};

export default memo(SearchInput);
