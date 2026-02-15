import { useFormContext } from 'react-hook-form';

import FormItemCustom from '@/components/formItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { ACCESS_LEVEL } from '@/constants';
import { CreateTestFormValues } from '@/schema/test.schema';

const TestInfoCard = () => {
  const form = useFormContext<CreateTestFormValues>();

  return (
    <div className="space-y-4 rounded-2xl border p-6">
      {/* Title */}
      <FormItemCustom
        form={form}
        name="title"
        label="Tiêu đề bài kiểm tra"
        renderInput={(field) => <Input {...field} value={field.value as string} placeholder="Tiêu đề bài kiểm tra" />}
      />

      {/* Description */}
      <FormItemCustom
        form={form}
        name="description"
        label="Mô tả"
        renderInput={(field) => <Textarea {...field} value={field.value as string} rows={3} placeholder="Mô tả" />}
      />

      <div className="grid grid-cols-2 gap-4">
        {/* Duration */}
        <FormItemCustom
          form={form}
          name="duration"
          label="Thời gian (phút)"
          renderInput={(field) => (
            <Input
              type="number"
              {...field}
              value={field.value as number}
              onChange={(e) => field.onChange(+e.target.value)}
              placeholder="Thời gian"
            />
          )}
        />

        <FormItemCustom
          form={form}
          name="accessLevel"
          label="Quyền truy cập"
          renderInput={(field) => (
            <Select value={field.value as string} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Quyền truy cập" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ACCESS_LEVEL.PUBLIC}>Công khai</SelectItem>
                <SelectItem value={ACCESS_LEVEL.ACCESS_BY_LINK}>Bằng link</SelectItem>
                <SelectItem value={ACCESS_LEVEL.PRIVATE}>Riêng tư</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default TestInfoCard;
