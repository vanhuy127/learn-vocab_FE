// vocabulary-toolbar.tsx
import { ArrowUpDown, Languages, Type } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { VocabTerm } from '@/interface';

import { sortStatus } from './ListVocab';

interface Props {
  items: VocabTerm[];
  showWord: boolean;
  showMeaning: boolean;
  sort: string;
  onToggleWord: () => void;
  onToggleMeaning: () => void;
  onSortChange: (value: sortStatus) => void;
}

const VocabularyToolbar = ({
  items,
  showWord,
  showMeaning,
  sort,
  onToggleWord,
  onToggleMeaning,
  onSortChange,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-semibold">Danh sách từ vựng ({items.length})</h2>

      <div className="flex items-center gap-2">
        <Button variant={showWord ? 'secondary' : 'outline'} onClick={onToggleWord}>
          <Type className="mr-2 h-4 w-4" />
          {showWord ? 'Ẩn từ' : 'Hiện từ'}
        </Button>

        <Button variant={showMeaning ? 'secondary' : 'outline'} onClick={onToggleMeaning}>
          <Languages className="mr-2 h-4 w-4" />

          {showMeaning ? 'Ẩn nghĩa' : 'Hiện nghĩa'}
        </Button>

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px]">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Mặc định</SelectItem>
            <SelectItem value="process">Thông số của bạn</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VocabularyToolbar;
