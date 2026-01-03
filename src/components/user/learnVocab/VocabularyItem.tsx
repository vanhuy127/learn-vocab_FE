import { useState } from 'react';

import { Eye, EyeOff, StickyNote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { VocabTerm } from '@/interface';

interface Props {
  item: VocabTerm;
  showWord: boolean;
  showMeaning: boolean;
}

const VocabularyItem = ({ item, showWord, showMeaning }: Props) => {
  const [showNote, setShowNote] = useState(false);

  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold">{showWord ? item.word : '•••••'}</p>

          <p className="text-muted-foreground">{showMeaning ? item.meaning : '•••••'}</p>

          {showNote && item.note && (
            <p className="text-muted-foreground flex items-center gap-1 text-sm">
              <StickyNote className="h-4 w-4" />
              {item.note}
            </p>
          )}
        </div>

        {item.note && (
          <Button size="icon" variant="ghost" onClick={() => setShowNote((p) => !p)}>
            {showNote ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VocabularyItem;
