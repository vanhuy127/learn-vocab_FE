
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CreateTestFormValues } from '@/schema/test.schema';
import ChoiceOptions from './ChoiceOptions';
import TrueFalseOptions from './TrueFalseOptions';
import FillInOptions from './FillInOptions';
import { Label } from '@/components/ui/label';
import FormItemCustom from '@/components/formItem';

interface Props {
    id: string;
    index: number;
    onRemove: () => void;
}

const SortableQuestionItem = ({ id, index, onRemove }: Props) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: id });
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

        if (type === 'T_F') {
            form.setValue(`questions.${index}.answer`, undefined);
            form.setValue(`questions.${index}.options`, [
                { id: 'true', text: 'Đúng', isCorrect: false },
                { id: 'false', text: 'Sai', isCorrect: false },
            ]);
        } else if (type === 'FILL_IN') {
            form.setValue(`questions.${index}.options`, undefined);
        } else if (type === 'CHOICE' || type === 'MULTI_CHOICE') {
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

        prevTypeRef.current = type;
    }, [type, index, form]);


    return (
        <div ref={setNodeRef} style={style} className="rounded-2xl border p-5 space-y-3 bg-background">
            <div className="flex items-center gap-3">
                <div {...attributes} {...listeners} className="cursor-grab">
                    <GripVertical className="text-muted-foreground" />
                </div>
                <Label htmlFor={`question-${index}`}>Câu hỏi {index + 1}</Label>
            </div>

            <FormItemCustom
                form={form}
                name={`questions.${index}.questionText`}
                label="Đáp án đúng"
                renderInput={(field) => (
                    <Textarea
                        {...field}
                        value={field.value as string}
                        placeholder={`Câu hỏi ${index + 1}`}
                    />
                )}
            />


            <div className="grid grid-cols-2 gap-4">
                <Select
                    value={type}
                    onValueChange={(v) => form.setValue(`questions.${index}.questionType`, v as any)}
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

                <div className='flex gap-2'>
                    <Label htmlFor={`points-${index}`}>Điểm: </Label>
                    <Input
                        type="number"
                        {...form.register(`questions.${index}.points`, { valueAsNumber: true })}
                        id={`points-${index}`}
                        placeholder="Điểm"
                    />
                </div>
            </div>


            {type === 'CHOICE' || type === 'MULTI_CHOICE' ? <ChoiceOptions index={index} questionType={type} /> : null}
            {type === 'T_F' ? <TrueFalseOptions index={index} /> : null}
            {type === 'FILL_IN' ? <FillInOptions index={index} /> : null}


            <Button type="button" variant="destructive" onClick={onRemove}>
                Xoá câu hỏi
            </Button>
        </div>
    );
};


export default SortableQuestionItem;
