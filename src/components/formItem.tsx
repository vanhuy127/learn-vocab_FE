// InputField.tsx
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export interface InputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  renderInput: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}

const FormItemCustom = <T extends FieldValues>({ form, name, label, renderInput }: InputFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormItemCustom;
