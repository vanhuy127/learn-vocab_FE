import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import FormItemCustom from '@/components/formItem';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { CreateStudySetFormValues } from '@/schema/studySet.schema';

interface Props {
  id: string;
  index: number;
  onRemove: () => void;
  disableRemove: boolean;
}

const SortableTermItem = ({ id, index, onRemove, disableRemove }: Props) => {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: id });
  const form = useFormContext<CreateStudySetFormValues>();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-background rounded-2xl border p-5">
      <div className="flex gap-4">
        <div {...attributes} {...listeners} className="cursor-grab pt-2">
          <GripVertical className="text-muted-foreground" />
        </div>

        <div className="grid flex-1 gap-4 md:grid-cols-2">
          <FormItemCustom
            form={form}
            name={`terms.${index}.term`}
            label="Từ"
            renderInput={(field) => <Input {...field} value={field.value as string} placeholder="Từ vựng" />}
          />

          <FormItemCustom
            form={form}
            name={`terms.${index}.definition`}
            label="Định nghĩa"
            renderInput={(field) => <Input {...field} value={field.value as string} placeholder="Định nghĩa" />}
          />

          <div className="md:col-span-2">
            <FormItemCustom
              form={form}
              name={`terms.${index}.note`}
              label="Ghi chú"
              renderInput={(field) => (
                <Textarea
                  {...field}
                  value={field.value as string}
                  placeholder="Ví dụ, mẹo ghi nhớ, ngữ cảnh sử dụng..."
                  rows={2}
                />
              )}
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          disabled={disableRemove}
          className="hover:bg-destructive/10 rounded-lg p-2"
        >
          <X className="text-muted-foreground hover:text-destructive" />
        </button>
      </div>

      <div className="text-muted-foreground mt-4 text-xs">
        Thẻ số <strong>{index + 1}</strong>
      </div>
    </div>
  );
};

export default SortableTermItem;
