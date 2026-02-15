import { useFormContext } from 'react-hook-form';

import FormItemCustom from '@/components/formItem';
import { Input } from '@/components/ui/input';

import { CreateTestFormValues } from '@/schema/test.schema';

const FillInOptions = ({ index, isEdit }: { index: number; isEdit: boolean }) => {
  const form = useFormContext<CreateTestFormValues>();

  return (
    <FormItemCustom
      form={form}
      name={`questions.${index}.answer`}
      label="Đáp án đúng"
      renderInput={(field) => (
        <Input {...field} value={field.value as string} placeholder="Nhập đáp án đúng" disabled={!isEdit} />
      )}
    />
  );
};

export default FillInOptions;
