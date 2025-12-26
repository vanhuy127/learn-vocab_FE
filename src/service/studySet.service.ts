import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import { IResponse, IStudySetExtended, IStudySetSearch } from '@/interface';
import { CreateStudySetFormValues } from '@/schema/studySet.schema';

export const useStudySetService = () => {
  const getStudySetCurrent = async ({ search }: { search: string }) => {
    const res: IResponse<IStudySetSearch[]> = await axiosClient.get(END_POINT.USER.STUDY_SET.CURRENT_LIST, {
      params: { search },
    });

    return res.data;
  };

  const createStudySet = async (data: CreateStudySetFormValues) => {
    const res: IResponse<IStudySetExtended> = await axiosClient.post(END_POINT.USER.STUDY_SET.CREATE, data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  return {
    getStudySetCurrent,
    createStudySet,
  };
};
