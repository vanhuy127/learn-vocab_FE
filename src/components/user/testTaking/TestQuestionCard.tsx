import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { ITestAttemptQuestion } from '@/interface';

interface Props {
  index: number;
  question: ITestAttemptQuestion;
  answer?: string | string[];
  onAnswerChange: (value: string | string[]) => void;
}

const TestQuestionCard = ({ index, question, answer, onAnswerChange }: Props) => {
  const currentValue = typeof answer === 'string' ? answer : '';
  const currentArray = Array.isArray(answer) ? answer : [];

  return (
    <div className="bg-card border-border rounded-2xl border p-6">
      <div className="mb-4 flex items-start gap-2">
        <span className="bg-secondary/20 text-secondary-foreground inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
          {index + 1}
        </span>
        <h2 className="text-foreground text-lg font-semibold">{question.questionText}</h2>
      </div>

      {question.questionType === 'CHOICE' && (
        <RadioGroup value={currentValue} onValueChange={(v) => onAnswerChange(v)}>
          <div className="space-y-3">
            {(question.options ?? []).map((opt) => (
              <label
                key={opt.id}
                className="border-border hover:border-secondary hover:bg-secondary/5 flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors"
              >
                <RadioGroupItem value={opt.id} />
                <span className="text-foreground">{opt.text}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      )}

      {question.questionType === 'MULTI_CHOICE' && (
        <div className="space-y-3">
          {(question.options ?? []).map((opt) => {
            const checked = currentArray.includes(opt.id);

            return (
              <label
                key={opt.id}
                className="border-border hover:border-secondary hover:bg-secondary/5 flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => {
                    const nextChecked = Boolean(value);
                    const next = nextChecked ? [...currentArray, opt.id] : currentArray.filter((id) => id !== opt.id);
                    onAnswerChange(next);
                  }}
                />
                <span className="text-foreground">{opt.text}</span>
              </label>
            );
          })}
        </div>
      )}

      {question.questionType === 'T_F' && (
        <RadioGroup value={currentValue} onValueChange={(v) => onAnswerChange(v)}>
          <div className="space-y-3">
            {[
              { id: 'true', label: 'Đúng' },
              { id: 'false', label: 'Sai' },
            ].map((opt) => (
              <label
                key={opt.id}
                className="border-border hover:border-secondary hover:bg-secondary/5 flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors"
              >
                <RadioGroupItem value={opt.id} />
                <span className="text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </RadioGroup>
      )}

      {question.questionType === 'FILL_IN' && (
        <div className="space-y-2">
          <Label htmlFor={`fill-${question.id}`}>Đáp án</Label>
          <Input
            id={`fill-${question.id}`}
            value={currentValue}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Nhập đáp án của bạn"
          />
        </div>
      )}
    </div>
  );
};

export default TestQuestionCard;
