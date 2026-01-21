import { Check, ChevronLeft, ChevronRight, Shuffle, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface IProps {
  currentIndex: number;
  onTracking: (value: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
  onLearned: () => void;
  onNotLearned: () => void;
  onShuffle: () => void;
  isShuffled: boolean;
  isTracking: boolean;
  isPrevDisabled: boolean;
}
const FlashcardControls = ({
  onTracking,
  onPrev,
  onNext,
  onLearned,
  onNotLearned,
  onShuffle,
  isShuffled,
  isPrevDisabled,
  currentIndex,
  isTracking,
}: IProps) => {
  return (
    <div className="space-y-6">
      {/* Navigation Controls */}
      <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-1 items-center justify-center space-x-2 md:justify-start">
          {(isTracking && currentIndex > 0) || (
            <>
              <Switch id="airplane-mode" checked={isTracking} onCheckedChange={onTracking} />
              <Label htmlFor="airplane-mode">Theo dõi tiến trình</Label>
            </>
          )}
        </div>
        {isTracking ? (
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={onLearned}
              className={`bg-primary hover:bg-primary/60 text-primary-foreground transition-all`}
            >
              <Check className="mr-2 h-4 w-4" />
              Đã thuộc
            </Button>

            <Button onClick={onNotLearned} className={`bg-destructive hover:bg-destructive/60 transition-all`}>
              <X className="mr-2 h-4 w-4" />
              Chưa thuộc
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Button onClick={onPrev} disabled={isPrevDisabled} variant="outline" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button onClick={onNext} variant="outline" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="flex flex-1 items-center justify-center md:justify-end">
          <Button
            onClick={onShuffle}
            variant={isShuffled ? 'default' : 'outline'}
            className={`transition-all ${isShuffled && 'bg-primary hover:bg-accent text-primary-foreground'}`}
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Trộn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardControls;
