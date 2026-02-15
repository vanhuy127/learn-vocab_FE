import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { CreateTestFormValues } from '@/schema/test.schema';

import SortableQuestionItem from './SortableQuestionItem';

interface Props {
  isEdit: boolean;
}

const QuestionList = ({ isEdit }: Props) => {
  const form = useFormContext<CreateTestFormValues>();
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      move(oldIndex, newIndex);
    }
  };

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <SortableQuestionItem
                key={field.id}
                isEdit={isEdit}
                id={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {isEdit && (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              questionType: 'CHOICE',
              questionText: '',
              points: 1,
              options: [],
            })
          }
        >
          + Thêm câu hỏi
        </Button>
      )}
    </div>
  );
};

export default QuestionList;
