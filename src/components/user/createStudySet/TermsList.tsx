import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useFieldArray } from 'react-hook-form';

import { CreateStudySetFormValues } from '@/schema/studySet.schema';

import SortableTermItem from './SortableTermItem';

interface Props {
  fields: ReturnType<typeof useFieldArray<CreateStudySetFormValues>>['fields'];
  onRemove: (index: number) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const TermsList = ({ fields, onRemove, onMove }: Props) => {
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      onMove(oldIndex, newIndex);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <SortableTermItem
              key={field.id}
              id={field.id as string}
              index={index}
              onRemove={() => onRemove(index)}
              disableRemove={fields.length <= 2}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TermsList;
