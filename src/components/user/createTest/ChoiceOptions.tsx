import { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import FormItemCustom from '@/components/formItem';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { CreateTestFormValues } from '@/schema/test.schema';

const DEFAULT_OPTION_COUNT = 4;

const getOptionLabel = (index: number) => String.fromCharCode(65 + index);

interface Props {
  index: number;
  questionType: 'CHOICE' | 'MULTI_CHOICE';
  isEdit: boolean;
}

const ChoiceOptions = ({ index, questionType, isEdit }: Props) => {
  const form = useFormContext<CreateTestFormValues>();
  const {
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${index}.options`,
  });

  const optionsError = errors?.questions?.[index]?.options?.root?.message;

  useEffect(() => {
    if (!fields.length) {
      for (let i = 0; i < DEFAULT_OPTION_COUNT; i++) {
        append({
          id: crypto.randomUUID(),
          text: '',
          isCorrect: i === 0,
        });
      }
    }
  }, []);

  const handleCheck = (checkedIndex: number, checked: boolean) => {
    if (questionType === 'CHOICE') {
      // Chỉ 1 đáp án đúng
      fields.forEach((_, i) => {
        form.setValue(`questions.${index}.options.${i}.isCorrect`, i === checkedIndex);
      });

      return;
    }

    // MULTI_CHOICE → toggle bình thường
    form.setValue(`questions.${index}.options.${checkedIndex}.isCorrect`, checked);
  };

  return (
    <div className="space-y-2">
      {fields.map((field, i) => {
        const fieldId = field.id;
        const checked = form.watch(`questions.${index}.options.${i}.isCorrect`);

        return (
          <div key={fieldId} className="flex items-center gap-2">
            <Checkbox checked={checked} onCheckedChange={(v) => handleCheck(i, !!v)} disabled={!isEdit} />

            <Label htmlFor={`ans-${fieldId}`}>{getOptionLabel(i)}</Label>

            <div className="flex-1">
              <FormItemCustom
                form={form}
                name={`questions.${index}.options.${i}.text`}
                label=""
                renderInput={(field) => (
                  <Input
                    {...field}
                    id={`ans-${fieldId}`}
                    value={field.value as string}
                    placeholder={`Đáp án ${getOptionLabel(i)}`}
                    disabled={!isEdit}
                  />
                )}
              />
            </div>

            {isEdit && (
              <Button type="button" variant="ghost" onClick={() => remove(i)}>
                ✕
              </Button>
            )}
          </div>
        );
      })}

      {optionsError && <p className="text-destructive text-sm">{optionsError}</p>}

      {isEdit && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              text: '',
              isCorrect: false,
            })
          }
        >
          + Thêm đáp án
        </Button>
      )}
    </div>
  );
};

export default ChoiceOptions;
