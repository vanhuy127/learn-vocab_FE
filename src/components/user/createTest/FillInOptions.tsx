import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { CreateTestFormValues } from '@/schema/test.schema';
import FormItemCustom from '@/components/formItem';


const FillInOptions = ({ index }: { index: number }) => {
    const form = useFormContext<CreateTestFormValues>();


    return (
        <FormItemCustom
            form={form}
            name={`questions.${index}.answer`}
            label="Đáp án đúng"
            renderInput={(field) => (
                <Input {...field} value={field.value as string} placeholder="Nhập đáp án đúng" />
            )}
        />
    );
};

export default FillInOptions;