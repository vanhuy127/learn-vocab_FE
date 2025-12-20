import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IResponse, IStudySetSearch } from '@/interface';

export const useStudySetService = () => {
  const getStudySetCurrent = async ({ search }: { search: string }) => {
    const res: IResponse<IStudySetSearch[]> = await axiosClient.get(END_POINT.USER.STUDY_SET.CURRENT_LIST, {
      params: { search },
    });

    return res.data;
  };

  return {
    getStudySetCurrent,
  };
};
