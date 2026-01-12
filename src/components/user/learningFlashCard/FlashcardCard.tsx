import { useMemo } from 'react';

import { Lightbulb } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { VocabTerm } from '@/interface';

interface IProps {
  card: VocabTerm;
  isFlipped: boolean;
  showHint: boolean;
  onFlip: () => void;
  onShowHint: (e: React.MouseEvent) => void;
}
const FlashcardCard = ({ card, isFlipped, showHint, onFlip, onShowHint }: IProps) => {
  const maskHint = useMemo(() => {
    const visibleRatio = 0.2;
    const letters = card.meaning.split('');
    const letterIndexes = letters.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i !== -1);

    const visibleCount = Math.max(1, Math.floor(letterIndexes.length * visibleRatio));

    const shuffled = [...letterIndexes].sort(() => Math.random() - 0.5);
    const visibleSet = new Set(shuffled.slice(0, visibleCount));

    return letters.map((char, index) => (visibleSet.has(index) || !/\p{L}/u.test(char) ? char : '.')).join('');
  }, [card.word]);

  return (
    <div className="w-full max-w-2xl">
      {/* Card Container with Flip Animation */}
      <div
        className="relative h-96 w-full cursor-pointer"
        onClick={onFlip}
        role="button"
        tabIndex={0}
        aria-label="Click to flip card"
        onKeyDown={(e) => e.key === 'Enter' && onFlip()}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className={`relative h-full w-full transition-transform duration-500`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of Card - Word */}
          <div
            className="from-primary to-accent absolute flex h-full w-full flex-col items-center justify-center rounded-2xl bg-linear-to-br p-8 shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center">
              <h2 className="text-primary-foreground mb-4 text-4xl font-bold text-balance">{card.word}</h2>
            </div>
            {/* Hint Button */}
            <div className="absolute top-3 left-3">
              <Button onClick={onShowHint} variant="ghost">
                <Lightbulb className="mr-2 h-4 w-4" />
                {showHint ? maskHint : 'Hiển thị gợi ý'}
              </Button>
            </div>
          </div>

          {/* Back of Card - Meaning */}
          <div
            className="from-secondary to-primary absolute flex h-full w-full flex-col justify-center rounded-2xl bg-linear-to-br p-8 shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="space-y-6 text-center">
              <div>
                <p className="text-secondary-foreground text-2xl font-semibold text-balance">{card.meaning}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardCard;
