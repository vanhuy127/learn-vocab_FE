import { useEffect, useRef } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import FormItemCustom from '@/components/formItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { CreateTestFormValues } from '@/schema/test.schema';

import ChoiceOptions from './ChoiceOptions';
import FillInOptions from './FillInOptions';
import TrueFalseOptions from './TrueFalseOptions';

interface Props {
  id: string;
  index: number;
  onRemove: () => void;
  isEdit: boolean;
}

const SortableQuestionItem = ({ id, index, onRemove, isEdit }: Props) => {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: id, disabled: !isEdit });
  const form = useFormContext<CreateTestFormValues>();
  const type = form.watch(`questions.${index}.questionType`);
  const prevTypeRef = useRef(type);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const prevType = prevTypeRef.current;
    if (prevType === type) return;
    const currentOptions = form.getValues(`questions.${index}.options`) || [];

    if (type === 'T_F') {
      form.setValue(`questions.${index}.answer`, 'true');
      form.setValue(`questions.${index}.options`, [
        { id: 'true', text: 'Đúng', isCorrect: true },
        { id: 'false', text: 'Sai', isCorrect: false },
      ]);
    } else if (type === 'FILL_IN') {
      form.setValue(`questions.${index}.answer`, '');
      form.setValue(`questions.${index}.options`, undefined);
    } else if (type === 'MULTI_CHOICE') {
      if (prevType === 'CHOICE') {
        // Giữ nguyên options, không reset
        form.setValue(`questions.${index}.answer`, undefined);
      } else {
        // Reset đáp án
        form.setValue(`questions.${index}.answer`, undefined);

        form.setValue(`questions.${index}.options`, [
          {
            id: crypto.randomUUID(),
            text: '',
            isCorrect: true,
          },
          ...Array.from({ length: 3 }).map(() => ({
            id: crypto.randomUUID(),
            text: '',
            isCorrect: false,
          })),
        ]);
      }
    } else if (type === 'CHOICE') {
      if (prevType === 'MULTI_CHOICE') {
        // Giữ 4 đáp án đầu tiên
        const trimmedOptions = currentOptions.slice(0, 4);

        let foundCorrect = false;

        const normalizedOptions = trimmedOptions.map((opt: any) => {
          if (!foundCorrect && opt.isCorrect) {
            foundCorrect = true;

            return { ...opt, isCorrect: true };
          }

          return { ...opt, isCorrect: false };
        });

        if (!foundCorrect && normalizedOptions.length > 0) {
          normalizedOptions[0].isCorrect = true;
        }

        form.setValue(`questions.${index}.options`, normalizedOptions);
      } else {
        // Reset đáp án
        form.setValue(`questions.${index}.answer`, undefined);

        form.setValue(`questions.${index}.options`, [
          {
            id: crypto.randomUUID(),
            text: '',
            isCorrect: true,
          },
          ...Array.from({ length: 3 }).map(() => ({
            id: crypto.randomUUID(),
            text: '',
            isCorrect: false,
          })),
        ]);
      }
    }

    prevTypeRef.current = type;
  }, [type, index, form]);

  return (
    <div ref={setNodeRef} style={style} className="bg-background space-y-3 rounded-2xl border p-5">
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="text-muted-foreground" />
        </div>
        <Label htmlFor={`question-${index}`}>Câu hỏi {index + 1}</Label>
      </div>

      <FormItemCustom
        form={form}
        name={`questions.${index}.questionText`}
        label="Nội dung câu hỏi"
        renderInput={(field) => (
          <Textarea {...field} value={field.value as string} placeholder={`Câu hỏi ${index + 1}`} disabled={!isEdit} />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          value={type}
          onValueChange={(v) => form.setValue(`questions.${index}.questionType`, v as any)}
          disabled={!isEdit}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CHOICE">Một đáp án</SelectItem>
            <SelectItem value="MULTI_CHOICE">Nhiều đáp án</SelectItem>
            <SelectItem value="T_F">Đúng / Sai</SelectItem>
            <SelectItem value="FILL_IN">Điền đáp án</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Label htmlFor={`points-${index}`}>Điểm: </Label>
          <Input
            type="number"
            {...form.register(`questions.${index}.points`, { valueAsNumber: true })}
            id={`points-${index}`}
            placeholder="Điểm"
            disabled={!isEdit}
          />
        </div>
      </div>

      {type === 'CHOICE' || type === 'MULTI_CHOICE' ? (
        <ChoiceOptions index={index} questionType={type} isEdit={isEdit} />
      ) : null}
      {type === 'T_F' ? <TrueFalseOptions index={index} isEdit={isEdit} /> : null}
      {type === 'FILL_IN' ? <FillInOptions index={index} isEdit={isEdit} /> : null}
      {isEdit && (
        <Button type="button" variant="destructive" onClick={onRemove}>
          Xoá câu hỏi
        </Button>
      )}
    </div>
  );
};

export default SortableQuestionItem;
