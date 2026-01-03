import { useMemo, useState } from 'react';

import { VocabTerm } from '@/interface';
import { UserProcessType } from '@/types';

import VocabularyItem from './VocabularyItem';
import VocabularyToolbar from './VocabularyToolbar';

export type sortStatus = 'default' | 'process';

const EMPTY_GROUP: Record<UserProcessType, VocabTerm[]> = {
  NEW: [],
  LEARNING: [],
  MASTERED: [],
};

interface Props {
  items: VocabTerm[];
}

const ListVocab = ({ items }: Props) => {
  const [showWord, setShowWord] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);
  const [sort, setSort] = useState('default' as sortStatus);

  const vocabGrouped = useMemo(() => {
    if (!items) return null;

    return items.reduce<Record<UserProcessType, VocabTerm[]>>((acc, item) => {
      const process = item.progress?.[0];

      const status: UserProcessType = process?.status ?? 'NEW';

      acc[status].push(item);

      return acc;
    }, EMPTY_GROUP);
  }, [items]);

  const STATUS_CONFIG: Record<UserProcessType, { label: string; color: string }> = {
    NEW: {
      label: 'Từ mới',
      color: 'text-gray-500',
    },
    LEARNING: {
      label: 'Đang học',
      color: 'text-yellow-600',
    },
    MASTERED: {
      label: 'Đã thuộc',
      color: 'text-green-600',
    },
  };

  const groupedData = vocabGrouped ?? EMPTY_GROUP;

  return (
    <div className="space-y-5">
      <VocabularyToolbar
        items={items}
        showWord={showWord}
        showMeaning={showMeaning}
        sort={sort}
        onToggleWord={() => setShowWord((p) => !p)}
        onToggleMeaning={() => setShowMeaning((p) => !p)}
        onSortChange={setSort}
      />

      <div className="space-y-3">
        {sort === 'default'
          ? items &&
            items.map((item) => (
              <VocabularyItem key={item.id} item={item} showWord={showWord} showMeaning={showMeaning} />
            ))
          : (Object.keys(groupedData) as UserProcessType[]).map((status) => {
              const items = groupedData[status];

              if (items.length === 0) return null;

              return (
                <section key={status} className="mb-8">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className={`text-lg font-semibold ${STATUS_CONFIG[status].color}`}>
                      {STATUS_CONFIG[status].label}
                      <span className="text-muted-foreground ml-2 text-lg">({items.length})</span>
                    </h2>
                  </div>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <VocabularyItem key={item.id} item={item} showWord={showWord} showMeaning={showMeaning} />
                    ))}
                  </div>
                </section>
              );
            })}
      </div>
    </div>
  );
};

export default ListVocab;
