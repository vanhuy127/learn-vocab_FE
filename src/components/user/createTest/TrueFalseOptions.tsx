import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormItemCustom from '@/components/formItem';
import { CreateTestFormValues } from '@/schema/test.schema';

const TrueFalseOptions = ({ index }: { index: number }) => {
    const form = useFormContext<CreateTestFormValues>();

    useEffect(() => {
        const answer = form.getValues(`questions.${index}.answer`);

        if (!answer) {
            form.setValue(`questions.${index}.answer`, 'true', {
                shouldDirty: false,
            });
        }

        form.setValue(`questions.${index}.options`, [
            { id: 'true', text: 'Đúng', isCorrect: answer === 'true' || !answer },
            { id: 'false', text: 'Sai', isCorrect: answer === 'false' },
        ]);
    }, [index, form]);

    const syncOptions = (value: 'true' | 'false') => {
        form.setValue(`questions.${index}.options`, [
            { id: 'true', text: 'Đúng', isCorrect: value === 'true' },
            { id: 'false', text: 'Sai', isCorrect: value === 'false' },
        ]);
    };

    return (
        <FormItemCustom
            form={form}
            name={`questions.${index}.answer`}
            label="Đáp án đúng"
            renderInput={() => (
                <Controller
                    name={`questions.${index}.answer`}
                    control={form.control}
                    render={({ field }) => (
                        <RadioGroup
                            value={field.value}
                            onValueChange={(v) => {
                                field.onChange(v);
                                syncOptions(v as 'true' | 'false');
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="true" />
                                <span>Đúng</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="false" />
                                <span>Sai</span>
                            </div>
                        </RadioGroup>
                    )}
                />
            )}
        />
    );
};

export default TrueFalseOptions;
