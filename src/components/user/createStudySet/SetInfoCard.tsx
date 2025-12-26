import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import ComboboxFilter from '@/components/admin/comboboxFilter';
import FormItemCustom from '@/components/formItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { ACCESS_LEVEL_ARRAY, ACCESS_LEVEL_SHOWS } from '@/constants';
import { CreateStudySetFormValues } from '@/schema/studySet.schema';
import { useFolderService } from '@/service/folder.service';
import { useLanguageService } from '@/service/language.service';

const SetInfoCard = () => {
  const form = useFormContext<CreateStudySetFormValues>();
  const { getLanguages } = useLanguageService();
  const { getFolderCurrent } = useFolderService();

  const { data: languages } = useQuery({
    queryKey: ['languages'],
    queryFn: () => getLanguages(),
  });

  const { data: folders } = useQuery({
    queryKey: ['folder'],
    queryFn: () => getFolderCurrent({ search: '' }),
  });

  const languageOptions = useMemo(() => {
    const filteredLanguages = [
      ...(languages?.map((language) => ({
        label: language.name,
        value: language.id,
      })) || []),
    ];

    return filteredLanguages;
  }, [languages]);

  const folderOptions = useMemo(() => {
    const filteredFolders = [
      { label: 'Không có thư mục', value: 'none' },
      ...(folders?.map((folder) => ({
        label: folder.name,
        value: folder.id,
      })) || []),
    ];

    return filteredFolders;
  }, [folders]);

  return (
    <div className="bg-background border-border rounded-2xl border p-6 shadow-sm md:p-8">
      <div className="space-y-5">
        <FormItemCustom
          form={form}
          name="title"
          label="Tên học phần"
          renderInput={(field) => <Input {...field} value={field.value as string} placeholder="Nhập tên học phần" />}
        />

        <FormItemCustom
          form={form}
          name="description"
          label="Mô tả"
          renderInput={(field) => (
            <Textarea {...field} rows={3} value={field.value as string} placeholder="Mô tả học phần" />
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormItemCustom
            form={form}
            name="language"
            label="Ngôn ngữ"
            renderInput={({ value, onChange }) => (
              <ComboboxFilter
                options={languageOptions}
                placeholder="Chọn ngôn ngữ"
                value={String(value)}
                onChange={onChange}
              />
            )}
          />

          <FormItemCustom
            form={form}
            name="accessLevel"
            label="Quyền truy cập"
            renderInput={({ value, onChange }) => (
              <Select value={String(value)} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quyền truy cập" />
                </SelectTrigger>
                <SelectContent>
                  {ACCESS_LEVEL_ARRAY.map((item) => {
                    const Icon = ACCESS_LEVEL_SHOWS[item as keyof typeof ACCESS_LEVEL_SHOWS].icon;

                    return (
                      <SelectItem key={item} value={item}>
                        <div className="flex items-center gap-2">
                          <Icon className="text-muted-foreground h-4 w-4" />
                          <span>{ACCESS_LEVEL_SHOWS[item as keyof typeof ACCESS_LEVEL_SHOWS].value}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <FormItemCustom
          form={form}
          name="folderId"
          label="Thư mục"
          renderInput={({ value, onChange }) => (
            <Select value={String(value)} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thư mục" />
              </SelectTrigger>
              <SelectContent>
                {folderOptions.map((item) => {
                  return (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default SetInfoCard;
