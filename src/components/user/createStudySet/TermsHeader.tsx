import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  total: number;
  onAdd: () => void;
}

const TermsHeader = ({ total, onAdd }: Props) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <div className="bg-primary h-5 w-1 rounded-full" />
          Từ vựng
          <span className="text-muted-foreground ml-1 text-sm">({total})</span>
        </h2>
        <p className="text-muted-foreground text-sm">Tối thiểu 2 từ vựng</p>
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault();
          onAdd();
        }}
        className="flex items-center gap-2 transition hover:scale-105"
      >
        <Plus className="h-4 w-4" />
        Thêm từ
      </Button>
    </div>
  );
};

export default TermsHeader;
